import { type SEOHandle } from '@nasa-gcn/remix-seo';
import { MetaFunction } from '@remix-run/react';
import { serverOnly$ } from 'vite-env-only/macros';
import { routesConfig } from '../utils/routesConfig';

export { default } from '../old-app/app';

export const meta: MetaFunction = ({ location }) => {
  const currentLocation = location.pathname.slice(1);
  const currentRoute = routesConfig.find(
    (route) => route.path === currentLocation,
  );

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
