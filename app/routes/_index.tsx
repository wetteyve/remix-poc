import { Link } from '@remix-run/react';
import React from 'react';

const Index = () => {
  return (
    <div className="flex w-full flex-col items-center gap-y-4 p-6">
      <h1 className="text-xl font-semibold">
        Play SRG 👰‍♀️ & 🤵‍♂️ Remix = PlayNext ❤️‍🔥
      </h1>
      <Link to="old-about">About Us</Link>
      <Link to="old-help">Help</Link>
      <Link to="old-page">other Page</Link>
    </div>
  );
};

export default Index;
