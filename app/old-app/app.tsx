import { Box } from '@app/components/Box';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const app = () => {
  return (
    <Routes>
      <Route path="old-about" element={<Box>About</Box>} />
      <Route path="old-help" element={<div>Help</div>} />
      <Route path="old-page" element={<div>Page</div>} />
    </Routes>
  );
};

export default app;
