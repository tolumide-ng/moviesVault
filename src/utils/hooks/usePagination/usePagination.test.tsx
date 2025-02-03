import { act, renderHook } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('should increment properly increment the currentPage', () => {
    const { result } = renderHook(() => usePagination(2));

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.onNextPage();
    });

    expect(result.current.currentPage).toBe(3);
  });

  it('should not reduce the page if currentPage is 1', () => {
    const { result } = renderHook(() => usePagination(1));

    expect(result.current.currentPage).toBe(1);
    act(() => {
      result.current.onPreviousPage();
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('should reduce the page if currentPage is greater than 1', () => {
    const { result } = renderHook(() => usePagination(40));

    expect(result.current.currentPage).toBe(40);
    act(() => {
      result.current.onPreviousPage();
    });

    expect(result.current.currentPage).toBe(39);
  });
});
