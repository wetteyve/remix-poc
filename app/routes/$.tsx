import { type SEOHandle } from '@nasa-gcn/remix-seo';
import { useMatches } from '@remix-run/react';
import { serverOnly$ } from 'vite-env-only/macros';

export { default } from '../old-app/app';

export const handle: SEOHandle = {
  getSitemapEntries: serverOnly$(async () => {
    const matches = useMatches();

    return matches.map((match) => {
      return {
        route: match.pathname,
        priority: 0.7,
      };
    });
  }),
};
