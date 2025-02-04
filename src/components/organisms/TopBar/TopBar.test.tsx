import '@testing-library/jest-dom';
import { AuthorizationContext } from '@/store/authorization/context';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { TopBar } from './TopBar';
import { render, screen } from '@testing-library/react';

describe('TopBar', () => {
  const renderComponent = (
    contextValue = { state: { isLoggedIn: false }, onLogout: jest.fn() },
    route = '/',
  ) =>
    render(
      <AuthorizationContext.Provider
        value={{ ...contextValue, onLogin: jest.fn() }}
      >
        <MemoryRouter initialEntries={[route]}>
          <TopBar />
        </MemoryRouter>
      </AuthorizationContext.Provider>,
    );

  describe('when user is Logged in', () => {
    it('renders the title and menu', () => {
      renderComponent({ state: { isLoggedIn: true }, onLogout: jest.fn() });

      expect(screen.getByText('Log Out')).toBeVisible();
      expect(screen.getByText('Favorites')).toBeVisible();
      expect(screen.getByText('Movies Vault')).toBeVisible();
      expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });

    it('should call the Logout handler if the user clicks logout', async () => {
      const user = userEvent.setup();
      const onLogout = jest.fn();
      renderComponent({ state: { isLoggedIn: true }, onLogout });

      expect(onLogout).not.toHaveBeenCalled();
      await user.click(screen.getByText('Log Out'));
      expect(onLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe('when user is Logged out', () => {
    it('renders correct menu and title', () => {
      renderComponent({ state: { isLoggedIn: false }, onLogout: jest.fn() });

      expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
      expect(screen.queryByText('Favorites')).not.toBeInTheDocument();
      expect(screen.getByText('Movies Vault')).toBeVisible();
      expect(screen.getByText('Login')).toBeVisible();
    });

    it('renders correct menu and title if the user is on the login Page', () => {
      renderComponent(
        { state: { isLoggedIn: false }, onLogout: jest.fn() },
        '/login',
      );

      expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
      expect(screen.queryByText('Favorites')).not.toBeInTheDocument();
      expect(screen.getByText('Movies Vault')).toBeVisible();
      expect(screen.queryByText('Login')).not.toBeInTheDocument();
    });
  });
});
