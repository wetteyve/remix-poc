import { Box } from '@styled-components/Box';
import React from 'react';
import { type RouteObject } from 'react-router-dom';

type RouteObjectWithMeta = RouteObject & {
  meta?: {
    title: string;
    description: string;
  };
};

export const routesConfig: RouteObjectWithMeta[] = [
  {
    path: 'old-about',
    element: <Box>About</Box>,
    meta: {
      title: 'Old About',
      description: 'This is the about page',
    },
  },
  {
    path: 'old-help',
    element: <div>Help</div>,
    meta: {
      title: 'Old help',
      description: 'This is the help page',
    },
  },
  {
    path: 'old-page',
    element: <div>Page</div>,
    meta: {
      title: 'Old Page',
      description: 'This is the page',
    },
  },
];
