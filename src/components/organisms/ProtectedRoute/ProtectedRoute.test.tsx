import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AuthorizationContext } from '@/store/authorization/context';
import ProtectedRoute from './ProtectedRoute';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn(() => <div>Redirecting...</div>),
}));

describe('ProtectedRoute', () => {
  const renderWithAuthContext = (
    isLoggedIn: boolean,
    children: JSX.Element,
  ) => {
    return render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthorizationContext.Provider
          value={{
            state: { isLoggedIn },
            onLogin: jest.fn(),
            onLogout: jest.fn(),
          }}
        >
          <Routes>
            <Route
              path="/protected"
              element={<ProtectedRoute>{children}</ProtectedRoute>}
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </AuthorizationContext.Provider>
      </MemoryRouter>,
    );
  };

  it('renders children when the user is logged in', () => {
    const MockChildComponent = () => <div>Protected Content</div>;

    renderWithAuthContext(true, <MockChildComponent />);

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when the user is not logged in', () => {
    renderWithAuthContext(false, <div>Protected Content</div>);

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
