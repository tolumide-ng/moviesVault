import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './components/pages/Home/Home';
import { TopBar } from './components/organisms/TopBar/TopBar';
import ProtectedRoute from './components/organisms/ProtectedRoute/ProtectedRoute';
const SpecificMovie = React.lazy(
  () => import('./components/pages/SpecificMovie/SpecificMovie'),
);
const Login = React.lazy(() => import('./components/pages/Login/Login'));
const Favorites = React.lazy(
  () => import('./components/pages/Favorites/Favorites'),
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<SpecificMovie />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
