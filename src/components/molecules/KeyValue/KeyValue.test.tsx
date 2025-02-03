import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { KeyValue } from './KeyValue';

describe('KeyValue', () => {
  it('should render the label and value', () => {
    render(<KeyValue label="LabelName" value={'BigValue'} />);

    expect(screen.getByText('LabelName')).toBeVisible();
    expect(screen.getByText('BigValue')).toBeVisible();
  });
});
