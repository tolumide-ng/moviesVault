import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Ratings } from './Ratings';

describe('Ratings', () => {
  it('renders correct number of full stars', () => {
    render(<Ratings rating={4} />);
    const fullStars = screen.getAllByTestId('full-star');
    expect(fullStars.length).toBe(4);
  });

  it('renders correct number of full stars and half stars', () => {
    render(<Ratings rating={3.5} />);
    const fullStars = screen.getAllByTestId('full-star');
    const halfStar = screen.getByTestId('half-star');
    expect(fullStars.length).toBe(3);
    expect(halfStar).toBeInTheDocument();
  });

  it('renders correct number of empty stars for ratings', () => {
    render(<Ratings rating={2.75} />);
    const emptyStars = screen.getAllByTestId('empty-star');
    expect(emptyStars.length).toBe(2);
  });
});
