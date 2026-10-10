// Captures desktop and mobile screenshots of every client site listed in
// src/content/projects. Run with `npm run screenshots`; output goes to
// src/assets/projects/ where Astro's <Image> optimises it at build time.
import { chromium } from 'playwright';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const projectsDir = path.join(root, 'src/content/projects');
const outDir = path.join(root, 'src/assets/projects');

const viewports = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

async function readProjects() {
  const files = (await readdir(projectsDir)).filter((f) => f.endsWith('.md'));
  return Promise.all(
    files.map(async (file) => {
      const text = await readFile(path.join(projectsDir, file), 'utf8');
      const url = text.match(/^url:\s*["']?([^"'\n]+)/m)?.[1];
      return { slug: file.replace(/\.md$/, ''), url };
    }),
  );
}

const only = process.argv.slice(2);
const projects = (await readProjects()).filter((p) => p.url && (!only.length || only.includes(p.slug)));
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
for (const { slug, url } of projects) {
  for (const [name, viewport] of Object.entries(viewports)) {
    const { width, height, ...rest } = viewport;
    const context = await browser.newContext({ viewport: { width, height }, ...rest, reducedMotion: 'reduce' });
    const page = await context.newPage();
    try {
      // Sites with streaming assets (e.g. WebGL) never go network-idle, so fall back to `load`.
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 }).catch(() => page.waitForLoadState('load'));
      await page.waitForTimeout(2500);
      const file = path.join(outDir, `${slug}-${name}.png`);
      await page.screenshot({ path: file });
      console.log(`✓ ${slug} ${name}`);
    } catch (err) {
      console.error(`✗ ${slug} ${name}: ${err.message}`);
    } finally {
      await context.close();
    }
  }
}
await browser.close();
