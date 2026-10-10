// Guards `npm run deploy`: refuse to upload a build that is missing pages.
import { existsSync } from 'node:fs';

const required = ['dist/index.html', 'dist/404.html'];
const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error(`Build is incomplete, missing: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Build verified.');
