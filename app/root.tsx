import { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import React from 'react';
import tailwindStyleSheetUrl from './styles/tailwind.css?url';
import { useNonce } from './utils/nonce-provider';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStyleSheetUrl },
    { rel: 'icon', href: '/favicon.ico' },
  ].filter(Boolean);
};

export const meta: MetaFunction = ({ data }) => {
  return [
    { title: 'Play SRG & Remix POC' },
    { name: 'description', content: 'Play SRG & Remix POC app' },
    { name: 'theme-color', content: '#000000' },
  ];
};

export default function Root() {
  const nonce = useNonce();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root" className="flex min-h-screen justify-center">
          <Outlet />
          <Scripts nonce={nonce} />
        </div>
      </body>
    </html>
  );
}
