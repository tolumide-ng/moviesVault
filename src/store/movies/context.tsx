import * as React from 'react';
import { FilterData, Movie } from '@/types/manual/movies';
import { Status } from '@/types/manual/status';

export type MoviesByPage = Record<number, Array<Movie>>;

export type MoviesState = {
  status: Status;
  lastFetchedPage: number;
  currentPage: number;
  moviesByPage: MoviesByPage;
  filter: FilterData | null;
  error: string | null;
};

export type StoreMovies = {
  currentPageMovies: Array<Movie>;
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onFilterChange: (_: FilterData) => void;
  status: Status;
  hasNextPage: boolean;
};

export const MoviesContext = React.createContext<StoreMovies>(
  {} as StoreMovies,
);
