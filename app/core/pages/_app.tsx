import { ChakraProvider } from '@chakra-ui/react';
import {
   AppProps,
   ErrorBoundary,
   ErrorComponent,
   AuthenticationError,
   AuthorizationError,
   ErrorFallbackProps,
   useQueryErrorResetBoundary,
} from 'blitz';

import { LoginForm } from '~auth/components';

import theme from '../theme';

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
   if (error instanceof AuthenticationError) {
      return <LoginForm onSuccess={resetErrorBoundary} />;
   } else if (error instanceof AuthorizationError) {
      return (
         <ErrorComponent
            statusCode={error.statusCode}
            title='Sorry, you are not authorized to access this'
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

const App = ({ Component, pageProps }: AppProps) => {
   const getLayout = Component.getLayout || (page => page);

   return (
      <ChakraProvider theme={theme}>
         <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
         >
            {getLayout(<Component {...pageProps} />)}
         </ErrorBoundary>
      </ChakraProvider>
   );
};

export default App;
