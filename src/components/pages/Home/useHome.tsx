import * as React from 'react';
import { FormData, SelectOption } from '@/types/manual/form';
import {
  FavoriteMovie,
  FilterData,
  Genre,
  Movie,
  Rating,
  UsCertificate,
} from '@/types/manual/movies';
import { StoreMovies } from '@/store/movies/context';
import { useDebounce } from '@/utils/hooks/useDebounce/useDebounce';
import { DEBOUNCE_DELAY } from '@/utils/constants';
import { FavoriteMoviesContext } from '@/store/favorites/context';

export const useHomePage = (
  onFilterChange: StoreMovies['onFilterChange'],
  currentPageMovies: Array<Movie>,
) => {
  const { addFavorite, favorites, removeFavorite } = React.useContext(
    FavoriteMoviesContext,
  );

  const [title, setTitle] = React.useState('');
  const [state, setState] = React.useState<Omit<FilterData, 'title'>>({
    rating: Rating.Five,
    genres: [],
    usCertificates: [],
  });
  const debouncedTitle = useDebounce(title, DEBOUNCE_DELAY);

  const movies = React.useMemo(
    () =>
      currentPageMovies?.map((movie) => ({
        ...movie,
        favorite: favorites.findIndex((fav) => fav.id === movie.id) > -1,
      })),
    [favorites, currentPageMovies],
  );

  const ratingOptions = React.useMemo(
    () =>
      Object.entries(Rating).reduce((acc, [label, value]) => {
        if (isNaN(Number(label))) {
          return [...acc, { label, value }];
        }
        return acc;
      }, [] as Array<SelectOption>),
    [],
  );

  function toggleCertificate(value: string) {
    const certificate = value as UsCertificate;
    setState((prevState) => ({
      ...prevState,
      usCertificates: prevState['usCertificates'].includes(certificate)
        ? prevState['usCertificates'].filter((item) => item !== value)
        : [...prevState['usCertificates'], certificate],
    }));
  }

  const searchBarOptions: Array<FormData> = React.useMemo(
    () => [
      {
        name: 'title',
        label: 'Title',
        value: title,
        type: 'text',
      },
      {
        name: 'rating',
        label: 'Movie Rating',
        value: state.rating,
        type: 'select',
        options: ratingOptions,
        isMulti: true,
      },
      {
        name: 'genres',
        label: 'Genre(s)',
        value: state.genres,
        type: 'select',
        options: Object.keys(Genre).map((value) => ({ label: value, value })),
        isMulti: true,
      },
      {
        name: 'usCertificates',
        label: 'US Certificates',
        value: state.usCertificates,
        type: 'checkbox',
        options: Object.keys(UsCertificate),
      },
    ],
    [title, state, ratingOptions],
  );

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;

      if (name === 'usCertificates') {
        toggleCertificate(value);
      } else if (name === 'title') {
        setTitle(value);
      } else {
        setState((prevState) => ({ ...prevState, [name]: value }));
      }
    },
    [],
  );

  const onSelect = React.useCallback(
    (name: string, value: Array<SelectOption>) => {
      setState((prevState) => ({
        ...prevState,
        [name]: value.map((data) => data.value),
      }));
    },
    [],
  );

  const toggleFavoriteMovie = React.useCallback(
    (movie: FavoriteMovie) => {
      if (movie.favorite) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [removeFavorite, addFavorite],
  );

  React.useEffect(() => {
    onFilterChange({ ...state, title: debouncedTitle });
  }, [onFilterChange, state, debouncedTitle]);

  return {
    onChange,
    searchBarOptions,
    onSelect,
    movies,
    toggleFavoriteMovie,
  };
};
