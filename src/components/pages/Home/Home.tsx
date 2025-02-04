import * as React from 'react';
import { SearchBar } from '@/components/organisms/SearchBar/SearchBar';
import { MoviesContext } from '@/store/movies/context';
import { Button, Box, Stack, Flex, Text } from '@chakra-ui/react';
import { AuthorizationContext } from '@/store/authorization/context';
import { Status } from '@/types/manual/status';
import { Loader } from '@/components/molecules/Loader/Loader';
import { Notification } from '@/components/molecules/Notification/Notification';
import { useHome } from './useHome';
import MovieList from '@/components/organisms/MovieList/MovieList';

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
      <Flex mb={16} justifyContent="center" width={'100%'}>
        <SearchBar
          formData={searchBarOptions}
          onChange={onChange}
          onSelect={onSelect}
        />
      </Flex>
      <MovieList
        movies={movies}
        isLoggedIn={isLoggedIn}
        toggleFavoriteMovie={toggleFavoriteMovie}
      />
      {status === Status.Success && (
        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          mt={8}
          align={'center'}
        >
          <Button
            onClick={onPreviousPage}
            disabled={currentPage <= 1}
            variant="outline"
            colorScheme="teal"
            aria-label="Previous Page"
          >
            Previous
          </Button>
          <Text>Page {currentPage}</Text>
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
      {status === Status.Loading && <Loader />}
      {status === Status.Error && (
        <Notification message="Please try again later" />
      )}
    </Box>
  );
}
