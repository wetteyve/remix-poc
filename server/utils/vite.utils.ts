import { ServerMode } from '../../app/utils/env.server';

export const getVideDevServer = async (MODE: ServerMode) => {
  // We want a dev server if we're not in production or staging
  return MODE !== 'production' && MODE !== 'staging'
    ? await import('vite').then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      )
    : undefined;
};
