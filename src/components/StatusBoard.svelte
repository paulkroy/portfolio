<!--
  Live status board for the client sites I maintain. Data comes from
  /api/status, which the Worker builds from 5-minute cron checks stored in D1.
-->
<script lang="ts">
  import { onMount } from 'svelte';

  interface SiteStatus {
    slug: string;
    name: string;
    url: string;
    up: boolean | null;
    status: number | null;
    lastMs: number | null;
    lastChecked: number | null;
    medianMs24h: number | null;
    uptime24h: number | null;
    uptime7d: number | null;
    uptime30d: number | null;
    checks: number;
    recent: (number | null)[];
  }

  interface StatusResponse {
    generatedAt: number;
    sites: SiteStatus[];
  }

  let { compact = false }: { compact?: boolean } = $props();

  let data = $state<StatusResponse | null>(null);
  let error = $state(false);
  let now = $state(Date.now());

  const REFRESH_MS = 60_000;

  async function load() {
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error(String(res.status));
      data = await res.json();
      error = false;
    } catch {
      error = true;
    }
  }

  onMount(() => {
    load();
    const refresh = setInterval(load, REFRESH_MS);
    const tick = setInterval(() => (now = Date.now()), 15_000);
    return () => {
      clearInterval(refresh);
      clearInterval(tick);
    };
  });

  const checked = $derived(data?.sites.filter((s) => s.up !== null) ?? []);
  const upCount = $derived(checked.filter((s) => s.up).length);
  const lastChecked = $derived(Math.max(0, ...checked.map((s) => s.lastChecked ?? 0)));
  const fleetMedian = $derived.by(() => {
    const values = checked.flatMap((s) => (s.medianMs24h == null ? [] : [s.medianMs24h])).sort((a, b) => a - b);
    return values.length ? values[values.length >> 1] : null;
  });

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  function ago(ts: number): string {
    const seconds = Math.round((ts - now) / 1000);
    if (Math.abs(seconds) < 60) return rtf.format(seconds, 'second');
    return rtf.format(Math.round(seconds / 60), 'minute');
  }

  function pct(value: number | null): string {
    if (value == null) return '–';
    return value === 1 ? '100%' : `${(value * 100).toFixed(2)}%`;
  }

  /** SVG path for the response-time sparkline; gaps where checks failed. */
  function sparkline(values: (number | null)[], width = 120, height = 28): { line: string; fails: number[] } {
    if (values.length < 2) return { line: '', fails: [] };
    const nums = values.filter((v): v is number => v != null);
    const max = Math.max(...nums, 1);
    const step = width / (values.length - 1);
    let line = '';
    let pen = false;
    const fails: number[] = [];
    values.forEach((v, i) => {
      const x = (i * step).toFixed(1);
      if (v == null) {
        fails.push(i * step);
        pen = false;
        return;
      }
      const y = (height - 2 - (v / max) * (height - 4)).toFixed(1);
      line += `${pen ? 'L' : 'M'}${x},${y}`;
      pen = true;
    });
    return { line, fails };
  }
</script>

