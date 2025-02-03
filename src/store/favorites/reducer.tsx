import { Movie } from '@/types/manual/movies';

type Action =
  | { type: 'ADD_FAVORITE'; payload: Movie }
  | { type: 'REMOVE_FAVORITE'; payload: { id: string } };

export type FavoriteMovies = Array<Movie>;

export function favoritesReducer(
  state: FavoriteMovies,
  action: Action,
): FavoriteMovies {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      if (state.some((movie) => movie.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];
    }
    case 'REMOVE_FAVORITE': {
      return state.filter((favorite) => favorite.id !== action.payload.id);
    }
    default:
      return state;
  }
}
