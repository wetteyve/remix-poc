import Koa from 'koa';
import { ServerMode } from '../app/utils/env.server.js';
import {
  setupCompression,
  setupContentSecurityPolicy,
  setupIndexing,
  setupRemixKoaApp,
  setupStaticFileServing,
  startKoaServer,
} from './utils/koa.utils.js';
import { getVideDevServer } from './utils/vite.utils.js';

const MODE = (process.env.NODE_ENV as ServerMode) ?? 'development';

// Create a vite dev server if needed.
const viteDevServer = await getVideDevServer();

// Setup a new Koa app.
const app = new Koa();
setupCompression(app);
setupStaticFileServing(app, viteDevServer);
setupContentSecurityPolicy(app, MODE);
setupRemixKoaApp(app, MODE);
setupIndexing(app);

// Start the server.
startKoaServer(app, MODE);
