import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './utils/theme';
import './index.css';
import AppRouter from './AppRouter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <AppRouter />
    </ChakraProvider>
  </StrictMode>,
);
