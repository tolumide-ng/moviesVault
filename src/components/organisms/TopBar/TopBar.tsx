import * as React from 'react';
import { Link, useLocation } from 'react-router';
import { AuthorizationContext } from '@/store/authorization/context';
import {
  Button,
  Flex,
  Text,
  UnorderedList,
  ListItem,
  Link as ChakraLink,
} from '@chakra-ui/react';

export function TopBar() {
  const { state, onLogout } = React.useContext(AuthorizationContext);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isActive = location.pathname === '/favorites';

  return (
    <Flex
      as="header"
      px="4"
      mb="8"
      pt={'4'}
      borderBottom="1px solid"
      justifyContent="space-between"
      alignItems="center"
      bg={'white'}
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow="md"
    >
      <Link to="/">
        <Flex align="center" cursor="pointer">
          <Text fontWeight="bold" mr="2">
            🎥
          </Text>
          <Text fontSize={'xl'} fontWeight="bold">
            Movies Vault
          </Text>
        </Flex>
      </Link>

      <Flex as="nav" justify="flex-end" alignItems={'center'}>
        <UnorderedList display="flex" gap="6" listStyleType="none">
          {state.isLoggedIn && (
            <ListItem>
              <ChakraLink
                to="/favorites"
                as={Link}
                color={isActive ? 'blue.500' : 'gray.700'}
              >
                Favorites
              </ChakraLink>
            </ListItem>
          )}

          {state.isLoggedIn && (
            <ListItem>
              <Button variant="link" onClick={onLogout} fontWeight={'normal'}>
                Log Out
              </Button>
            </ListItem>
          )}

          {!state.isLoggedIn && !isLoginPage && (
            <ListItem>
              <ChakraLink as={Link} to="login" mr={4} w={'100%'}>
                Login
              </ChakraLink>
            </ListItem>
          )}
        </UnorderedList>
      </Flex>
    </Flex>
  );
}
