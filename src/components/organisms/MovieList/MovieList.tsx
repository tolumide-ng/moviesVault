import { ListItem, UnorderedList } from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router';
import MovieCard from '../MovieCard/MovieCard';
import { FavoriteMovie } from '@/types/manual/movies';

type Props = {
  movies: Array<FavoriteMovie>;
  toggleFavoriteMovie: (movie: FavoriteMovie) => void;
  isLoggedIn: boolean;
};

function MovieList({
  isLoggedIn,
  toggleFavoriteMovie,
  movies,
}: Readonly<Props>) {
  return (
    <UnorderedList
      display={'flex'}
      flexWrap="wrap"
      justifyContent="center"
      gap={6}
      mb={8}
      listStyleType={'none'}
      aria-live="polite"
    >
      {movies?.map((movie) => (
        <ListItem
          key={movie.id}
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
        >
          <Link
            to={`/movies/${movie.id}`}
            aria-label={`Go to details for ${movie.title}`}
          >
            <MovieCard
              movie={movie}
              onClick={toggleFavoriteMovie}
              isLoggedIn={isLoggedIn}
            />
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
}

export default React.memo(MovieList);
