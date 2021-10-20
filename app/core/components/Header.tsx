import { Box, Button, Container, Icon } from '@chakra-ui/react';
import { MdExitToApp, MdPlaylistAdd, MdList } from 'react-icons/md';
import { Routes, useMutation, useRouter } from 'blitz';

import { logoutMutation } from '~/app/auth/resolvers';
import ButtonLink from './ButtonLink';

const MdExitToAppRtl = () => (
   <Box transform='rotateZ(180deg)'>
      <MdExitToApp />
   </Box>
);

const Header = () => {
   const { pathname, push: routerPush } = useRouter();
   const [logout] = useMutation(logoutMutation);

   const handleLogout = async () => {
      await logout();
      routerPush(Routes.LoginPage());
   };

   return (
      <Box tag='header' shadow='md' mb='8'>
         <Container
            h='16'
            d='flex'
            justifyContent='space-between'
            alignItems='center'
         >
            {!pathname.match(/forms\/?$/) && (
               <ButtonLink
                  href={Routes.FormsPage()}
                  rightIcon={<Icon as={MdList} />}
               >
                  لیست فرم ها
               </ButtonLink>
            )}
            {!pathname.includes('add') && (
               <ButtonLink
                  href={Routes.AddFormPage()}
                  rightIcon={<Icon as={MdPlaylistAdd} />}
               >
                  ایجاد فرم
               </ButtonLink>
            )}
            <Button
               colorScheme='red'
               rightIcon={<Icon as={MdExitToAppRtl} />}
               onClick={handleLogout}
            >
               خروج
            </Button>
         </Container>
      </Box>
   );
};

export default Header;
