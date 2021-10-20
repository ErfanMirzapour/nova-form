import { forwardRef, useImperativeHandle } from 'react';
import {
   Box,
   CloseButton,
   Divider,
   Flex,
   Icon,
   Text,
   VStack,
} from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MdAdd } from 'react-icons/md';

import { Card, FORM_ERROR, TextArea, TextField } from '~core/components';
import { FormInputSchema, FormSchema } from '../validations';

const Fields = forwardRef((_, ref) => {
   const { control } = useFormContext<FormSchema>();
   const { fields, append, remove } = useFieldArray<FormSchema['inputs']>({
      control,
      name: 'inputs',
      key: 'label',
   });

   useImperativeHandle(ref, () => ({
      addField: (field: FormInputSchema) => {
         if (fields.find(f => f.label === field.label))
            return {
               [FORM_ERROR]: 'فیلد تکراری',
            };
         append(field);
      },
   }));

   if (fields.length === 0) return null;

   return (
      <Card mb='8' boxShadow='none' w='full' p='4'>
         <Box as='fieldset' w='full' fontWeight='bold' fontSize='xl'>
            <Text as='legend' ml='2' mb='2'>
               فیلد ها
            </Text>

            <Divider mb='4' />

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
