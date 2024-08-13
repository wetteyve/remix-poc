import { Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import React from 'react';

const Document = ({
  children,
  nonce,
  env = {},
  allowIndexing = true,
}: {
  children: React.ReactNode;
  nonce: string;
  env?: Record<string, string>;
  allowIndexing?: boolean;
}) => {
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
        {children}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)}`,
          }}
        />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
};

export default Document;
