import * as React from 'react';

export const usePagination = (initialPage: number) => {
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  const onNextPage = () => setCurrentPage((prev) => prev + 1);
  const onPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return {
    currentPage,
    onNextPage,
    onPreviousPage,
  };
};
