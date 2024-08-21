# Server Timing

![Network tab of Chrome DevTools showing the Timing tab of a specific network call "This is what server timings do"](https://github.com/wetteyve/remix-poc/docs/assets/server-timing.png)

PlayNext comes with a built-in server timing utility that allows you to
measure the performance of your application. You can find it in the
`app/utils/server/timing.server.ts` file. The idea is you can wrap a function in a
`time` call and then use the timings object to generate a `Server-Timing` header
which you can then use to have fine grained timing metrics for requests made in
your app.

You can
[learn more about the Server Timing header on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing).
The metrics passed in this header will be visually displayed in
[the DevTools "Timing" tab](https://developer.chrome.com/docs/devtools/network/reference/#timing).

## Usage

Timings requires four parts:

1. Setup Timings
2. Time functions
3. Create headers
4. Send headers

Here are all those parts in action in the `/` route at the
time of this writing:

```tsx
import {
  combineServerTimings,
  makeTimings,
  time,
} from '../utils/server/timing.server';

export async function loader({}: LoaderFunctionArgs) {
  const timings = makeTimings('test loader'); // <-- 1. Setup Timings
  // 2. Time functions
  const timed1 = await time(
    () =>
      new Promise<string>((resolve) => setTimeout(() => resolve('timed1'), 55)),
    { timings, type: 'test timed1' },
  );
  if (!timed1) {
    throw new Response('Not found', { status: 404 });
  }
  // 2. Time functions
  const timed2 = await time(
    () =>
      new Promise<string>((resolve) => setTimeout(() => resolve('timed2'), 97)),
    { timings, type: 'test timed2' },
  );
  return json(
    { timed1, timed2 },
    { headers: { 'Server-Timing': timings.toString() } }, // <-- 3. Create headers
  );
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
  return {
    'Server-Timing': combineServerTimings(parentHeaders, loaderHeaders), // <-- 4. Send headers
  };
};
```

You can
[learn more about `headers` in the Remix docs](https://remix.run/docs/en/main/route/headers).
