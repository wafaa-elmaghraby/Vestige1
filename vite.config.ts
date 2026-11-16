import { defineConfig, type ResolvedConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'node:fs';
import path from 'path';
import Sitemap from 'vite-plugin-sitemap';

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

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE || '/',
    plugins: [
      react(),
      ensureBuildOutDir(),
      Sitemap({
        hostname: process.env.VITE_SITE_URL?.replace(/\/+$/, '') || 'https://vestige-atlas.com',
        readable: true,
        generateRobotsTxt: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.VITE_PORT || '3000'),
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
