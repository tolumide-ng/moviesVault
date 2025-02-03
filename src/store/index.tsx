import * as React from 'react';
import { MoviesProvider } from './movies/provider';

const providers = [MoviesProvider];

export const ContextProvider = ({ children }: React.PropsWithChildren) => (
  <>
    {providers.reduceRight(
      (acc, Provider) => (
        <Provider>{acc}</Provider>
      ),
      children,
    )}
  </>
);
