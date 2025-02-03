import * as React from 'react';
import { Status } from '@/types/manual/status';
import { apiCall } from '@/utils/apiCall';
import { MoviesContext, MoviesState } from './context';
import { FilterData, Movie } from '@/types/manual/movies';
import { MOVIES_PER_PAGE, TOTAL_MOVIES } from '@/utils/constants';
import { usePagination } from '@/utils/hooks/usePagination';
import { handleError } from '@/utils/handleError';

export const MoviesProvider = ({ children }: React.PropsWithChildren) => {
  const [state, setState] = React.useState<MoviesState>({
    status: Status.Rest,
    lastFetchedPage: 0,
    currentPage: 1,
    moviesByPage: {},
    filter: null,
    error: null,
  });

  const { currentPage, onNextPage, onPreviousPage } = usePagination(
    state.currentPage,
  );

  const fetchMovies = React.useCallback(async () => {
    setState((prevState) => ({ ...prevState, status: Status.Loading }));

    const modifiedFilter = Object.fromEntries(
      Object.entries(state.filter ?? {}).map(([key, value]) => [
        key === 'rating' ? `rating_in` : `${key}_like`,
        value,
      ]),
    );

    try {
      const response = await apiCall<Array<Movie>>({
        path: 'movies',
        method: 'GET',
        params: {
          ...modifiedFilter,
          _limit: MOVIES_PER_PAGE,
          _start: (state.currentPage - 1) * MOVIES_PER_PAGE,
        },
      });

      setState((prevState) => ({
        ...prevState,
        status: Status.Success,
        lastFetchedPage: state.currentPage,
        moviesByPage: {
          ...prevState.moviesByPage,
          [prevState.currentPage]: response ?? [],
        },
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        status: Status.Error,
        error: handleError(error),
      }));
    }
  }, [state.currentPage, state.filter]);

  const onFilterChange = React.useCallback((filter: FilterData) => {
    setState({
      status: Status.Rest,
      filter,
      lastFetchedPage: 0,
      currentPage: 1,
      moviesByPage: {},
      error: null,
    });
  }, []);

  React.useEffect(() => {
    if (!state.moviesByPage[state.currentPage] && state.filter) {
      fetchMovies();
    }
  }, [state.filter, state.currentPage, fetchMovies, state.moviesByPage]);

  const valueProps = React.useMemo(
    () => ({
      currentPage,
      onPreviousPage,
      onNextPage,
      onFilterChange,
      currentPageMovies: state.moviesByPage[state.currentPage] ?? [],
      status: state.status,
      hasNextPage:
        TOTAL_MOVIES > Object.keys(state.moviesByPage).length * MOVIES_PER_PAGE,
    }),
    [
      state.status,
      state.currentPage,
      state.moviesByPage,
      onFilterChange,
      onNextPage,
      onPreviousPage,
      currentPage,
    ],
  );

  return (
    <MoviesContext.Provider value={valueProps}>
      {children}
    </MoviesContext.Provider>
  );
};
