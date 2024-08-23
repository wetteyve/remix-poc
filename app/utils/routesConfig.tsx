import React from "react"
import { type RouteObject } from "react-router-dom";
import { Box } from '@styled-components/Box';

export const routesConfig: RouteObject[] = [
  {
    path: 'old-about',
    element: <Box>About</Box>
  },
  {
    path: 'old-help',
    element: <div>Help</div>
  },
  {
    path: 'old-page',
    element: <div>Page</div>
  }
]