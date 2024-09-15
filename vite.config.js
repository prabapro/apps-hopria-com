import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import fs from 'fs';
import appDataPlugin from './vite-plugin-app-data';

function generateInputObject() {
  const srcDir = resolve(__dirname, 'src');
  const appsDir = resolve(__dirname, 'content/apps');
  const input = {
    main: resolve(srcDir, 'index.html')
  };

  const appFiles = fs.readdirSync(appsDir);

  appFiles.forEach((file) => {
    if (file.endsWith('.md')) {
      const name = file.replace('.md', '');
      input[name] = resolve(srcDir, 'index.html');
      input[`${name}-privacy`] = resolve(srcDir, 'index.html');
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
    {
      name: 'copy-netlify-redirects',
      writeBundle() {
        fs.copyFileSync(
          resolve(__dirname, 'public/_redirects'),
          resolve(__dirname, 'dist/_redirects')
        );
      }
    }
  ],
});