// Cloudflare Worker for paulkroy.tech.
//
// - Static pages are served from the asset binding without touching this code
//   (see `run_worker_first` in wrangler.jsonc).
// - A cron trigger checks every client site every 5 minutes and stores the
//   result in D1.
// - GET /api/status returns uptime and response-time stats for the status board.
// - POST /api/chat answers visitor questions with an open model (see chat.ts).

import { handleChat } from './chat';

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  AI: Ai;
  CHAT_LIMIT_IP: RateLimit;
  CHAT_LIMIT_SITE: RateLimit;
}

interface Site {
  slug: string;
  name: string;
  url: string;
}

interface CheckRow {
  site: string;
  checked_at: number;
  status: number;
  ms: number | null;
  ok: number;
}

const TIMEOUT_MS = 10_000;
const RETENTION_MS = 30 * 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;
const USER_AGENT = 'paulkroy.tech uptime monitor (+https://paulkroy.tech/status)';

async function loadSites(env: Env): Promise<Site[]> {
  const res = await env.ASSETS.fetch('https://assets.local/sites.json');
  if (!res.ok) throw new Error(`sites.json unavailable (${res.status})`);
  return res.json();
}

/** Time a GET to the first response byte. The body is discarded unread. */
async function checkSite(site: Site): Promise<Omit<CheckRow, 'site'>> {
  const started = Date.now();
  try {
    const res = await fetch(site.url, {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    // In Workers, Date.now() only advances across I/O, which is exactly the
    // fetch we want to time.
    const ms = Date.now() - started;
    await res.body?.cancel();
    return { checked_at: started, status: res.status, ms, ok: res.status < 400 ? 1 : 0 };
  } catch {
    return { checked_at: started, status: 0, ms: null, ok: 0 };
  }
}

async function runChecks(env: Env): Promise<void> {
  const sites = await loadSites(env);
  const results = await Promise.all(sites.map(async (site) => ({ site: site.slug, ...(await checkSite(site)) })));

  const insert = env.DB.prepare('INSERT INTO checks (site, checked_at, status, ms, ok) VALUES (?, ?, ?, ?, ?)');
  await env.DB.batch([
    ...results.map((r) => insert.bind(r.site, r.checked_at, r.status, r.ms, r.ok)),
    env.DB.prepare('DELETE FROM checks WHERE checked_at < ?').bind(Date.now() - RETENTION_MS),
  ]);
}

function uptime(rows: CheckRow[], since: number): number | null {
  const window = rows.filter((r) => r.checked_at >= since);
  if (!window.length) return null;
  return window.filter((r) => r.ok).length / window.length;
}

function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

async function buildStatus(env: Env) {
  const now = Date.now();
  const sites = await loadSites(env);
  const { results } = await env.DB.prepare(
    'SELECT site, checked_at, status, ms, ok FROM checks WHERE checked_at >= ? ORDER BY checked_at ASC',
  )
    .bind(now - RETENTION_MS)
    .all<CheckRow>();

  const bySite = new Map<string, CheckRow[]>();
  for (const row of results) {
    const list = bySite.get(row.site) ?? [];
    list.push(row);
    bySite.set(row.site, list);
  }

  return {
    generatedAt: now,
    sites: sites.map((site) => {
      const rows = bySite.get(site.slug) ?? [];
      const last = rows.at(-1) ?? null;
      const day = rows.filter((r) => r.checked_at >= now - 24 * HOUR);
      return {
        slug: site.slug,
        name: site.name,
        url: site.url,
        up: last ? last.ok === 1 : null,
        status: last?.status ?? null,
        lastMs: last?.ms ?? null,
        lastChecked: last?.checked_at ?? null,
        medianMs24h: median(day.flatMap((r) => (r.ms == null ? [] : [r.ms]))),
        uptime24h: uptime(rows, now - 24 * HOUR),
        uptime7d: uptime(rows, now - 7 * 24 * HOUR),
        uptime30d: uptime(rows, now - RETENTION_MS),
        checks: rows.length,
        // Last 24h of response times for the sparkline (null = failed check).
        recent: day.map((r) => (r.ok ? r.ms : null)),
      };
    }),
  };
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/status') {
      if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });

      // Checks only run every 5 minutes, so a 60s edge cache costs nothing in freshness.
      const cache = caches.default;
      const cacheKey = new Request(url.origin + url.pathname);
      const cached = await cache.match(cacheKey);
      if (cached) return cached;

      const body = JSON.stringify(await buildStatus(env));
      const response = new Response(body, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=60',
          'Access-Control-Allow-Origin': '*',
        },
      });
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    }

    if (url.pathname === '/api/chat') {
      if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
      return handleChat(request, env);
    }

    if (url.pathname.startsWith('/api/')) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(_controller, env, ctx): Promise<void> {
    ctx.waitUntil(runChecks(env));
  },
} satisfies ExportedHandler<Env>;
