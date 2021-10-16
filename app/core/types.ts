import { BlitzPage } from 'blitz';
import { ChakraProps } from '@chakra-ui/react';

export type Page = BlitzPage & {
   title: string;
};

export type WithSx<Props = {}> = Props & {
   sx?: ChakraProps['sx'];
};
