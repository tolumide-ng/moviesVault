import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './components/pages/Home/Home';
import { TopBar } from './components/organisms/TopBar/TopBar';
const SpecificMovie = React.lazy(
  () => import('./components/pages/SpecificMovie/SpecificMovie'),
);
const Login = React.lazy(() => import('./components/pages/Login/Login'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<SpecificMovie />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
