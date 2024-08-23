import { type SEOHandle } from '@nasa-gcn/remix-seo';
import { type MetaFunction } from '@remix-run/react';
import { serverOnly$ } from 'vite-env-only/macros';
import { routesConfig } from '../utils/routesConfig';

export { default } from '../old-app/app';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Old App',
    },
    {
      name: 'description',
      content: 'This is the old app',
    }
  ];
};

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
