import * as React from 'react';
import { MoviesProvider } from './movies/provider';
import { SpecificMovieProvider } from './specificMovie/provider';
import { AuthorizationProvider } from './authorization/provider';
import { FavoriteMovieProvider } from './favorites/provider';

const providers = [
  MoviesProvider,
  SpecificMovieProvider,
  AuthorizationProvider,
  FavoriteMovieProvider,
];

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
