import Koa from 'koa';
import { ServerMode } from '../app/utils/server/env.server.js';
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
export const REMIX_BASE_PATH = process.env.REMIX_BASE_PATH ?? '';

// Create a vite dev server if needed.
export const viteDevServer = await getVideDevServer();

// Setup a new Koa app.
const app = new Koa();
setupCompression(app);
setupHTTPSRedirect(app);
setupStaticFileServing(app);
setupContentSecurityPolicy(app);
setupRedirect(app);
setupRemixKoaApp(app);
setupIndexing(app);

// Start the server.
startKoaServer(app);
