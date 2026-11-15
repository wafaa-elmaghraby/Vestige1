import { defineConfig, type ResolvedConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'node:fs';
import path from 'path';
import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';
import { atoms } from '@metagptx/web-sdk/plugins';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import Sitemap from 'vite-plugin-sitemap';
import { getBlogRoutes } from './prerender/blog-routes.js';
import { getSitemapLastmod } from './prerender/blog-sitemap.js';
import { reactHmrGuard } from './plugins/react-hmr-guard';
import { webSdkEntityUpdateGuard } from './plugins/web-sdk-entity-update-guard';
import { overviewHtmlPlaceholders, pageMetadata } from './plugins/overview-metadata';

process.env.VITE_APP_TITLE ??= process.env.OVERVIEW_TITLE ?? 'VESTIGE — Interplanetary Relic Atlas';
process.env.VITE_APP_DESCRIPTION ??=
  process.env.OVERVIEW_DESCRIPTION ??
  'A bilingual scientific atlas of the spacecraft humanity left on the Moon and Mars.';
process.env.VITE_APP_LOGO_URL ??= process.env.OVERVIEW_LOGO_URL ?? '/favicon.svg';

function ensureBuildOutDir() {
  let outDir = path.resolve(__dirname, 'dist');

  return {
    name: 'ensure-build-out-dir',
    configResolved(config: ResolvedConfig) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      fs.mkdirSync(outDir, { recursive: true });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const blogPrerenderRoutes = command === 'build' ? getBlogRoutes() : [];

  return {
    // Relative base keeps builds portable on GitHub Pages subpaths.
    // Set VITE_BASE=/repository-name/ when publishing to project pages.
    base: process.env.VITE_BASE || '/',
    plugins: [
      overviewHtmlPlaceholders(),
      viteSourceLocator({
        prefix: 'mgx', // Prefix used to identify source locations; do not change.
      }),
      webSdkEntityUpdateGuard(path.resolve(__dirname, 'src')),
      reactHmrGuard(),
      react(),
      atoms(),
      ensureBuildOutDir(),
      Sitemap({
        hostname: process.env.VITE_SITE_URL?.replace(/\/+$/, '') || 'https://vestige-atlas.com',
        lastmod: getSitemapLastmod(),
        readable: true,
        generateRobotsTxt: true,
      }),
      ...(blogPrerenderRoutes.length > 0
        ? vitePrerenderPlugin({
            renderTarget: '#root',
            prerenderScript: path.resolve(__dirname, 'prerender/index.js'),
            additionalPrerenderRoutes: blogPrerenderRoutes,
          })
        : []),
      pageMetadata(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0', // Listen on all network interfaces.
      port: parseInt(process.env.VITE_PORT || '3000'),
      proxy: {
        '/api': {
          target: `http://localhost:${process.env.BACKEND_PORT || '8000'}`,
          changeOrigin: true,
        },
      },
      watch: { usePolling: true, interval: 600 },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return;
            if (id.includes('leaflet')) return 'map-vendor';
            if (id.includes('/motion/') || id.includes('framer-motion')) return 'motion-vendor';
            if (id.includes('@radix-ui')) return 'ui-vendor';
            if (id.includes('react-router')) return 'router-vendor';
            if (id.includes('lucide-react')) return 'icons-vendor';
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
              return 'react-vendor';
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
