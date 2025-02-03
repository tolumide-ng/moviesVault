import * as React from 'react';
import { Status } from '@/types/manual/status';
import { Movie } from '@/types/manual/movies';

export type MovieState = {
  status: Status;
  movie: Movie | null;
  error: string | null;
};

export type StoreMovie = {
  fetchMovie: (_id: string) => Promise<void>;
  state: MovieState;
};

export const SpecificMovieContext = React.createContext<StoreMovie>(
  {} as StoreMovie,
);
