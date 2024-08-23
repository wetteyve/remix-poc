import { HeadersFunction, json, LoaderFunctionArgs } from '@remix-run/node';
import {
  AlertLink,
  PrimaryLink,
  SecondaryLink,
  TransparentLink,
} from '@styled-components/ClickableComponents/Link';
import React from 'react';
import {
  combineServerTimings,
  makeTimings,
  time,
} from '../utils/server/timing.server';

export async function loader({}: LoaderFunctionArgs) {
  const timings = makeTimings('test loader', 'this is just a description'); // <-- 1. Setup Timings
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

const Index = () => {
  return (
    <div className="flex w-full flex-col items-center gap-y-4 p-6">
      <h1 className="text-xl font-semibold">
        Play SRG 👰‍♀️ & 🤵‍♂️ Remix = PlayNext ❤️‍🔥
      </h1>
      <PrimaryLink to="old-help" text="Help page" type="text" />
      <SecondaryLink to="old-about" text="About page" type="text" />
      <AlertLink to="old-page" text="Another page" type="text" />
      <TransparentLink
        to="https://github.com/epicweb-dev/epic-stack"
        text="Epic Stack 🚀"
        type="text"
        showDefaultIcon
      />
    </div>
  );
};

export default Index;
