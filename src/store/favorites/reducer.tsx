import { FavoriteMovie, Movie } from '@/types/manual/movies';

export enum ActionType {
  ADD_FAVORITE = 'ADD_FAVORITE',
  REMOVE_FAVORITE = 'REMOVE_FAVORITE',
}

type Action =
  | { type: ActionType.ADD_FAVORITE; payload: Movie }
  | { type: ActionType.REMOVE_FAVORITE; payload: { id: string } };

export type FavoriteMovies = Array<FavoriteMovie>;

export function favoritesReducer(
  state: FavoriteMovies,
  action: Action,
): FavoriteMovies {
  switch (action.type) {
    case ActionType.ADD_FAVORITE: {
      if (state.some((movie) => movie.id === action.payload.id)) {
        return state;
      }
      return [...state, { ...action.payload, favorite: true }];
    }
    case ActionType.REMOVE_FAVORITE: {
      return state.filter((favorite) => favorite.id !== action.payload.id);
    }
    default:
      return state;
  }
}
