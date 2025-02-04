import { FavoriteMovie, Movie } from '@/types/manual/movies';
import * as React from 'react';

export type FavoritesState = {
  favorites: Array<FavoriteMovie>;
  addFavorite: (_movie: Movie) => void;
  removeFavorite: (_id: string) => void;
};

export const FavoriteMoviesContext = React.createContext<FavoritesState>(
  {} as FavoritesState,
);
