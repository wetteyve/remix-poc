import {
  json,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import React from 'react';
import Document from './components/remix/Document';
import tailwindStyleSheetUrl from './styles/tailwind.css?url';
import { getEnv } from './utils/env.server';
import { useNonce } from './utils/nonce-provider';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStyleSheetUrl },
    { rel: 'icon', href: '/favicon.ico' },
  ].filter(Boolean);
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Play SRG & Remix POC' },
    { name: 'description', content: 'Play SRG & Remix POC app' },
    { name: 'theme-color', content: '#000000' },
  ];
};

export const loader = ({}: LoaderFunctionArgs) => {
  return json({
    ENV: getEnv(),
  });
};

const App = () => {
  const data = useLoaderData<typeof loader>();
  const nonce = useNonce();
  const allowIndexing = data.ENV.ALLOW_INDEXING !== 'false';

  return (
    <Document nonce={nonce} allowIndexing={allowIndexing} env={data.ENV}>
      <div className="flex h-screen flex-col justify-between">
        <header className="bg-slate-200 p-6">
          <nav>
            <div className="text-4xl font-semibold">Header</div>
          </nav>
        </header>
        <div className="flex-1">
          <Outlet />
        </div>
        <footer className="bg-slate-200 p-6">
          <div className="text-4xl font-semibold">Footer</div>
        </footer>
      </div>
    </Document>
  );
};

export default App;
