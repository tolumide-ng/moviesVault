import * as React from 'react';
import { Status } from '@/types/manual/status';
import { apiCall } from '@/utils/apiCall';
import { areFiltersEqual, MoviesContext, MoviesState } from './context';
import { FilterData, Movie } from '@/types/manual/movies';
import { MOVIES_PER_PAGE, TOTAL_MOVIES } from '@/utils/constants';
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

  const onNextPage = React.useCallback(
    () => setState((prev) => ({ ...prev, currentPage: prev.currentPage + 1 })),
    [],
  );

  const onPreviousPage = React.useCallback(
    () =>
      setState((prev) => ({
        ...prev,
        currentPage: Math.max(prev.currentPage - 1, 1),
      })),
    [],
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
          [state.currentPage]: response ?? [],
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

  const onFilterChange = React.useCallback(
    (filter: FilterData) => {
      if (state.filter && areFiltersEqual(state.filter, filter)) {
        return;
      }
      setState({
        status: Status.Rest,
        filter,
        lastFetchedPage: 0,
        currentPage: 1,
        moviesByPage: {},
        error: null,
      });
    },
    [state.filter],
  );

  React.useEffect(() => {
    if (!state.moviesByPage[state.currentPage] && state.filter) {
      fetchMovies();
    }
  }, [state.filter, state.currentPage, fetchMovies, state.moviesByPage]);

  const valueProps = React.useMemo(
    () => ({
      currentPage: state.currentPage,
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
      state.moviesByPage,
      onFilterChange,
      onNextPage,
      onPreviousPage,
      state.currentPage,
    ],
  );

  return (
    <MoviesContext.Provider value={valueProps}>
      {children}
    </MoviesContext.Provider>
  );
};
