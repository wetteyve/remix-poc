import { RemixBrowser } from '@remix-run/react';
import React, { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';

startTransition(() => {
  hydrateRoot(document, <RemixBrowser />);
});
