import { RemixBrowser } from '@remix-run/react';
import React, { StrictMode, startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';

startTransition(() => {
  hydrateRoot(
    document.getElementById('root')!,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});
