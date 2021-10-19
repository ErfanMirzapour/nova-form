import { Box, Button, Container } from '@chakra-ui/react';
import { Routes, useMutation, useRouter } from 'blitz';

import { logoutMutation } from '~/app/auth/resolvers';
import ButtonLink from './ButtonLink';

const Header = () => {
   const router = useRouter();
   const [logout] = useMutation(logoutMutation);

   const handleLogout = async () => {
      await logout();
      router.push(Routes.LoginPage());
   };

   return (
      <Box tag='header' shadow='md' mb='8'>
         <Container
            h='16'
            d='flex'
            justifyContent='space-between'
            alignItems='center'
         >
            <ButtonLink href='#'>ایجاد فرم</ButtonLink>
            <Button onClick={handleLogout}>خروج</Button>
         </Container>
      </Box>
   );
};

export default Header;
