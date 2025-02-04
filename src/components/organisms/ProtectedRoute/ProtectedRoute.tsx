import { AuthorizationContext } from '@/store/authorization/context';
import * as React from 'react';
import { Navigate } from 'react-router';

export default function ProtectedRoute({
  children,
}: Readonly<React.PropsWithChildren>) {
  const { state } = React.useContext(AuthorizationContext);

  if (!state.isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return children;
}
