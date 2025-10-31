import * as React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      minH="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" fontSize={{ base: '4xl', md: '6xl' }} color="teal.500">
          404
        </Heading>

        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" maxW="sm">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </Text>

        <Button as={RouterLink} to="/" colorScheme="teal" size="sm">
          Go Home
        </Button>
      </VStack>
    </Box>
  );
}
