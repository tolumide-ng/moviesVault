import * as React from 'react';
import { SpecificMovieContext, MovieState } from './context';
import { Status } from '@/types/manual/status';
import { apiCall } from '@/utils/apiCall';

export const SpecificMovieProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [state, setState] = React.useState<MovieState>({
    status: Status.Rest,
    movie: null,
    error: null,
  });

  const fetchMovie = React.useCallback(async (id: string) => {
    setState({ status: Status.Loading, movie: null, error: null });

    try {
      const movie = await apiCall<MovieState['movie']>({
        path: `movies/${id}`,
        method: 'GET',
      });

      setState({ status: Status.Success, movie, error: null });
    } catch (error) {
      setState({
        status: Status.Error,
        movie: null,
        error: (error as Error)?.message,
      });
    }
  }, []);

  const valueProps = React.useMemo(
    () => ({
      fetchMovie,
      state,
    }),
    [state, fetchMovie],
  );
  return (
    <SpecificMovieContext.Provider value={valueProps}>
      {children}
    </SpecificMovieContext.Provider>
  );
};
