import { ServerBuild } from '@remix-run/node';
import { ip as ipAddress } from 'address';
import chalk from 'chalk';
import closeWithGrace from 'close-with-grace';
import crypto from 'crypto';
import getPort, { portNumbers } from 'get-port';
import Koa from 'koa';
import compress from 'koa-compress';
import connect from 'koa-connect';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import serve from 'koa-static';
import { createRequestHandler } from 'remix-koa-adapter';
import { MODE, REMIX_BASE_PATH, viteDevServer } from '../index.js';

export const setupCompression = (app: Koa) => app.use(compress());

export const setupHTTPSRedirect = (app: Koa) => {
  app.use(async (ctx, next) => {
    const { host, protocol, url } = ctx;
    const ENFORCE_HTTPS = process.env.IS_PROD;
    if (protocol === 'http' && ENFORCE_HTTPS === 'true') {
      ctx.redirect(`https://${host}${url}`);
    } else {
      await next();
    }
  });
};

export const setupStaticFileServing = (app: Koa) => {
  if (viteDevServer) {
    app.use(connect(viteDevServer.middlewares));
  } else {
    // Remix fingerprints its assets so we can cache forever.
    app.use(
      mount(
        `${process.env.REMIX_BASE_PATH}/assets`,
        serve('build/remix/client/assets', {
          maxAge: 1000 * 60 * 60 * 24 * 100,
          immutable: true,
        }),
      ),
    );
    app.use(
      mount(
        `${process.env.REMIX_BASE_PATH}/fonts`,
        serve('public/fonts', {
          immutable: true,
          maxAge: 1000 * 60 * 24 * 365,
        }),
      ),
    );
    // Everything else (like favicon.ico) is cached for an hour. You may want to be
    // more aggressive with this caching.
    app.use(
      mount(
        `${process.env.REMIX_BASE_PATH}/`,
        serve('build/remix/client', { maxAge: 1000 * 60 * 60 }),
      ),
    );
  }
};

export const setupContentSecurityPolicy = async (app: Koa) => {
  // Workarround because we can't access the ctx object during the helmet middleware
  let tempNonce: string = '';
  app.use(async (ctx, next) => {
    const cspNonce = crypto.randomBytes(16).toString('hex');
    ctx.state.cspNonce = cspNonce;
    tempNonce = cspNonce;
    await next();
  });

  app.use(
    helmet({
      referrerPolicy: { policy: 'same-origin' },
      contentSecurityPolicy: {
        reportOnly: false,
        directives: {
          connectSrc: [
            MODE === 'development' ? 'ws:' : null,
            process.env.SENTRY_DSN ? '*.sentry.io' : null,
            "'self'",
          ].filter(Boolean) as string[],
          fontSrc: ["'self'"],
          frameSrc: ["'self'"],
          imgSrc: ["'self'", 'data:'],
          scriptSrc: [
            "'strict-dynamic'",
            "'self'",
            () => `'nonce-${tempNonce}'`,
          ],
          scriptSrcAttr: [() => `'nonce-${tempNonce}'`],
          'upgrade-insecure-requests': null,
        },
      },
      noSniff: false,
    }),
  );
};

export const setupRemixKoaApp = (app: Koa) =>
  app.use(
    createRequestHandler({
      // not sure how to make this happy 🤷‍♂️
      build: getBuild as unknown as ServerBuild,
      mode: MODE,
      getLoadContext: (ctx) => ({
        serverBuild: getBuild(),
        cspNonce: ctx.state.cspNonce,
      }),
    }),
  );

async function getBuild() {
  const build = viteDevServer
    ? viteDevServer.ssrLoadModule('virtual:remix/server-build')
    : // @ts-ignore this should exist before running the server
      // but it may not exist just yet.
      await import('../../remix/server/index.js');
  return build;
}

export const setupIndexing = (app: Koa) => {
  const ALLOW_INDEXING = process.env.ALLOW_INDEXING !== 'false';
  if (!ALLOW_INDEXING) {
    app.use(async (ctx, next) => {
      ctx.set('X-Robots-Tag', 'noindex, nofollow');
      await next();
    });
  }
};

export const setupRedirect = (app: Koa) => {
  app.use(async (ctx, next) => {
    const { request } = ctx;

    if (request.url.endsWith('/') && request.path.length > 1) {
      const redirectedUrl = request.url.slice(0, -1).replace(/\/+/g, '/');

      ctx.status = 301;
      ctx.redirect(redirectedUrl);
    } else {
      await next();
    }
  });
};

export const startKoaServer = async (app: Koa) => {
  const IS_DEV = MODE === 'development';

  const desiredPort = Number(process.env.PORT || 3000);
  const portToUse = await getPort({
    port: portNumbers(desiredPort, desiredPort + 100),
  });
  const portAvailable = desiredPort === portToUse;
  if (!portAvailable && !IS_DEV) {
    console.log(`⚠️ Port ${desiredPort} is not available.`);
    process.exit(1);
  }

  const server = app.listen(portToUse, () => {
    if (!portAvailable) {
      console.warn(
        chalk.yellow(
          `⚠️  Port ${desiredPort} is not available, using ${portToUse} instead.`,
        ),
      );
    }
    console.log(`🚀  We have liftoff!`);
    const localUrl = `http://localhost:${portToUse}${REMIX_BASE_PATH}`;
    let lanUrl: string | null = null;
    const localIp = ipAddress() ?? 'Unknown';
    // Check if the address is a private ip
    // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
    // https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-dev-utils/WebpackDevServerUtils.js#LL48C9-L54C10
    if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(localIp)) {
      lanUrl = `http://${localIp}:${portToUse}${REMIX_BASE_PATH}`;
    }

    console.log(
      `
${chalk.bold('Local:')}            ${chalk.cyan(localUrl)}
${lanUrl ? `${chalk.bold('On Your Network:')}  ${chalk.cyan(lanUrl)}` : ''}
${chalk.bold('Press Ctrl+C to stop')}
		`.trim(),
    );
  });

  closeWithGrace(async () => {
    await new Promise((resolve, reject) => {
      server.close((e) => (e ? reject(e) : resolve('ok')));
    });
  });
};
