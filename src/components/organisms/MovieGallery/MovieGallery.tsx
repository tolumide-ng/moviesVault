import { Box, Image, UnorderedList, ListItem, Tag } from '@chakra-ui/react';
import { FavoriteMovie } from '@/types/manual/movies';
import { FavoriteButton } from '@/components/molecules/FavoriteButton/FavoriteButton';

type Props = {
  onClick: (_movie: FavoriteMovie) => void;
  movie?: FavoriteMovie;
  isLoggedIn: boolean;
};

export function MovieGallery({ onClick, movie, isLoggedIn }: Readonly<Props>) {
  return (
    <Box>
      <UnorderedList
        display="flex"
        flexWrap="wrap"
        gap="4"
        justifyContent={{ base: 'center', md: 'flex-start' }}
        listStyleType="none"
        mb="4"
      >
        {movie?.images?.map((image, index) => (
          <ListItem key={image} alignSelf="center" tabIndex={0}>
            <Image
              src={image}
              alt={`${movie?.title} ${index}`}
              loading="lazy"
              borderRadius="sm"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
              objectFit="cover"
              height="20.5rem"
              backgroundColor="gray.100"
            />
          </ListItem>
        ))}
      </UnorderedList>

      <UnorderedList
        display="flex"
        gap="1rem"
        flexWrap="wrap"
        listStyleType="none"
        mb="1rem"
      >
        {movie?.genres?.map((genre) => (
          <ListItem key={genre} tabIndex={0}>
            <Tag>{genre}</Tag>
          </ListItem>
        ))}
      </UnorderedList>

      {isLoggedIn && <FavoriteButton onClick={onClick} movie={movie!} />}
    </Box>
  );
}
