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
         a: {
            cursor: 'pointer',
         },
      },
   },
   components: {
      Divider: {
         baseStyle: {
            borderColor: 'gray.500',
         },
      },
      Heading: {
         defaultProps: {
            size: 'lg',
         },
      },
      Container: {
         baseStyle: {
            maxW: 'container.md',
         },
      },
   },
});

export default theme;
