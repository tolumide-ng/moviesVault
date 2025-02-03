import * as React from 'react';
import { AuthorizationContext } from './context';
import { AUTH_KEY } from '@/utils/constants';
import { authReducer, AuthState } from './reducer';

const API_DELAY = 200;

const getStoredAuth = (): AuthState => {
  try {
    const storedAuth = localStorage.getItem(AUTH_KEY);
    return storedAuth ? JSON.parse(storedAuth) : { isLoggedIn: false };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return { isLoggedIn: false };
  }
};

const saveAuthState = (state: AuthState) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
};

export const AuthorizationProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(
    authReducer,
    undefined,
    getStoredAuth,
  );

  React.useEffect(() => {
    saveAuthState(state);
  }, [state]);

  async function onLogin(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: 'LOGIN' });
        resolve(true);
      }, API_DELAY);
    });
  }

  async function onLogout(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: 'LOGOUT' });
        resolve(false);
      }, API_DELAY);
    });
  }

  const valueProps = React.useMemo(
    () => ({
      onLogin,
      onLogout,
      state,
    }),
    [state],
  );

  return (
    <AuthorizationContext.Provider value={valueProps}>
      {children}
    </AuthorizationContext.Provider>
  );
};
