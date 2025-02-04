import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './components/pages/Home/Home';
const SpecificMovie = React.lazy(
  () => import('./components/pages/SpecificMovie/SpecificMovie'),
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<SpecificMovie />} />
      </Routes>
    </BrowserRouter>
  );
}
