import { vitePlugin as remix } from '@remix-run/dev';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const MODE = process.env.NODE_ENV;
const REMIX_BASE_PATH = process.env.REMIX_BASE_PATH;
const outDir = 'build/remix';

export default defineConfig({
  build: {
    outDir: outDir,
    cssMinify: MODE === 'production',
    rollupOptions: {
      external: [/node:.*/, 'stream', 'crypto', 'fsevents'],
    },
    sourcemap: true,
  },
  server: {
    watch: {
      ignored: ['**/playwright-report/**'],
    },
  },
  base: MODE === 'production' ? `${REMIX_BASE_PATH}/` : undefined,
  plugins: [
    tsconfigPaths(),
    remix({
      buildDirectory: outDir,
      basename: REMIX_BASE_PATH,
      ignoredRouteFiles: ['**/*'],
      serverModuleFormat: 'esm',
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes, {
          ignoredRouteFiles: [
            '.*',
            '**/*.css',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__*.*',
            // This is for server-side utilities you want to colocate
            // next to your routes without making an additional
            // directory. If you need a route that includes "server" or
            // "client" in the filename, use the escape brackets like:
            // my-route.[server].tsx
            '**/*.server.*',
            '**/*.client.*',
          ],
        });
      },
    }),
  ],
});
