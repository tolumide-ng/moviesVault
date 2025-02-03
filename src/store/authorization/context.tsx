import * as React from 'react';

export type AuthorizationState = {
  state: { isLoggedIn: boolean };
  onLogin: () => Promise<boolean>;
  onLogout: () => Promise<unknown>;
};

export const AuthorizationContext = React.createContext<AuthorizationState>(
  {} as AuthorizationState,
);
