import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './components/pages/Home/Home';
import { TopBar } from './components/organisms/TopBar/TopBar';
const SpecificMovie = React.lazy(
  () => import('./components/pages/SpecificMovie/SpecificMovie'),
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<SpecificMovie />} />
      </Routes>
    </BrowserRouter>
  );
}
