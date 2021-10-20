import { useRef } from 'react';
import { Routes, useMutation, useRouter } from 'blitz';
import { Container, useToast } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';

import { Page } from '~core/types';
import {
   Card,
   FORM_ERROR,
   Header,
   HookForm,
   TextArea,
   TextField,
} from '~/app/core/components';
import { formSchema, FormSchema } from '../../validations';
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
      if (values.inputs.length === 0)
         return {
            [FORM_ERROR]: 'حداقل باید یک فرم ایجاد کنید.',
         };

      try {
         await createForm(values);

         toast({
            title: 'فرم شما با موفقیت ایجاد شد.',
            status: 'success',
            duration: 6000,
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
AddFormPage.title = 'ایجاد فرم';

export default AddFormPage;
