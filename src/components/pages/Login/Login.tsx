import * as React from 'react';
import { AuthorizationContext } from '@/store/authorization/context';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();
  const {
    onLogin,
    state: { isLoggedIn },
  } = React.useContext(AuthorizationContext);

  const [state, setState] = React.useState({ username: '', password: '' });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin().then(() => navigate('/'));
  }

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  }

  return (
    <Flex w={'100%'} flexDir={'column'} as={'article'}>
      <Text
        as={'h2'}
        alignSelf={'center'}
        fontSize={'32'}
        mb={'6'}
        fontWeight={'bold'}
      >
        Login
      </Text>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4} width={'20rem'} mx="auto">
          <FormControl id="username" isRequired mb={'2'}>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              onChange={onChange}
              value={state.username}
              type="text"
              placeholder="Enter your username"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              onChange={onChange}
              value={state.password}
              type="password"
              placeholder="Enter your password"
            />
          </FormControl>

          <Button type="submit" size="lg" mt={'6'}>
            Submit
          </Button>
        </Stack>
      </form>
    </Flex>
  );
}
