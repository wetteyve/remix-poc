import isPropValid from '@emotion/is-prop-valid';
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
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { href as iconsHref } from './components/icon';
import fontStyleSheetUrl from './styles/SRGSSRType.css?url';
import tailwindStyleSheetUrl from './styles/tailwind.css?url';
import { useNonce } from './utils//providers/nonce.provider';
import {
  ClientHintCheck,
  getHints,
} from './utils/providers/client-hints.provider';
import { getEnv } from './utils/server/env.server';
import { getTheme } from './utils/server/theme.server';

export const links: LinksFunction = () => {
  return [
    { rel: 'preload', href: iconsHref, as: 'image' },
    { rel: 'stylesheet', href: tailwindStyleSheetUrl },
    { rel: 'preload', href: fontStyleSheetUrl, as: 'style' },
    { rel: 'stylesheet', href: fontStyleSheetUrl },
  ].filter(Boolean);
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Play SRG & Remix POC' },
    { name: 'description', content: 'Play SRG & Remix POC app' },
    { name: 'theme-color', content: '#000000' },
  ];
};

export const loader = ({ request }: LoaderFunctionArgs) => {
  return json({
    ENV: getEnv(),
    requestInfo: {
      hints: getHints(request),
      path: new URL(request.url).pathname,
      userPrefs: {
        theme: getTheme(request),
      },
    },
  });
};

export const getHead = (nonce: string) =>
  createHead(() => {
    const data = useLoaderData<typeof loader>();
    const allowIndexing = data.ENV.ALLOW_INDEXING !== 'false';

    return (
      <>
        <ClientHintCheck nonce={nonce} />
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {allowIndexing ? null : (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <link rel="icon" href={`${data.ENV.REMIX_BASE_PATH}/favicon.ico`} />
        <Links />
      </>
    );
  });

export type OutletContext = {
  REMIX_BASE_PATH: string;
};

const App = () => {
  const data = useLoaderData<typeof loader>();
  const nonce = useNonce();
  const outletContext: OutletContext = {
    REMIX_BASE_PATH: data.ENV.REMIX_BASE_PATH ?? '',
  };

  return (
    <StyleSheetManager
      shouldForwardProp={isPropValid}
      enableVendorPrefixes={true}
    >
      <ThemeProvider theme={defaultTheme}>
        <div className="flex h-screen flex-col justify-between">
          <header className="bg-slate-200 p-6">
            <nav>
              <div className="text-4xl font-semibold">Header</div>
            </nav>
          </header>
          <div className="flex-1">
            <Outlet context={outletContext} />
          </div>
          <footer className="bg-slate-200 p-6">
            <div className="text-4xl font-semibold">Footer</div>
          </footer>
        </div>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
