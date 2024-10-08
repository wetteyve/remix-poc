import {
  createReadableStreamFromReadable,
  type ActionFunctionArgs,
  type HandleDocumentRequestFunction,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import chalk from 'chalk';
import { isbot } from 'isbot';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { renderHeadToString } from 'remix-island';
import { PassThrough } from 'stream';
import { ServerStyleSheet } from 'styled-components';
import { getHead } from './root';
import { NonceProvider } from './utils/providers/nonce.provider';
import { getEnv, init } from './utils/server/env.server';

const ABORT_DELAY = 5000;

init();
global.ENV = getEnv();

type DocRequestArgs = Parameters<HandleDocumentRequestFunction>;

export default async function handleRequest(...args: DocRequestArgs) {
  const [
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    loadContext,
  ] = args;

  const callbackName = isbot(request.headers.get('user-agent'))
    ? 'onAllReady'
    : 'onShellReady';

  const styleSheet = new ServerStyleSheet();
  const nonce = loadContext.cspNonce?.toString() ?? '';

  return new Promise(async (resolve, reject) => {
    let didError = false;
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
      styleSheet.collectStyles(
        <NonceProvider value={nonce}>
          <RemixServer
            context={remixContext}
            url={request.url}
            abortDelay={ABORT_DELAY}
          />
        </NonceProvider>,
      ),
      {
        [callbackName]: () => {
          shellRendered = true;
          responseHeaders.set('Content-Type', 'text/html');
          const head = renderHeadToString({
            request,
            remixContext,
            Head: getHead(nonce),
          });
          const body = injectStyles(head, styleSheet, pipe);
          const stream = createReadableStreamFromReadable(body);

          resolve(
            new Response(stream, {
              status: responseStatusCode,
              headers: responseHeaders,
            }),
          );
        },
        onShellError: (err: unknown) => {
          reject(err);
        },
        onError: () => {
          didError = true;
        },
        nonce,
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

export async function handleDataRequest(response: Response) {
  return response;
}

export function handleError(
  error: unknown,
  { request }: LoaderFunctionArgs | ActionFunctionArgs,
): void {
  // Skip capturing if the request is aborted as Remix docs suggest
  // Ref: https://remix.run/docs/en/main/file-conventions/entry.server#handleerror
  if (request.signal.aborted) {
    return;
  }
  if (error instanceof Error) {
    console.error(chalk.red(error.stack));
  } else {
    console.error(chalk.red(error));
  }
}

function injectStyles(
  head: string,
  styleSheet: ServerStyleSheet,
  pipe: <Writable extends NodeJS.WritableStream>(
    destination: Writable,
  ) => Writable,
) {
  const body = new PassThrough();
  body.write(
    `<!DOCTYPE html><html lang="en" className="h-full overflow-x-hidden"><head>${head} ${styleSheet.getStyleTags()}</head><body className="bg-background text-foreground"><div id="root">`,
  );
  pipe(body);
  body.write('</div></body></html>');
  return body;
}
