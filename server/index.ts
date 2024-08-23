import Koa from 'koa';
import { ServerMode } from '../app/utils/env.server.js';
import {
  setupCompression,
  setupContentSecurityPolicy,
  setupHTTPSRedirect,
  setupIndexing,
  setupRedirect,
  setupRemixKoaApp,
  setupStaticFileServing,
  startKoaServer,
} from './utils/koa.utils.js';
import { getVideDevServer } from './utils/vite.utils.js';

export const MODE = (process.env.NODE_ENV as ServerMode) ?? 'development';

// Create a vite dev server if needed.
export const viteDevServer = await getVideDevServer();

// Setup a new Koa app.
const app = new Koa();
setupCompression(app);
MODE !== 'development' && setupHTTPSRedirect(app);
setupStaticFileServing(app);
setupContentSecurityPolicy(app);
setupRedirect(app);
setupRemixKoaApp(app);
setupIndexing(app);

// Start the server.
startKoaServer(app);
