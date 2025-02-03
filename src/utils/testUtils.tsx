import * as React from 'react';
import { ContextProvider } from '@/store';

export function TestWrapper({ children }: Readonly<React.PropsWithChildren>) {
  return <ContextProvider>{children}</ContextProvider>;
}
