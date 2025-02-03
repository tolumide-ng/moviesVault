import * as React from 'react';

export function useDebounce(value: string, delay: number) {
  const [debounce, setDebounce] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounce;
}
