import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Notification } from './Notification';

describe('Notification', () => {
  it('Should render the title if its provided', () => {
    render(<Notification message="Something went wrong" title="Big Error" />);
    expect(screen.getByText('Big Error')).toBeVisible();
    expect(screen.getByText('Something went wrong')).toBeVisible();
  });

  it('should render placeholder error when there is no title', () => {
    render(<Notification message="Something went wrong" />);
    expect(screen.getByText('Error')).toBeVisible();
    expect(screen.getByText('Something went wrong')).toBeVisible();
  });
});
