import { Suspense } from 'react';
import { useQuery } from 'blitz';
import { Container, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';

import { Page } from '~core/types';
import { Card, Header } from '~/app/core/components';
import getForms from '../queries/getForms';

const Forms = () => {
   const [forms] = useQuery(getForms, undefined);

   return (
      <>
         <Header />

         <Container
            d='flex'
            flexWrap='wrap'
            sx={{
               '& > *:nth-child(odd)': {
                  ml: '6',
               },
            }}
         >
            {forms.map(({ id, title, description }) => (
               <LinkBox
                  key={id}
                  role='group'
                  w='calc(50% - .75rem)'
                  mb='6'
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
                  >
                     <LinkOverlay href='#'>
                        <Text fontWeight='bold' fontSize='3xl' mb='6'>
                           {title}
                        </Text>
                     </LinkOverlay>
                     <Text fontWeight='bold'>{description}</Text>
                  </Card>
               </LinkBox>
            ))}
         </Container>
      </>
   );
};

const FormsPage: Page = () => {
   return (
      <Suspense fallback='Loading...'>
         <Forms />
      </Suspense>
   );
};

FormsPage.authenticate = true;
FormsPage.suppressFirstRenderFlicker = true;
FormsPage.title = 'فرم ها';

export default FormsPage;
