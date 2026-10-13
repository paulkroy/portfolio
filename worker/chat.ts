// POST /api/chat: forwards a short conversation to an open model on Workers AI.
//
// The model only sees the system prompt below plus the last few messages the
// browser sent, so the cost per reply stays small and bounded.

interface ChatEnv {
  AI: Ai;
  CHAT_LIMIT_IP: RateLimit;
  CHAT_LIMIT_SITE: RateLimit;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResult {
  response?: string;
  choices?: { message?: { content?: string } }[];
}

// Open-weight model on Workers AI (Qwen3 is Apache-2.0). Cheap per token, supports tool calling.
const CHAT_MODEL = '@cf/qwen/qwen3-30b-a3b-fp8' as const;

const MAX_HISTORY = 10;
const MAX_CHARS = 500;
// Qwen3 can spend tokens on reasoning before the answer, so leave room.
const MAX_REPLY_TOKENS = 600;

const SYSTEM_PROMPT = `You are the website assistant for Paul Roy, a web developer in Melbourne, Australia.
Answer visitors' questions briefly (two to four sentences) and in plain English.

Facts you can use:
- Paul designs and builds websites for local Melbourne businesses.
- He uses WordPress, WooCommerce and Bricks when clients need to edit their own site, and Astro, TypeScript and Cloudflare when the job calls for code.
- Ten client sites are live now, from a family-law firm to a Yarra Valley strawberry farm.
- Each live site is checked every 5 minutes by a Cloudflare Worker; the status page explains how.
- To get in touch, visitors can email paulkroy2000@gmail.com or use the contact page.

If you don't know something, say so and suggest emailing Paul. Don't invent prices, timelines or clients.
You are an AI assistant, not Paul himself. Don't claim to be a person.`;

function cleanMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];
  return input
    .flatMap((m): ChatMessage[] => {
      if (!m || typeof m !== 'object') return [];
      const { role, content } = m as Record<string, unknown>;
      if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return [];
      const trimmed = content.trim().slice(0, MAX_CHARS);
      return trimmed ? [{ role, content: trimmed }] : [];
    })
    .slice(-MAX_HISTORY);
}

export async function handleChat(request: Request, env: ChatEnv): Promise<Response> {
  // Check both limits before spending any model neurons. The per-visitor limit is keyed by IP,
  // since anonymous visitors have no other ID. Limits are approximate and per location.
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const [perVisitor, site] = await Promise.all([
    env.CHAT_LIMIT_IP.limit({ key: ip }),
    env.CHAT_LIMIT_SITE.limit({ key: 'site' }),
  ]);
  if (!perVisitor.success || !site.success) {
    return Response.json(
      { error: 'Too many messages. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const messages = cleanMessages(body.messages);
  if (!messages.length || messages.at(-1)!.role !== 'user') {
    return Response.json({ error: 'Send a user message' }, { status: 400 });
  }

  const result = (await env.AI.run(CHAT_MODEL, {
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    max_tokens: MAX_REPLY_TOKENS,
  }, {
    // Routes through AI Gateway for logs and analytics. "default" is created on first use.
    gateway: { id: 'default' },
  })) as ChatResult;

  // Logs show the reply as choices[0].message.content; older responses use a plain `response` string.
  const raw = result.choices?.[0]?.message?.content ?? result.response ?? '';
  // Drop any reasoning block the model emits before its answer
  const reply = raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  return Response.json({ reply });
}
