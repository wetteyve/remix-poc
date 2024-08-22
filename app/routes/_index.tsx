import {
  AlertLink,
  PrimaryLink,
  SecondaryLink,
  TransparentLink,
} from '@styled-components/ClickableComponents/Link';
import React from 'react';
import { Icon } from '../components/ui/icon';

const Index = () => {
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
