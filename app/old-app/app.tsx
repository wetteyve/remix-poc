import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const app = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col gap-y-4">
            <h1 className="text-xl font-semibold">Hello World</h1>
            <Link to="old-about">About Us</Link>
            <Link to="old-help">Help</Link>
            <Link to="old-page">other Page</Link>
          </div>
        }
      />
      <Route path="old-about" element={<div>About</div>} />
      <Route path="old-help" element={<div>Help</div>} />
      <Route path="old-page" element={<div>Page</div>} />
    </Routes>
  );
};

export default app;
