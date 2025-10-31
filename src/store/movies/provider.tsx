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

  const buildFilter = React.useCallback((filter: FilterData | null) => {
    if (!filter) return {};

    return Object.fromEntries(
      Object.entries(filter).map(([key, value]) => [
        key === 'rating' ? `rating_in` : `${key}_like`,
        value,
      ]),
    );
  }, []);

  const fetchMovies = React.useCallback(
    async (page: number, filter: FilterData | null) => {
      setState((prevState) => ({ ...prevState, status: Status.Loading }));

      try {
        const response = await apiCall<Array<Movie>>({
          path: 'movies',
          method: 'GET',
          params: {
            ...buildFilter(filter),
            _limit: MOVIES_PER_PAGE,
            _start: (page - 1) * MOVIES_PER_PAGE,
          },
        });

        setState((prevState) => ({
          ...prevState,
          status: Status.Success,
          lastFetchedPage: page,
          moviesByPage: {
            ...prevState.moviesByPage,
            [page]: response ?? [],
          },
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          status: Status.Error,
          error: handleError(error),
        }));
      }
    },
    [buildFilter],
  );

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

  // Fetch movies when page or filter changes
  React.useEffect(() => {
    const page = state.currentPage;
    const filter = state.filter;

    if (!state.moviesByPage[page] && filter) {
      fetchMovies(page, filter);
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
