import { type SEOHandle } from '@nasa-gcn/remix-seo';
import { type MetaFunction } from '@remix-run/react';
import { serverOnly$ } from 'vite-env-only/macros';
import { getCurrentRoute } from '../utils/misc';
import { routesConfig } from '../utils/routesConfig';

export { default } from '../old-app/app';

export const meta: MetaFunction = ({ location }) => {
  // Remove last character if it's a slash
  // won't be necessary when merged with redirect branch
  if (location.pathname.endsWith('/')) {
    location.pathname = location.pathname.slice(0, -1);
  }

  const currentRoute = getCurrentRoute(location.pathname);

  if (currentRoute?.meta) {
    return [
      {
        title: currentRoute.meta.title,
      },
      {
        name: 'description',
        content: currentRoute.meta.description,
      },
    ];
  }
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
