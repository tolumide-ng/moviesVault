import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './utils/theme';
import './index.css';
import AppRouter from './AppRouter';
import { ContextProvider } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ContextProvider>
        <AppRouter />
      </ContextProvider>
    </ChakraProvider>
  </StrictMode>,
);