<section class="board" class:compact aria-live="polite" aria-busy={!data && !error}>
  <header class="summary">
    {#if error && !data}
      <p class="state"><span class="dot unknown" aria-hidden="true"></span> Status data is unavailable right now.</p>
    {:else if !data}
      <p class="state"><span class="dot unknown pulse" aria-hidden="true"></span> Loading live status…</p>
    {:else if checked.length === 0}
      <p class="state">
        <span class="dot unknown pulse" aria-hidden="true"></span> Collecting data. The first checks run within 5 minutes.
      </p>
    {:else}
      <p class="state">
        <span class="dot" class:up={upCount === checked.length} class:down={upCount < checked.length} aria-hidden="true"></span>
        <strong>{upCount === checked.length ? 'All systems operational' : `${checked.length - upCount} site${checked.length - upCount > 1 ? 's' : ''} down`}</strong>
      </p>
      <dl class="figures mono">
        <div><dt>Up</dt><dd>{upCount}/{checked.length}</dd></div>
        <div><dt>Median response (24h)</dt><dd>{fleetMedian ?? '–'} ms</dd></div>
        <div><dt>Last check</dt><dd>{ago(lastChecked)}</dd></div>
      </dl>
    {/if}
  </header>

  {#if data && data.sites.length}
    <div class="table-wrap">
      <table>
        <caption class="visually-hidden">Live uptime and response times for client websites</caption>
        <thead>
          <tr>
            <th scope="col">Site</th>
            <th scope="col" class="num">Response</th>
            {#if !compact}
              <th scope="col" class="num opt">Median 24h</th>
              <th scope="col" class="num opt">Uptime 24h</th>
              <th scope="col" class="num">Uptime 30d</th>
            {/if}
            <th scope="col" class="spark-col">Last 24 hours</th>
          </tr>
        </thead>
        <tbody>
          {#each data.sites as site (site.slug)}
            {@const spark = sparkline(site.recent)}
            <tr>
              <th scope="row">
                <span
                  class="dot"
                  class:up={site.up === true}
                  class:down={site.up === false}
                  class:unknown={site.up === null}
                  aria-hidden="true"
                ></span>
                <a href={`/work/${site.slug}`}>{site.name}</a>
                <span class="visually-hidden">{site.up === null ? 'not checked yet' : site.up ? 'up' : 'down'}</span>
              </th>
              <td class="num mono">
                {#if site.up === false}
                  <span class="bad">{site.status ? `HTTP ${site.status}` : 'Timeout'}</span>
                {:else}
                  {site.lastMs != null ? `${site.lastMs} ms` : '–'}
                {/if}
              </td>
              {#if !compact}
                <td class="num mono opt">{site.medianMs24h != null ? `${site.medianMs24h} ms` : '–'}</td>
                <td class="num mono opt">{pct(site.uptime24h)}</td>
                <td class="num mono">{pct(site.uptime30d)}</td>
              {/if}
              <td class="spark-col">
                {#if spark.line}
                  <svg viewBox="0 0 120 28" class="spark" aria-hidden="true" preserveAspectRatio="none">
                    {#each spark.fails as x}
                      <line x1={x} x2={x} y1="0" y2="28" class="fail" />
                    {/each}
                    <path d={spark.line} />
                  </svg>
                {:else}
                  <span class="muted mono small">Not enough data</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</section>

<style>
  .board {
    border: 1px solid var(--line);
    border-radius: calc(var(--radius) * 1.5);
    background: var(--surface);
    overflow: hidden;
  }
  .summary {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem 2rem;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--line);
  }
  .state { display: flex; align-items: center; gap: 0.65rem; }
  .figures { display: flex; flex-wrap: wrap; gap: 0.5rem 2rem; font-size: 0.8rem; }
  .figures div { display: flex; gap: 0.5rem; }
  .figures dt { color: var(--muted); }

  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: var(--step--1); }
  th, td { padding: 0.8rem 1.5rem; text-align: left; white-space: nowrap; }
  thead th {
    font: 500 0.7rem var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--muted);
    border-bottom: 1px solid var(--line);
  }
  tbody tr + tr { border-top: 1px solid var(--line); }
  tbody th { font-weight: 500; }
  tbody th a { text-decoration: none; }
  tbody th a:hover { color: var(--accent); }
  .num { text-align: right; }
  .spark-col { width: 140px; }
  .small { font-size: 0.72rem; }
  .bad { color: #ff6b5e; }

  .dot {
    display: inline-block;
    width: 0.55rem;
    height: 0.55rem;
    margin-right: 0.6rem;
    border-radius: 50%;
    vertical-align: 0.05em;
    background: var(--muted);
  }
  .dot.up { background: #3ddc84; box-shadow: 0 0 0 3px color-mix(in oklab, #3ddc84 25%, transparent); }
  .dot.down { background: #ff6b5e; box-shadow: 0 0 0 3px color-mix(in oklab, #ff6b5e 25%, transparent); }
  .dot.unknown { background: var(--muted); }
  .pulse { animation: pulse 1.6s ease-in-out infinite; }
  @keyframes pulse { 50% { opacity: 0.35; } }

  .spark { width: 120px; height: 28px; overflow: visible; }
  .spark path { fill: none; stroke: var(--accent); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
  .spark .fail { stroke: #ff6b5e; stroke-width: 2; opacity: 0.8; vector-effect: non-scaling-stroke; }
  /* Brighter status colours wash out on the light background, so use deeper ones */
  :global([data-theme='light']) .dot.up { background: #12a150; box-shadow: 0 0 0 3px color-mix(in oklab, #12a150 25%, transparent); }
  :global([data-theme='light']) .bad,
  :global([data-theme='light']) .dot.down { color: #c62828; }
  :global([data-theme='light']) .dot.down { background: #c62828; box-shadow: 0 0 0 3px color-mix(in oklab, #c62828 25%, transparent); }
  :global([data-theme='light']) .spark .fail { stroke: #c62828; }

  .compact th, .compact td { padding-block: 0.65rem; }

  @media (max-width: 640px) {
    th, td { padding-inline: 1rem; }
    .compact .spark-col,
    .opt { display: none; }
  }
</style>
