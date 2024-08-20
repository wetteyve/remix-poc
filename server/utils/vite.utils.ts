import { MODE } from '../index.js';

export const getVideDevServer = async () => {
  // We want a dev server if we're not in production or staging
  const VITE_DEV_SERVER = MODE !== 'production' && MODE !== 'staging';

  return VITE_DEV_SERVER
    ? await import('vite').then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      )
    : undefined;
};
