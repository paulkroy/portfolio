// Annotations shown in X-ray mode. Each id matches a `data-xray` attribute in
// the markup; snippets are trimmed excerpts of the real source files.

export interface Annotation {
  title: string;
  body: string[];
  file: string;
  lang: 'astro' | 'ts' | 'tsx' | 'css' | 'svelte' | 'jsonc' | 'js';
  code: string;
}

export const annotations: Record<string, Annotation> = {
  'hero-map': {
    title: 'A map that works before JavaScript does',
    body: [
      'The map you see first is a plain SVG generated at build time: every pin is projected from its coordinates in the project markdown. It costs zero JavaScript and works with JS turned off.',
      'A React island then loads MapLibre only when the map scrolls into view and fades in over the SVG once tiles are ready. If WebGL or the tile server fails, it never appears and the SVG stays.',
      'Cooperative gestures mean the map never hijacks page scrolling. You need two fingers or Ctrl + scroll to move it.',
    ],
    file: 'src/pages/index.astro',
    lang: 'astro',
    code: `<MapStatic projects={projects}>
  <!-- Hydrates only when visible; fades in over the SVG -->
  <MapLive client:visible pins={pins} />
</MapStatic>`,
  },
  'map-worker': {
    title: 'Fixing MapLibre inside a bundler',
    body: [
      "MapLibre 6 finds its web worker relative to its own file. Once Vite bundles it, that path no longer exists and the map silently fails to load.",
      'The fix is to let Vite bundle the worker and its shared chunk as a separate entry, and hand MapLibre the resulting URL.',
    ],
    file: 'src/components/MapLive.tsx',
    lang: 'tsx',
    code: `import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

const maplibre = await import('maplibre-gl');
maplibre.setWorkerUrl(workerUrl);`,
  },
  'fluid-type': {
    title: 'Fluid type, no breakpoints',
    body: [
      'Every heading size is a clamp() between a mobile minimum and a desktop maximum, so type scales smoothly with the viewport instead of jumping at breakpoints.',
    ],
    file: 'src/styles/global.css',
    lang: 'css',
    code: `--step-0: clamp(1rem, 0.96rem + 0.2vw, 1.1rem);
--step-2: clamp(1.6rem, 1.4rem + 1vw, 2.2rem);
--step-4: clamp(2.4rem, 1.6rem + 3.2vw, 4.4rem);

h1 { font-size: var(--step-4); text-wrap: balance; }`,
  },
  stats: {
    title: 'Numbers that can’t go stale',
    body: [
      'These counts aren’t typed in. They are derived from the project content collection at build time, so adding a project updates them automatically.',
    ],
    file: 'src/pages/index.astro',
    lang: 'ts',
    code: `const projects = await getProjects();
const suburbs = new Set(
  projects.map((p) => p.data.location).filter((l) => l !== 'Online store'),
);
const industries = new Set(projects.map((p) => p.data.industry));`,
  },
  screenshots: {
    title: 'Automated screenshots, optimised images',
    body: [
      'A Playwright script visits every client site and captures desktop and mobile screenshots with reduced motion on, so animations don’t blur the capture.',
      'Astro’s <Image> turns each PNG into responsive WebP at build time. The largest went from 962 kB to about 100 kB, and smaller sizes are served to smaller screens.',
    ],
    file: 'scripts/screenshot.mjs',
    lang: 'js',
    code: `const context = await browser.newContext({
  viewport: { width, height }, ...rest, reducedMotion: 'reduce',
});
await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
  // WebGL sites never go network-idle
  .catch(() => page.waitForLoadState('load'));
await page.screenshot({ path: \`\${slug}-\${name}.png\` });`,
  },
  'status-board': {
    title: 'Cron → D1 → API → Svelte',
    body: [
      'Every 5 minutes a Cloudflare cron trigger runs the Worker, which requests every client site in parallel, times the response to first byte and writes the results to D1 in one batch.',
      '/api/status aggregates uptime and medians and is edge-cached for 60 seconds. This board is a Svelte island that polls it once a minute.',
    ],
    file: 'worker/index.ts',
    lang: 'ts',
    code: `async scheduled(_controller, env, ctx) {
  ctx.waitUntil(runChecks(env));
}

// runChecks:
const results = await Promise.all(sites.map(checkSite));
await env.DB.batch([
  ...results.map((r) => insert.bind(r.site, r.checked_at, r.status, r.ms, r.ok)),
  env.DB.prepare('DELETE FROM checks WHERE checked_at < ?').bind(Date.now() - RETENTION_MS),
]);`,
  },
  toolkit: {
    title: 'Evidence instead of skill bars',
    body: [
      'Skill bars and percentages mean nothing to a reviewer. Each tool here is cross-referenced against the stack listed in every project, so it links straight to live sites that use it.',
    ],
    file: 'src/pages/index.astro',
    lang: 'ts',
    code: `const usedBy = (tool: string) =>
  projects.filter((p) => p.data.stack.includes(tool));`,
  },
  header: {
    title: 'Sticky, translucent header',
    body: [
      'position: sticky keeps the header in normal flow, so no layout shift and no JavaScript scroll listeners. color-mix() derives the translucent background from the theme token, so it works in both themes.',
    ],
    file: 'src/components/Header.astro',
    lang: 'css',
    code: `.site-header {
  position: sticky;
  top: 0;
  background: color-mix(in oklab, var(--bg) 82%, transparent);
  backdrop-filter: blur(12px);
}`,
  },
  'case-study': {
    title: 'One markdown file per project',
    body: [
      'Each project is a markdown file validated by a Zod schema. A typo in a field fails the build instead of shipping a broken page.',
      'The same files generate these case-study pages, the homepage cards, the map pins and the list of sites the status monitor checks.',
    ],
    file: 'src/content.config.ts',
    lang: 'ts',
    code: `const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    url: z.url(),
    coords: z.tuple([z.number(), z.number()]),
    stack: z.array(z.string()),
    // ...
  }),
});`,
  },
  deploy: {
    title: 'Static pages, Worker only where needed',
    body: [
      'Every page is prerendered HTML served straight from Cloudflare’s asset cache. The Worker script only runs for /api routes, so static pages never pay for compute.',
      'A pre-deploy check refuses to upload a build that is missing its homepage.',
    ],
    file: 'wrangler.jsonc',
    lang: 'jsonc',
    code: `"assets": {
  "directory": "./dist",
  "binding": "ASSETS",
  "run_worker_first": ["/api/*"]
},
"triggers": { "crons": ["*/5 * * * *"] }`,
  },
  'xray-toggle': {
    title: 'This X-ray mode',
    body: [
      'No framework. The panel uses the native Popover API, so it closes on Escape or an outside click and returns focus without any custom code.',
      'Code samples are syntax-highlighted at build time with Shiki and shipped as inert <template> elements, so highlighting adds no JavaScript.',
    ],
    file: 'src/components/XRay.astro',
    lang: 'ts',
    code: `toggle.addEventListener('click', () => setEnabled(!enabled()));
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'x' && !isTyping(e)) setEnabled(!enabled());
});
// Tag click → fill the panel from its <template> and open it
panel.showPopover();`,
  },
};
