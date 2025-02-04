import * as React from 'react';
import { ContextProvider } from '@/store';
import { MemoryRouter } from 'react-router';

export function TestWrapper({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <ContextProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </ContextProvider>
  );
}
