import * as React from 'react';
import { FavoriteMoviesContext } from './context';
import { favoritesReducer } from './reducer';
import { Movie } from '@/types/manual/movies';

const FAVORITE_KEY = 'user_favs';

const loadFavorites = () => {
  try {
    const storedFavorites = localStorage.getItem(FAVORITE_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return [];
  }
};

const saveFavorites = (favorites: Array<Movie>) => {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
};

export const FavoriteMovieProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(
    favoritesReducer,
    [],
    loadFavorites,
  );

  React.useEffect(() => {
    saveFavorites(state);
  }, [state]);

  const addFavorite = React.useCallback((movie: Movie) => {
    dispatch({ type: 'ADD_FAVORITE', payload: movie });
  }, []);

  const removeFavorite = React.useCallback((id: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: { id } });
  }, []);

  React.useEffect(() => {
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(state));
  }, [state]);

  const valueProps = React.useMemo(
    () => ({
      removeFavorite,
      addFavorite,
      favorites: state,
    }),
    [state, removeFavorite, addFavorite],
  );

  return (
    <FavoriteMoviesContext.Provider value={valueProps}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
};
