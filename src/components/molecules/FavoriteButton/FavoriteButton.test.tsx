import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FavoriteButton } from './FavoriteButton';
import { FavoriteMovie } from '@/types/manual/movies';

const movie = {
  id: '1',
  title: 'Inception',
  favorite: false,
} as unknown as FavoriteMovie;

describe('FavoriteButton', () => {
  it('renders correctly when favorite is false', () => {
    render(<FavoriteButton movie={movie} onClick={jest.fn()} />);

    expect(screen.getByText('Add Favorite')).toBeVisible();
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Add to favorites',
    );
  });

  it('renders correctly when favorite is true', () => {
    render(
      <FavoriteButton
        movie={{ ...movie, favorite: true }}
        onClick={jest.fn()}
      />,
    );

    expect(screen.getByText('Remove Favorite')).toBeVisible();
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Remove from favorites',
    );
  });
});
