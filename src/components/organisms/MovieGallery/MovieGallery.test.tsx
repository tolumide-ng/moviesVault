import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MovieGallery } from './MovieGallery';
import { FavoriteMovie } from '@/types/manual/movies';

describe('MovieGallery', () => {
  const mockMovie = {
    title: 'Inception',
    images: ['image1.jpg', 'image2.jpg'],
    genres: ['Sci-Fi', 'Thriller'],
  } as unknown as FavoriteMovie;

  it('renders the movie images correctly', () => {
    render(
      <MovieGallery onClick={jest.fn()} movie={mockMovie} isLoggedIn={false} />,
    );

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    expect(images[1]).toHaveAttribute('src', 'image2.jpg');
  });

  it('renders genres correctly', () => {
    render(
      <MovieGallery onClick={jest.fn()} movie={mockMovie} isLoggedIn={false} />,
    );

    const tags = screen.getAllByText(/Sci-Fi|Thriller/);
    expect(tags.length).toBe(2);
    expect(tags[0]).toHaveTextContent('Sci-Fi');
    expect(tags[1]).toHaveTextContent('Thriller');
  });

  it('renders nothing if movie is not provided', () => {
    render(
      <MovieGallery onClick={jest.fn()} movie={undefined} isLoggedIn={false} />,
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText('Sci-Fi')).not.toBeInTheDocument();
  });

  it('renders FavoriteButton when logged in', () => {
    render(
      <MovieGallery onClick={jest.fn()} movie={mockMovie} isLoggedIn={true} />,
    );

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('does not render FavoriteButton when not logged in', () => {
    render(
      <MovieGallery onClick={jest.fn()} movie={mockMovie} isLoggedIn={false} />,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onClick when FavoriteButton is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    render(
      <MovieGallery
        onClick={mockOnClick}
        movie={mockMovie}
        isLoggedIn={true}
      />,
    );

    expect(mockOnClick).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
