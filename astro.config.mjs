// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://paulkroy.tech',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
