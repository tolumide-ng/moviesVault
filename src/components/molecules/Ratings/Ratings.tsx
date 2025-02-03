import * as React from 'react';
import { HStack, Text, Icon } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

type Props = { rating: number };

export function Ratings({ rating }: Readonly<Props>) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <HStack
      spacing={2}
      align="center"
      aria-label={`Rating: ${rating.toFixed(2)}`}
    >
      <Text fontWeight="bold" color="gray.800">
        {rating.toFixed(2)}
      </Text>

      {Array.from({ length: fullStars }, (_, index) => (
        <Icon
          data-testid="full-star"
          key={`full-${index}`}
          as={FaStar}
          color="yellow.400"
        />
      ))}

      {hasHalfStar && (
        <Icon as={FaStarHalfAlt} color="yellow.400" data-testid="half-star" />
      )}

      {Array.from({ length: emptyStars }, (_, index) => (
        <Icon
          key={`empty-${index}`}
          as={FaRegStar}
          color="gray.300"
          data-testid="empty-star"
        />
      ))}
    </HStack>
  );
}
