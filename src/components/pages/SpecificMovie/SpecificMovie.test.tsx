import '@testing-library/jest-dom';
import { TestWrapper } from '@/utils/testUtils';
import { render, screen } from '@testing-library/react';
import SpecificMovie from './SpecificMovie';

describe('SpecificMovie', () => {
  it('should render the specificMovie Page', () => {
    render(
      <TestWrapper>
        <SpecificMovie />
      </TestWrapper>,
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
