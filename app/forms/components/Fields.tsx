import { forwardRef, useImperativeHandle } from 'react';
import { Box, CloseButton, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';

import { Card, TextArea, TextField } from '~core/components';
import { FormSchema } from '../validations';

const Fields = forwardRef((_, ref) => {
   const { control } = useFormContext<FormSchema>();
   const { fields, append, remove } = useFieldArray({
      control,
      name: 'inputs',
      key: 'label',
   });

   useImperativeHandle(ref, () => ({
      addField: field => append(field),
   }));

   if (fields.length === 0) return null;

   return (
      <Card mb='8' boxShadow='none' w='full'>
         <Box as='fieldset' w='full' fontWeight='bold' fontSize='xl'>
            <Box as='legend' d='inline-flex' alignItems='center' mb='2'>
               <Text as='span' ml='2' mb='2'>
                  فیلد ها
               </Text>
            </Box>

            <VStack spacing='4' alignItems='stretch'>
               {fields.map(({ id, ...input }, i) => (
                  <Flex key={i}>
                     <CloseButton size='sm' ml='2' onClick={() => remove(i)} />
                     {input.type === 'TEXTAREA' ? (
                        <TextArea name={input.label} readOnly {...input} />
                     ) : (
                        <TextField name={input.label} readOnly {...input} />
                     )}
                  </Flex>
               ))}
            </VStack>
         </Box>
      </Card>
   );
});

export default Fields;
