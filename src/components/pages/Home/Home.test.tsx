import '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { MoviesContext, StoreMovies } from '@/store/movies/context';
import { Movie } from '@/types/manual/movies';
import { AuthorizationContext } from '@/store/authorization/context';
import { Status } from '@/types/manual/status';
import { TestWrapper } from '@/utils/testUtils';
import { MemoryRouter } from 'react-router';

const mockMovies = [
  { id: '1', title: 'Movie 1', favorite: false },
  { id: '2', title: 'Movie 2', favorite: true },
] as unknown as Array<Movie>;

const moviesStoreContext = {
  currentPageMovies: mockMovies,
  currentPage: 1,
  onFilterChange: jest.fn(),
  onNextPage: jest.fn(),
  onPreviousPage: jest.fn(),
  hasNextPage: true,
  status: Status.Success,
};

const wrapper = (storeMovies: StoreMovies = moviesStoreContext) =>
  render(
    <MoviesContext.Provider value={storeMovies}>
      <AuthorizationContext.Provider
        value={{
          state: { isLoggedIn: true },
          onLogin: jest.fn(),
          onLogout: jest.fn(),
        }}
      >
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthorizationContext.Provider>
    </MoviesContext.Provider>,
  );

describe('HomePage', () => {
  it('should render a list of movies', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>,
    );
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
    expect(screen.getByRole('textbox', { name: 'Title' })).toBeVisible();
    expect(screen.getAllByRole('combobox')).toHaveLength(2);
    expect(screen.getByText('US Certificates')).toBeVisible();
  });

  it('should render the page when status is success', () => {
    wrapper({ ...moviesStoreContext });

    expect(screen.getByRole('button', { name: 'Next Page' })).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Next Page' }),
    ).not.toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Previous Page' }),
    ).toBeDisabled();
  });
});
