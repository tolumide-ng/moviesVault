import * as React from 'react';
import { Box, Image, Text, Flex } from '@chakra-ui/react';
import { FavoriteMovie } from '@/types/manual/movies';
import { FavoriteButton } from '@/components/molecules/FavoriteButton/FavoriteButton';

type Props = {
  movie: FavoriteMovie;
  onClick: (_movie: FavoriteMovie) => void;
  isLoggedIn: boolean;
};

function MovieCard({ movie, onClick, isLoggedIn }: Readonly<Props>) {
  const { title, images, description } = movie;

  return (
    <Box
      as="article"
      aria-labelledby={`movie-title-${title}`}
      aria-describedby={`movie-description-${title}`}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="lg"
      width="22rem"
    >
      <Box position="relative">
        <Image
          src={images?.[0]}
          alt={`Poster for ${title}`}
          objectFit="cover"
          width="100%"
          height="20.5rem"
          loading="lazy"
        />
      </Box>

      <Box p="0.5rem" height={'30%'}>
        <Flex direction="column" justify="space-between" height={'9rem'}>
          <Box>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              noOfLines={1}
              color="gray.800"
              textTransform={'capitalize'}
            >
              {title}
            </Text>

            <Text fontSize="sm" color="gray.600" noOfLines={3}>
              {description}
            </Text>
          </Box>

          {isLoggedIn && <FavoriteButton onClick={onClick} movie={movie} />}
        </Flex>
      </Box>
    </Box>
  );
}

export default React.memo(MovieCard);
