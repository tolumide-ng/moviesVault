import * as React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { AuthorizationContext } from '@/store/authorization/context';
import { Notification } from '@/components/molecules/Notification/Notification';
import { FavoriteMoviesContext } from '@/store/favorites/context';
import MovieList from '@/components/organisms/MovieList/MovieList';

export default function Favorites() {
  const { favorites, removeFavorite } = React.useContext(FavoriteMoviesContext);
  const {
    state: { isLoggedIn },
  } = React.useContext(AuthorizationContext);

  return (
    <Box as="section" p={4}>
      {favorites?.length ? (
        <MovieList
          isLoggedIn={isLoggedIn}
          toggleFavoriteMovie={(movie) => removeFavorite(movie.id)}
          movies={favorites}
        />
      ) : (
        <Flex justify="center">
          <Notification
            title="Favorites Empty"
            message="You do not have any favorites."
          />
        </Flex>
      )}
    </Box>
  );
}
