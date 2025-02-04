import { dateFormatter } from '@/utils/dateFormatter';
import {
  Tag,
  Text,
  Box,
  UnorderedList,
  ListItem,
  Flex,
} from '@chakra-ui/react';

type Props = {
  releaseDate?: string;
  usCertificates?: Array<string>;
};

export function MovieDetail({ releaseDate, usCertificates }: Readonly<Props>) {
  return (
    <Box as="section" mt="0.25rem" aria-labelledby="movie-details">
      <Flex mb="2" gap={'2'}>
        <Text fontWeight="semibold" color="gray.700" id="release-date">
          Release Date:
        </Text>
        <Text>{dateFormatter(releaseDate)}</Text>
      </Flex>

      {usCertificates && usCertificates.length > 0 && (
        <Flex mb="4" gap={'2'} alignItems={'center'}>
          <Text fontWeight="semibold" color="gray.700">
            US Certificates:
          </Text>
          <UnorderedList
            display="flex"
            flexWrap="wrap"
            gap="4"
            aria-labelledby="us-certificates"
            listStyleType="none"
          >
            {usCertificates.map((certificate) => (
              <ListItem key={certificate}>
                <Tag colorScheme="purple" variant="solid" size="md">
                  {certificate}
                </Tag>
              </ListItem>
            ))}
          </UnorderedList>
        </Flex>
      )}
    </Box>
  );
}
