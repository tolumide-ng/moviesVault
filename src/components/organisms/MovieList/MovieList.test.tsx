import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { FavoriteMovie } from '@/types/manual/movies';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import MovieList from './MovieList';

describe('MovieList', () => {
  const mockMovies = [
    { id: '1', title: 'Inception', releaseDate: 2010 },
    { id: '2', title: 'Interstellar', releaseDate: 2014 },
  ] as unknown as Array<FavoriteMovie>;

  it('renders the component', () => {
    render(
      <MemoryRouter>
        <MovieList
          movies={mockMovies}
          toggleFavoriteMovie={jest.fn}
          isLoggedIn={true}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(
      screen.getByLabelText('Go to details for Inception'),
    ).toHaveAttribute('href', '/movies/1');
    expect(
      screen.getByLabelText('Go to details for Interstellar'),
    ).toHaveAttribute('href', '/movies/2');
  });

  it('calls toggleFavoriteMovie when button is clicked', async () => {
    const user = userEvent.setup();
    const mockToggleFavoriteMovie = jest.fn();
    render(
      <MemoryRouter>
        <MovieList
          movies={mockMovies}
          toggleFavoriteMovie={mockToggleFavoriteMovie}
          isLoggedIn={true}
        />
      </MemoryRouter>,
    );

    expect(mockToggleFavoriteMovie).not.toHaveBeenCalled();
    await user.click(screen.getAllByRole('button')[0]);
    expect(mockToggleFavoriteMovie).toHaveBeenCalledTimes(1);
  });

  it('renders without crashing when no movies are provided', () => {
    render(
      <MemoryRouter>
        <MovieList
          movies={[]}
          toggleFavoriteMovie={jest.fn}
          isLoggedIn={true}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
