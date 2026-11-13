import crypto from 'crypto';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function createAppVersionPlugin(buildId: string, builtAt: string): Plugin {
  const payload = JSON.stringify({buildId, builtAt}, null, 2);
  return {
    name: 'app-version-manifest',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const cleanUrl = (req.url || '').split('?')[0];
        if (cleanUrl === '/version.json' || cleanUrl.endsWith('/version.json')) {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
          res.end(payload);
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: payload,
      });
    },
  };
}

export default defineConfig(({command}) => {
  const builtAt = new Date().toISOString();
  const shortHash = crypto.randomBytes(4).toString('hex');
  const buildId =
    command === 'build'
      ? `${builtAt.replace(/[-:.]/g, '').slice(0, 15)}-${shortHash}`
      : `dev-${shortHash}`;

  return {
    base: './',
    define: {
      __APP_BUILD_ID__: JSON.stringify(buildId),
      __APP_BUILT_AT__: JSON.stringify(builtAt),
    },
    plugins: [react(), tailwindcss(), createAppVersionPlugin(buildId, builtAt)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
