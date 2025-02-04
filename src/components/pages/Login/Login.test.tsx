import '@testing-library/jest-dom';
import { AuthorizationContext } from '@/store/authorization/context';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import Login from './Login';
import { render, screen } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: jest.fn(() => <div>Redirecting...</div>),
}));

describe('Login', () => {
  const renderLogin = (isLoggedIn: boolean = false, onLogin = jest.fn()) =>
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthorizationContext.Provider
          value={{ state: { isLoggedIn }, onLogin, onLogout: jest.fn() }}
        >
          <Login />
        </AuthorizationContext.Provider>
      </MemoryRouter>,
    );

  it('renders the Login Page', () => {
    renderLogin();

    expect(screen.getByText('Login')).toBeVisible();
    expect(
      screen.getByRole('textbox', { name: 'Username' }),
    ).not.toBeDisabled();
    expect(screen.getByPlaceholderText('Enter your password')).toBeVisible();
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
  });

  it('should allow users type into the input box', async () => {
    const mockLogin = jest.fn().mockResolvedValueOnce(true);
    renderLogin(false, mockLogin);

    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: 'Username' }), 'Name');
    await user.type(screen.getByLabelText(/Password/i), 'Lucky password');

    expect(mockLogin).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button'));

    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  it('should redirect the user if they are already logged in', () => {
    renderLogin(true, jest.fn());

    expect(screen.queryByText('Redirecting...')).not.toBeInTheDocument();
  });
});
