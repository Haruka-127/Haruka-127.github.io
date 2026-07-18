// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://haruka-127.github.io',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
});
