import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';
import userEvent from '@testing-library/user-event';
import { FavoriteMovie } from '@/types/manual/movies';

const mockMovie = {
  title: 'Test Movie',
  images: ['https://via.placeholder.com/150'],
  description: 'Test description for a movie',
} as FavoriteMovie;

describe('MovieCard', () => {
  it('renders movie title, description, and image', () => {
    render(
      <MovieCard movie={mockMovie} onClick={jest.fn()} isLoggedIn={false} />,
    );

    expect(screen.getByText('Test Movie')).toBeVisible();
    expect(screen.getByText('Test description for a movie')).toBeVisible();
    expect(screen.getByAltText('Poster for Test Movie')).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150',
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders FavoriteButton when user is logged in', () => {
    render(<MovieCard movie={mockMovie} onClick={jest.fn} isLoggedIn={true} />);

    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toBeVisible();
  });

  it('calls onClick when the favorite button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    render(
      <MovieCard movie={mockMovie} onClick={mockOnClick} isLoggedIn={true} />,
    );

    expect(mockOnClick).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when the unFavorite button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    render(
      <MovieCard
        movie={{ ...mockMovie, favorite: true }}
        onClick={mockOnClick}
        isLoggedIn={true}
      />,
    );

    expect(mockOnClick).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
