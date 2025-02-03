import * as React from 'react';
import { FavoriteMovie } from '@/types/manual/movies';
import { Button, Text, Icon } from '@chakra-ui/react';
import { AiOutlineHeart, AiOutlineDelete } from 'react-icons/ai';

type Props = {
  onClick: (_movie: FavoriteMovie) => void;
  movie: FavoriteMovie;
};

export function FavoriteButton({ onClick, movie }: Readonly<Props>) {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClick(movie);
    },
    [onClick, movie],
  );

  return (
    <Button
      onClick={handleClick}
      variant={movie.favorite ? 'solid' : 'outline'}
      width="52"
      alignSelf="flex-end"
      mt={2}
      leftIcon={
        movie.favorite ? (
          <Icon as={AiOutlineDelete} boxSize={5} />
        ) : (
          <Icon as={AiOutlineHeart} boxSize={5} />
        )
      }
      aria-label={movie.favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Text as="span" display="flex" alignItems="center" gap={1}>
        {movie.favorite ? 'Remove Favorite' : 'Add Favorite'}
      </Text>
    </Button>
  );
}
