import { type SEOHandle } from '@nasa-gcn/remix-seo';
import { serverOnly$ } from 'vite-env-only/macros';
import { routesConfig } from '../utils/routesConfig';

export { default } from '../old-app/app';

export const handle: SEOHandle = {
  getSitemapEntries: serverOnly$(async () => {
    return routesConfig.map((route) => {
      if (route.path) {
        return {
          route: `/${route.path}`,
          priority: 1,
        };
      }
      return null;
    });
  }),
};
