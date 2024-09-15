import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import fs from 'fs';
import appDataPlugin from './vite-plugin-app-data';

function generateInputObject() {
  const srcDir = resolve(__dirname, 'src');
  const files = fs.readdirSync(srcDir);
  const input = {};

  files.forEach((file) => {
    if (file.endsWith('.html')) {
      const name = file.split('.')[0];
      input[name] = resolve(srcDir, file);
    }
  });

  return input;
}

export default defineConfig({
  publicDir: resolve(__dirname, 'public'),
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: generateInputObject(),
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  server: {
    port: 8080,
  },
  plugins: [
    appDataPlugin(),
    ViteMinifyPlugin({}),
  ],
});