import { useRef } from 'react';
import { Routes, useMutation, useRouter } from 'blitz';
import {
   Box,
   Container,
   Icon,
   IconButton,
   Text,
   useToast,
} from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { MdAdd } from 'react-icons/md';

import { Page } from '~core/types';
import {
   Card,
   FORM_ERROR,
   Header,
   HookForm,
   Select,
   TextArea,
   TextField,
} from '~/app/core/components';
import {
   formInputSchema,
   formSchema,
   FormSchema,
   FormInputSchema,
} from '../../validations';
import createFormMutation from '../../mutations/createForm';
import { AddField, Fields } from '../../components';

const createFormInitialValues: FormSchema = {
   title: '',
   description: '',
   inputs: [],
};

const AddFormPage: Page = () => {
   const router = useRouter();
   const toast = useToast();
   const [createForm] = useMutation(createFormMutation);
   const fieldsRef = useRef<any>();

   const handleCreateForm: SubmitHandler<FormSchema> = async values => {
      try {
         await createForm(values);

         toast({
            title: 'فرم شما با موفقیت ایجاد شد.',
            status: 'success',
            duration: 4000,
            isClosable: true,
         });
         router.push(Routes.FormsPage());
      } catch (error) {
         return {
            [FORM_ERROR]: error.toString(),
         };
      }
   };

   return (
      <>
         <Header />

         <Container>
            <Card mb='8'>
               <Card mb='8' boxShadow='none' w='full'>
                  <AddField
                     addField={field => fieldsRef.current.addField(field)}
                  />
               </Card>

               <HookForm
                  submitText='ایجاد فرم'
                  schema={formSchema}
                  initialValues={createFormInitialValues}
                  onSubmit={handleCreateForm}
               >
                  <Fields ref={fieldsRef} />

                  <TextField required name='title' label='عنوان' />
                  <TextArea name='description' label='توضیحات' />
               </HookForm>
            </Card>
         </Container>
      </>
   );
};

AddFormPage.authenticate = true;
AddFormPage.suppressFirstRenderFlicker = true;
AddFormPage.title = 'فرم ها';

export default AddFormPage;
