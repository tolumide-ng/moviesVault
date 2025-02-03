import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Home Page</>} />
      </Routes>
    </BrowserRouter>
  );
}
