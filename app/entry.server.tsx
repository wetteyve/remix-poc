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
import { PassThrough } from 'stream';
import { getEnv, init } from './utils/env.server';
import { NonceProvider } from './utils/nonce-provider';

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

  const nonce = loadContext.cspNonce?.toString() ?? '';
  return new Promise(async (resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={nonce}>
        <RemixServer context={remixContext} url={request.url} />
      </NonceProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough();
          responseHeaders.set('Content-Type', 'text/html');
          resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );
          pipe(body);
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
