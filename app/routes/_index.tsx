import { Link, useOutletContext } from '@remix-run/react';
import {
  AlertLink,
  PrimaryLink,
  SecondaryLink,
  TransparentLink,
} from '@styled-components/ClickableComponents/Link';
import React from 'react';
import { Icon } from '../components/icon';
import { OutletContext } from '../root';

const Index = () => {
  const { REMIX_BASE_PATH } = useOutletContext() as OutletContext;

  return (
    <div className="flex w-full flex-col items-center gap-y-4 p-6">
      <h1 className="text-xl font-semibold">
        Play SRG 👰‍♀️ & 🤵‍♂️ Remix = PlayNext ❤️‍🔥
      </h1>
      <div className="items-center justify-center text-center">
        <h2 className="text-lg font-semibold">Icons demo</h2>
        <div className="">
          <Icon className="m-1" name="srf" size="xl" />
          <Icon className="m-1" name="rsi" size="xl" />
          <Icon className="m-1" name="rtr" size="xl" />
          <Icon className="m-1" name="rts" size="xl" />
        </div>
      </div>
      <PrimaryLink
        to={`${REMIX_BASE_PATH}/old-help`}
        text="Help page"
        type="text"
      />
      <Link to={'/old-help'}>This is a remix link</Link>
      <SecondaryLink
        to={`${REMIX_BASE_PATH}/old-about`}
        text="About page"
        type="text"
      />
      <AlertLink
        to={`${REMIX_BASE_PATH}/old-page`}
        text="Another page"
        type="text"
      />
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
