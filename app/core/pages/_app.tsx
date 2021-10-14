import { ChakraProvider } from '@chakra-ui/react';
import {
   AppProps,
   ErrorBoundary,
   ErrorComponent,
   AuthenticationError,
   AuthorizationError,
   ErrorFallbackProps,
   useQueryErrorResetBoundary,
   Head,
   useRouter,
} from 'blitz';

import authErrors from '~auth/errors';
import { Fonts } from '../components';
import theme from '../theme';

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
   const route = useRouter();

   if (error instanceof AuthenticationError) {
      route.push('/login');
      return null;
   } else if (error instanceof AuthorizationError) {
      return (
         <ErrorComponent
            statusCode={error.statusCode}
            title={authErrors.notAuthorized}
         />
      );
   } else {
      return (
         <ErrorComponent
            statusCode={error.statusCode || 400}
            title={error.message || error.name}
         />
      );
   }
}

const App = ({
   Component,
   pageProps,
}: AppProps & { Component: { title: string } }) => {
   const title = Component.title || 'نوا فرم';

   return (
      <ChakraProvider theme={theme}>
         <Head>
            <title>{title}</title>
         </Head>
         <Fonts />
         <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
         >
            <Component {...pageProps} />
         </ErrorBoundary>
      </ChakraProvider>
   );
};

export default App;
