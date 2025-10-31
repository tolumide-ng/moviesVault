import '@testing-library/jest-dom';
import { TestWrapper } from '@/utils/testUtils';
import { render, screen } from '@testing-library/react';
import SpecificMovie from './SpecificMovie';
import { SpecificMovieContext } from '@/store/specificMovie/context';
import { Status } from '@/types/manual/status';
import { FavoriteMovie, Movie } from '@/types/manual/movies';
import { FavoriteMoviesContext } from '@/store/favorites/context';
import { AuthorizationContext } from '@/store/authorization/context';

describe('SpecificMovie', () => {
  const mockMovie = {
    id: '1',
    title: 'Test Movie',
    description: 'Test description',
    rating: 4,
    castCrew: ['Actor 1', 'Actor 2'],
    releaseDate: '2023-01-01',
    usCertificates: ['PG'],
    favorite: false,
  } as unknown as Movie;

  const fetchMovieMock = jest.fn();
  const addFavoriteMock = jest.fn();
  const removeFavoriteMock = jest.fn();

  const renderComponent = (
    status = Status.Success,
    favorites: FavoriteMovie[] = [],
  ) =>
    render(
      <TestWrapper>
        <SpecificMovieContext.Provider
          value={{
            fetchMovie: fetchMovieMock,
            state: { movie: mockMovie, status, error: null },
          }}
        >
          <FavoriteMoviesContext.Provider
            value={{
              favorites,
              addFavorite: addFavoriteMock,
              removeFavorite: removeFavoriteMock,
            }}
          >
            <AuthorizationContext.Provider
              value={{
                state: { isLoggedIn: true },
                onLogin: jest.fn(),
                onLogout: jest.fn(),
              }}
            >
              <SpecificMovie />
            </AuthorizationContext.Provider>
          </FavoriteMoviesContext.Provider>
        </SpecificMovieContext.Provider>
      </TestWrapper>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the specificMovie Page', () => {
    renderComponent();

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /test movie/i })).toBeVisible();
    expect(screen.getByText(/actor 1/i)).toBeVisible();
    expect(screen.getByText(/actor 2/i)).toBeVisible();
  });

  describe('Dynamically renders components based on status', () => {
    it('shows favorite state correctly when status is success', () => {
      renderComponent(Status.Success, [mockMovie as FavoriteMovie]);
      expect(screen.getByRole('button', { name: /favorite/i })).toBeVisible();
      expect(screen.getByText('Description')).toBeVisible();
    });

    it('shows error message when the movie is not found', async () => {
      renderComponent(Status.Error);
      expect(
        screen.getByText('Could not find this movie, Please try again later'),
      ).toBeVisible();
      expect(screen.queryByText('Description')).not.toBeInTheDocument();
    });
  });
});
