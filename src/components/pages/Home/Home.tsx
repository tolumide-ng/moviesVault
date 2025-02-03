import * as React from 'react';
import { SearchBar } from '@/components/organisms/SearchBar/SearchBar';
import { MoviesContext } from '@/store/movies/context';
import {
  Button,
  Box,
  Stack,
  Flex,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import MovieCard from '@/components/organisms/MovieCard/MovieCard';
import { Link } from 'react-router';
import { AuthorizationContext } from '@/store/authorization/context';
import { Status } from '@/types/manual/status';
import { Loader } from '@/components/molecules/Loader/Loader';
import { Notification } from '@/components/molecules/Notification/Notification';
import { useHome } from './useHome';

export default function Home() {
  const {
    currentPageMovies,
    currentPage,
    onFilterChange,
    onNextPage,
    onPreviousPage,
    hasNextPage,
    status,
  } = React.useContext(MoviesContext);

  const { searchBarOptions, onChange, onSelect, movies, toggleFavoriteMovie } =
    useHome(onFilterChange, currentPageMovies);

  const {
    state: { isLoggedIn },
  } = React.useContext(AuthorizationContext);

  return (
    <Box as="article" p={4}>
      <>
        <Flex mb={16} justifyContent="center" width={'100%'}>
          <SearchBar
            formData={searchBarOptions}
            onChange={onChange}
            onSelect={onSelect}
          />
        </Flex>

        <UnorderedList
          display={'flex'}
          flexWrap="wrap"
          justifyContent="center"
          gap={6}
          mb={8}
          listStyleType={'none'}
        >
          {movies.map((movie) => (
            <ListItem
              key={movie.id}
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
            >
              <Link to={`/movies/${movie.id}`}>
                <MovieCard
                  movie={movie}
                  onClick={toggleFavoriteMovie}
                  isLoggedIn={isLoggedIn}
                />
              </Link>
            </ListItem>
          ))}
        </UnorderedList>

        {status === Status.Success && (
          <Stack direction="row" spacing={4} justifyContent="center" mt={8}>
            <Button
              onClick={onPreviousPage}
              disabled={currentPage <= 1}
              variant="outline"
              colorScheme="teal"
              aria-label="Previous Page"
            >
              Previous
            </Button>

            <Button
              onClick={onNextPage}
              disabled={!hasNextPage || status !== Status.Success}
              variant="outline"
              colorScheme="teal"
              aria-label="Next Page"
            >
              Next
            </Button>
          </Stack>
        )}
      </>

      {status === Status.Loading && <Loader />}
      {status === Status.Error && (
        <Notification message="Please try again later" />
      )}
    </Box>
  );
}
