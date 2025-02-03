import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';
import { FormData } from '@/types/manual/form';

const mockFormData = [
  {
    name: 'textInput',
    label: 'Text Input',
    type: 'text',
    value: 'Sample text',
  },
  {
    name: 'selectInput',
    label: 'Select Input',
    type: 'select',
    value: 'option1',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
  {
    name: 'checkboxInput',
    label: 'Checkbox Input',
    type: 'checkbox',
    value: ['option1'],
    options: ['option1', 'option2'],
  },
] as unknown as Array<FormData>;

describe('SearchBar', () => {
  it('renders all form fields correctly', () => {
    render(
      <SearchBar
        formData={mockFormData}
        onChange={jest.fn()}
        onSelect={jest.fn()}
      />,
    );

    expect(screen.getByLabelText(/Text Input/)).toBeVisible();
    expect(screen.getByLabelText(/option1/)).toBeVisible();
    expect(screen.getByLabelText(/option2/)).toBeVisible();
  });

  it('calls onChange when input value changes', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(
      <SearchBar
        formData={mockFormData}
        onChange={mockOnChange}
        onSelect={jest.fn}
      />,
    );

    expect(mockOnChange).not.toHaveBeenCalled();

    const typedText = 'New text ';
    await user.type(screen.getByLabelText(/Text Input/), typedText);
    expect(mockOnChange).toHaveBeenCalledTimes(typedText.length);
  });
});
