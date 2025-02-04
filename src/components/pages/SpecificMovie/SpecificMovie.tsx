import * as React from 'react';
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { SpecificMovieContext } from '@/store/specificMovie/context';
import { useParams } from 'react-router';
import { Ratings } from '@/components/molecules/Ratings/Ratings';
import { KeyValue } from '@/components/molecules/KeyValue/KeyValue';
import { MovieGallery } from '@/components/organisms/MovieGallery/MovieGallery';
import { FavoriteMovie } from '@/types/manual/movies';
import { Status } from '@/types/manual/status';
import { AuthorizationContext } from '@/store/authorization/context';
import { Loader } from '@/components/molecules/Loader/Loader';
import { Notification } from '@/components/molecules/Notification/Notification';
import { FavoriteMoviesContext } from '@/store/favorites/context';
import { MovieDetail } from '@/components/organisms/MovieDetail/MovieDetail';

export default function SpecificMovie() {
  const { id } = useParams();

  const {
    fetchMovie,
    state: { movie, status },
  } = React.useContext(SpecificMovieContext);

  const { favorites, addFavorite, removeFavorite } = React.useContext(
    FavoriteMoviesContext,
  );

  const {
    state: { isLoggedIn },
  } = React.useContext(AuthorizationContext);

  React.useEffect(() => {
    fetchMovie(id!);
  }, [fetchMovie, id]);

  function handleClickFavorite(movie: FavoriteMovie) {
    if (movie.favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  const modifiedMovie = {
    ...movie,
    favorite: favorites?.some((fav) => fav.id === movie?.id),
  } as FavoriteMovie;

  return (
    <Box as="article" p={4}>
      {status === Status.Success && (
        <>
          <Heading
            as="h1"
            size="xl"
            textAlign={{ base: 'center', md: 'left' }}
            mb={8}
            textTransform={'capitalize'}
          >
            {movie?.title}
          </Heading>

          <Box mb={8}>
            <MovieGallery
              movie={modifiedMovie}
              onClick={handleClickFavorite}
              isLoggedIn={isLoggedIn}
            />
          </Box>

          <Box mb={8}>
            <Heading as="h2" size="md" mb={4} tabIndex={0}>
              Description
            </Heading>
            <Text mb={4}>{movie?.description}</Text>
            <KeyValue
              label="Rating:"
              value={<Ratings rating={movie?.rating ?? 1} />}
            />
          </Box>

          <Box mb={8}>
            <Heading as="h2" size="md" mb={4}>
              Details
            </Heading>
            <MovieDetail
              releaseDate={movie?.releaseDate}
              usCertificates={movie?.usCertificates}
            />
          </Box>

          <Box mb={8}>
            <Heading as="h2" size="md" mb={4}>
              Crew
            </Heading>
            <UnorderedList pl={4}>
              {movie?.castCrew.map((cast) => (
                <ListItem key={cast}>{cast}</ListItem>
              ))}
            </UnorderedList>
          </Box>
        </>
      )}

      {status === Status.Loading && <Loader />}

      {status === Status.Error && (
        <Notification message="Could not find this movie, Please try again later" />
      )}
    </Box>
  );
}
