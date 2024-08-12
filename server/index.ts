import { ServerBuild } from '@remix-run/node';
import { ip as ipAddress } from 'address';
import chalk from 'chalk';
import closeWithGrace from 'close-with-grace';
import getPort, { portNumbers } from 'get-port';
import Koa from 'koa';
import compress from 'koa-compress';
import { createRequestHandler } from 'remix-koa-adapter';

const MODE = process.env.NODE_ENV ?? 'development';
const IS_PROD = MODE === 'production';
const IS_DEV = MODE === 'development';
const ALLOW_INDEXING = process.env.ALLOW_INDEXING !== 'false';
const viteDevServer = IS_PROD
  ? undefined
  : await import('vite').then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      }),
    );

const app = new Koa();
app.use(compress());

app.use(
  createRequestHandler({
    // not sure how to make this happy 🤷‍♂️
    build: getBuild as unknown as ServerBuild,
    mode: MODE,
    getLoadContext: () => ({
      serverBuild: getBuild(),
    }),
  }),
);

async function getBuild() {
  const build = viteDevServer
    ? viteDevServer.ssrLoadModule('virtual:remix/server-build')
    : // @ts-ignore this should exist before running the server
      // but it may not exist just yet.
      await import('../build/server/index.js');
  return build;
}

if (!ALLOW_INDEXING) {
  app.use(async (ctx, next) => {
    ctx.set('X-Robots-Tag', 'noindex, nofollow');
    await next();
  });
}

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
  const localUrl = `http://localhost:${portToUse}`;
  let lanUrl: string | null = null;
  const localIp = ipAddress() ?? 'Unknown';
  // Check if the address is a private ip
  // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
  // https://github.com/facebook/create-react-app/blob/d960b9e38c062584ff6cfb1a70e1512509a966e7/packages/react-dev-utils/WebpackDevServerUtils.js#LL48C9-L54C10
  if (/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(localIp)) {
    lanUrl = `http://${localIp}:${portToUse}`;
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
