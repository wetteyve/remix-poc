import {
  AlertLink,
  PrimaryLink,
  SecondaryLink,
} from '@styled-components/ClickableComponents/Link';
import React from 'react';

const Index = () => {
  return (
    <div className="flex w-full flex-col items-center gap-y-4 p-6">
      <h1 className="text-xl font-semibold">
        Play SRG 👰‍♀️ & 🤵‍♂️ Remix = PlayNext ❤️‍🔥
      </h1>
      <SecondaryLink to="old-about" text="About us" type="text" />
      <PrimaryLink to="old-help" text="Help" type="text" />
      <AlertLink to="old-page" text="Help" type="text" />
    </div>
  );
};

export default Index;
