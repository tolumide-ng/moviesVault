import * as React from 'react';
import { components } from '@/types/generated/schema';
import { FilterData } from '@/types/manual/movies';
import { Status } from '@/types/manual/status';

export type MoviesByPage = Record<
  number,
  components['schemas']['Movies']['data']
>;

export type MoviesState = {
  status: Status;
  lastFetchedPage: number;
  currentPage: number;
  moviesByPage: MoviesByPage;
  filter: FilterData | null;
  error: string | null;
};

export type StoreMovies = {
  currentPageMovies: components['schemas']['Movies']['data'];
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
