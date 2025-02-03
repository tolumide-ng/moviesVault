import * as React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

type Props = {
  label: string;
  value: React.ReactNode;
  classes?: {
    wrapper?: string;
    label?: string;
    value?: string;
  };
};

export function KeyValue({ label, value, classes }: Readonly<Props>) {
  return (
    <Flex gap={4} className={classes?.wrapper} sx={{ alignItems: 'center' }}>
      <Text fontWeight="bold" position="relative" className={classes?.label}>
        {label}
      </Text>
      <Box className={classes?.value}>{value}</Box>
    </Flex>
  );
}
