import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  AlertLink,
  PrimaryLink,
  SecondaryLink,
  TransparentLink,
} from '@styled-components/ClickableComponents/Link';
import React from 'react';
import { getEnv } from '../utils/server/env.server';

export const loader = ({}: LoaderFunctionArgs) => {
  return {
    basePath: getEnv().REMIX_BASE_PATH ?? '',
  };
};

const Index = () => {
  const { basePath } = useLoaderData<typeof loader>();

  return (
    <div className="flex w-full flex-col items-center gap-y-4 p-6">
      <h1 className="text-xl font-semibold">
        Play SRG 👰‍♀️ & 🤵‍♂️ Remix = PlayNext ❤️‍🔥
      </h1>
      <PrimaryLink to={`${basePath}/old-help`} text="Help page" type="text" />
      <SecondaryLink
        to={`${basePath}/old-about`}
        text="About page"
        type="text"
      />
      <AlertLink to={`${basePath}/old-page`} text="Another page" type="text" />
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
