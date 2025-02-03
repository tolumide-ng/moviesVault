import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './components/pages/Home/Home';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
