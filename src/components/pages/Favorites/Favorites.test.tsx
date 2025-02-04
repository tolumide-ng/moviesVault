import '@testing-library/jest-dom';
import { AuthorizationContext } from '@/store/authorization/context';
import { FavoriteMovie } from '@/types/manual/movies';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Favorites from './Favorites';
import { FavoriteMoviesContext } from '@/store/favorites/context';

describe('Favorites', () => {
  const renderComponent = (
    favorites: Array<FavoriteMovie>,
    isLoggedIn = false,
    removeFavorite = jest.fn(),
  ) => {
    render(
      <MemoryRouter>
        <FavoriteMoviesContext.Provider
          value={{ favorites, removeFavorite, addFavorite: jest.fn() }}
        >
          <AuthorizationContext.Provider
            value={{
              state: { isLoggedIn },
              onLogin: jest.fn(),
              onLogout: jest.fn(),
            }}
          >
            <Favorites />
          </AuthorizationContext.Provider>
        </FavoriteMoviesContext.Provider>
      </MemoryRouter>,
    );
  };

  it('renders the list of the favorite movies', () => {
    const favorites = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ] as unknown as Array<FavoriteMovie>;

    renderComponent(favorites);

    expect(screen.getByRole('list')).toBeVisible();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getAllByRole('link')[0]).toHaveAttribute(
      'aria-label',
      'Go to details for Movie 1',
    );
  });

  it('should render an empty favorites page when there are no favorites', () => {
    renderComponent([]);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.getByText('Favorites Empty')).toBeVisible();
    expect(screen.getByText('You do not have any favorites.')).toBeVisible();
  });
});
