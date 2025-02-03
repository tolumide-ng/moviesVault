import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { useHome } from './useHome';
import { TestWrapper } from '@/utils/testUtils';

describe('useHome Hook', () => {
  it('should intialize correctly', () => {
    const { result } = renderHook(() => useHome(jest.fn(), []), {
      wrapper: TestWrapper,
    });

    expect(result.current.movies).toHaveLength(0);
    expect(result.current.searchBarOptions.length).toBeGreaterThan(0);
  });

  it('should update title on change', () => {
    const { result } = renderHook(() => useHome(jest.fn(), []));

    act(() =>
      result.current.onChange({
        target: { name: 'title', value: 'New Title' },
      } as React.ChangeEvent<HTMLInputElement>),
    );
    expect(result.current.searchBarOptions[0].value).toBe('New Title');
  });

  it('should call onSelect method', () => {
    const { result } = renderHook(() => useHome(jest.fn(), []));

    act(() =>
      result.current.onSelect('genres', [{ label: 'comedy', value: 'comedy' }]),
    );
    expect(result.current.searchBarOptions[2].value).toEqual(['comedy']);
  });
});
