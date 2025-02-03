export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
