import * as React from 'react';
import { Spinner, Box, Center, Text } from '@chakra-ui/react';

export const Loader: React.FC = () => {
  return (
    <Center height="100vh">
      <Box textAlign="center">
        <Spinner size="xl" color="teal.500" />
        <Text mt="4" fontSize="lg" color="teal.500">
          Loading...
        </Text>
      </Box>
    </Center>
  );
};
