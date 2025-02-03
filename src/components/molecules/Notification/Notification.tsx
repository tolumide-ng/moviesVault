import * as React from 'react';
import { Box, Text, Icon, VStack } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';

type Props = {
  title?: string;
  message: string;
};

export function Notification({ title, message }: Readonly<Props>) {
  return (
    <Box
      bg="red.50"
      border="1px"
      borderColor="red.300"
      borderRadius="md"
      p="6"
      maxWidth="md"
      mx="auto"
      mt="10"
      boxShadow="lg"
    >
      <VStack spacing={4} align="center">
        <Icon as={FiAlertTriangle} color="red.500" boxSize={12} />
        <Text fontSize="xl" fontWeight="bold" color="red.600">
          {title ?? 'Error'}
        </Text>
        <Text fontSize="md" color="gray.600" textAlign="center">
          {message}
        </Text>
      </VStack>
    </Box>
  );
}
