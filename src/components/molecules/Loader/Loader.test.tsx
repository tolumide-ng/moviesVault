import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader', () => {
  it('renders the loading text', () => {
    render(<Loader />);

    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });
});
