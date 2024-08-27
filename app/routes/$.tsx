import { type SEOHandle } from '@nasa-gcn/remix-seo';
import { type MetaFunction } from '@remix-run/react';
import { serverOnly$ } from 'vite-env-only/macros';
import { routesConfig } from '../utils/routesConfig';

export { default } from '../old-app/app';

export const meta: MetaFunction = ({ location, matches }) => {
  console.log(matches);
  const currentLocation = location.pathname;
  const currentRoute = matches.filter(
    (match) => match.pathname === currentLocation,
  )[0];

  //console.log('currentLocation', currentLocation);
  //console.log('currentRoute', currentRoute);
  //console.log('matches', matches);

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
