import { PropsWithChildren } from 'react';
import { StackProps, Box } from '@chakra-ui/react';

const Card = ({ children, ...props }: PropsWithChildren<StackProps>) => {
   return (
      <Box p='8' rounded='2xl' boxShadow='xl' borderWidth='2px' {...props}>
         {children}
      </Box>
   );
};

export default Card;
