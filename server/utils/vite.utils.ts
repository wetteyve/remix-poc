import { ServerMode } from '../../app/utils/env.server';

export const getVideDevServer = async () => {
  // We want a dev server if we're not in production or staging
  const serverMode = (process.env.NODE_ENV as ServerMode) ?? 'development';
  const VITE_DEV_SERVER =
    serverMode !== 'production' && serverMode !== 'staging';

  return VITE_DEV_SERVER
    ? await import('vite').then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      )
    : undefined;
};
