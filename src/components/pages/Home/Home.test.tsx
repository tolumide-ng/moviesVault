import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { MoviesContext, StoreMovies } from '@/store/movies/context';
import { Movie } from '@/types/manual/movies';
import { AuthorizationContext } from '@/store/authorization/context';
import { Status } from '@/types/manual/status';

const mockMovies = [
  { id: '1', title: 'Movie 1', favorite: false },
  { id: '2', title: 'Movie 2', favorite: true },
] as unknown as Array<Movie>;

const moviesStoreContext = {
  currentPageMovies: mockMovies,
  currentPage: 1,
  onPreviousPage: jest.fn(),
  onNextPage: jest.fn(),
  onFilterChange: jest.fn(),
  status: Status.Success,
  hasNextPage: true,
};

const wrapper = (storeMovies: StoreMovies) =>
  render(
    <MoviesContext.Provider value={storeMovies}>
      <AuthorizationContext.Provider
        value={{
          state: { isLoggedIn: true },
          onLogin: jest.fn(),
          onLogout: jest.fn(),
        }}
      >
        <Home />
      </AuthorizationContext.Provider>
    </MoviesContext.Provider>,
  );

describe('HomePage', () => {
  it('should render a list of movies', () => {
    // wrapper({ ...moviesStoreContext, status: Status.Success });
    // expect(screen.getByText('Next Page')).toBeVisible();
  });
});
