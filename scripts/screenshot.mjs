// Captures desktop and mobile screenshots of every client site listed in
// src/content/projects. Run with `npm run screenshots`; output goes to
// src/assets/projects/ where Astro's <Image> optimises it at build time.
import { chromium } from 'playwright';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const projectsDir = path.join(root, 'src/content/projects');

// `--full` captures the whole desktop page into captures/ for review, instead of
// the first screen into src/assets/projects/ (which the site uses directly).
const args = process.argv.slice(2);
const full = args.includes('--full');
const only = args.filter((a) => !a.startsWith('--'));
const outDir = path.join(root, full ? 'captures' : 'src/assets/projects');

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

const projects = (await readProjects()).filter((p) => p.url && (!only.length || only.includes(p.slug)));
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
for (const { slug, url } of projects) {
  for (const [name, viewport] of Object.entries(viewports)) {
    // Full-page mode is desktop only, since the mobile phone frame stays first-screen
    if (full && name !== 'desktop') continue;
    const { width, height, ...rest } = viewport;
    const context = await browser.newContext({ viewport: { width, height }, ...rest, reducedMotion: 'reduce' });
    const page = await context.newPage();
    try {
      // Sites with streaming assets (e.g. WebGL) never go network-idle, so fall back to `load`.
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 }).catch(() => page.waitForLoadState('load'));
      await page.waitForTimeout(2500);
      if (full) {
        // Scroll once through the page so lazy images load, then return to the top
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 80));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(1000);
      }
      const file = path.join(outDir, `${slug}-${name}${full ? '-full' : ''}.png`);
      await page.screenshot({ path: file, fullPage: full });
      console.log(`✓ ${slug} ${name}${full ? ' (full page)' : ''}`);
    } catch (err) {
      console.error(`✗ ${slug} ${name}: ${err.message}`);
    } finally {
      await context.close();
    }
  }
}
await browser.close();
