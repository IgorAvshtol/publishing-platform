import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import '../styles/animation.css';
import { store } from 'store/store';
import { Layout } from '../components/Layout';

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black',
      }
    }
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none'
        }
      }
    },
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Provider>
  );
}

export default MyApp;
