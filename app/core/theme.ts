import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
   config: { cssVarPrefix: null },
   direction: 'rtl',
   fonts: {
      body: 'Iran Yekan',
      heading: 'Iran Yekan',
   },
   styles: {
      global: {
         body: {},
      },
   },
});

export default theme;
