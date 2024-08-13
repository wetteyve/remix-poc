import {
  json,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { defaultTheme } from '@styled-components/styles/Themes';
import React from 'react';
import { createHead } from 'remix-island';
import { ThemeProvider } from 'styled-components';
import tailwindStyleSheetUrl from './styles/tailwind.css?url';
import { getEnv } from './utils/env.server';

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

export const Head = createHead(() => {
  const data = useLoaderData<typeof loader>();
  const allowIndexing = data.ENV.ALLOW_INDEXING !== 'false';

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      {allowIndexing ? null : (
        <meta name="robots" content="noindex, nofollow" />
      )}
      <Meta />
      <Links />
    </>
  );
});

const App = () => {
  const data = useLoaderData<typeof loader>();
  const allowIndexing = data.ENV.ALLOW_INDEXING !== 'false';

  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {allowIndexing ? null : (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        <div className="flex h-screen flex-col justify-between">
          <header className="bg-slate-200 p-6">
            <nav>
              <div className="text-4xl font-semibold">Header</div>
            </nav>
          </header>
          <div className="flex-1">
            <ThemeProvider theme={defaultTheme}>
              <Outlet />
            </ThemeProvider>
          </div>
          <footer className="bg-slate-200 p-6">
            <div className="text-4xl font-semibold">Footer</div>
          </footer>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default App;
