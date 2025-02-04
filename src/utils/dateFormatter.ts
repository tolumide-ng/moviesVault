export const dateFormatter = (date?: string | Date) =>
  new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date?.toString() ?? new Date()));
