import { Suspense } from 'react';
import { Link, Routes, useQuery } from 'blitz';
import {
   Alert,
   Badge,
   Center,
   Container,
   Divider,
   IconButton,
   LinkBox,
   LinkOverlay,
   Skeleton,
   Text,
} from '@chakra-ui/react';
import { useLocalStorage } from 'react-use';

import { Page } from '~core/types';
import { Card, Header } from '~/app/core/components';
import getForms from '../queries/getForms';
import { MdGridView, MdList } from 'react-icons/md';

const Forms = () => {
   const [view, viewSet] = useLocalStorage('view', 'grid');
   const [forms] = useQuery(
      getForms,
      { updatedAt: 'desc' },
      { cacheTime: 1000 }
   );

   return (
      <>
         <Center w='full'>
            <IconButton
               aria-label='مشاهده به صورت گرید'
               title='مشاهده به صورت گرید'
               icon={<MdGridView />}
               ml='2'
               onClick={() => viewSet('grid')}
            />
            <IconButton
               aria-label='مشاهده به صورت لیست'
               title='مشاهده به صورت لیست'
               icon={<MdList />}
               onClick={() => viewSet('list')}
            />
         </Center>
         <Divider mt='4' mb='8' />
         {forms.length === 0 ? (
            <Alert status='info' justifyContent='center'>
               شما هیچ فرمی ایجاد نکرده اید!
            </Alert>
         ) : (
            forms.map(({ id, title, description, createdAt }, i) => (
               <LinkBox
                  key={id}
                  role='group'
                  w={view === 'list' ? '100%' : 'calc(50% - .75rem)'}
                  mb='6'
                  ml={view === 'grid' && i % 2 === 0 ? '6' : '0'}
                  transition='.2s'
                  _hover={{
                     transform: 'translateY(calc(var(--space-2) * -1))',
                  }}
               >
                  <Card
                     transition='.2s'
                     _groupHover={{
                        bg: 'blue.600',
                        color: 'white',
                     }}
                     h='full'
                  >
                     <Link href={Routes.EditFormPage({ formId: id })} passHref>
                        <LinkOverlay>
                           <Text fontWeight='bold' fontSize='3xl' mb='6'>
                              {title + ' '}
                              {Date.now() - createdAt.getTime() < 300000 && (
                                 <Badge colorScheme='green'>جدید</Badge>
                              )}
                           </Text>
                        </LinkOverlay>
                     </Link>
                     <Text fontWeight='bold'>{description}</Text>
                  </Card>
               </LinkBox>
            ))
         )}
      </>
   );
};

const FormsSkeleton = Array.from({ length: 4 }).map((_, i) => (
   <Skeleton
      key={i}
      w='calc(50% - .75rem)'
      h='48'
      mb='6'
      ml={i % 2 === 0 ? '6' : '0'}
      rounded='2xl'
   />
));

const FormsPage: Page = () => {
   return (
      <>
         <Header />
         <Container d='flex' flexWrap='wrap'>
            <Suspense fallback={FormsSkeleton}>
               <Forms />
            </Suspense>
         </Container>
      </>
   );
};

FormsPage.authenticate = true;
FormsPage.suppressFirstRenderFlicker = true;
FormsPage.title = 'فرم ها';

export default FormsPage;
