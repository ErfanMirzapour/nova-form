import { forwardRef, Suspense, useRef, useState } from 'react';
import {
   Head,
   invalidateQuery,
   Routes,
   useMutation,
   useQuery,
   useRouter,
} from 'blitz';
import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Button,
   Container,
   Icon,
   Skeleton,
   useToast,
} from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';
import { MdDeleteForever } from 'react-icons/md';

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
import updateFormMutation from '../../mutations/updateForm';
import deleteFormMutation from '../../mutations/deleteForm';
import { AddField, Fields } from '../../components';
import getForm from '../../queries/getForm';

interface EditForm {
   id: string;
}

const EditForm = forwardRef(({ id }: EditForm, ref) => {
   const router = useRouter();
   const toast = useToast();
   const [{ title, description = '', inputs }] = useQuery(getForm, id);
   const [updateForm] = useMutation(updateFormMutation, {
      onSuccess: () => invalidateQuery(getForm),
   });

   const handleUpdateForm: SubmitHandler<FormSchema> = async values => {
      if (values.inputs.length === 0)
         return {
            [FORM_ERROR]: 'حداقل باید یک فرم ایجاد کنید.',
         };

      try {
         await updateForm({ id, ...values });

         toast({
            title: 'فرم با موفقیت به روز رسانی شد.',
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
         <Head>
            <title>ویرایش فرم {title} | نوا فرم</title>
         </Head>

         <HookForm
            submitText='ویرایش فرم'
            schema={formSchema}
            initialValues={{ title, description, inputs }}
            onSubmit={handleUpdateForm}
         >
            <TextField required name='title' label='عنوان' />
            <TextArea name='description' label='توضیحات' />

            <Fields ref={ref} />
         </HookForm>
      </>
   );
});

const FormsSkeleton = (
   <>
      <Skeleton h='80' mb='6' rounded='2xl' />
      <Skeleton h='32' rounded='2xl' />
   </>
);

const EditFormPage: Page = () => {
   const fieldsRef = useRef<any>();
   const router = useRouter();
   const id = router.params.formId;
   const toast = useToast();
   const [deleteForm] = useMutation(deleteFormMutation);

   const [isOpen, setIsOpen] = useState(false);
   const cancelRef = useRef(null);

   const onModalClose = () => setIsOpen(false);

   const confirmDeleteForm = async () => {
      await deleteForm(id);

      onModalClose();
      toast({
         title: 'فرم حذف شد.',
         status: 'error',
         duration: 6000,
         isClosable: true,
      });
      router.push(Routes.FormsPage());
   };

   return (
      <>
         <Header />

         <Container>
            <Card mb='8'>
               <Suspense fallback={FormsSkeleton}>
                  <EditForm ref={fieldsRef} id={id} />
               </Suspense>
            </Card>
            <Card mb='8' w='full'>
               <AddField
                  addField={field => fieldsRef.current.addField(field)}
               />
            </Card>
            <Card mb='8' w='full'>
               <Button
                  colorScheme='red'
                  rightIcon={<Icon as={MdDeleteForever} />}
                  w='full'
                  onClick={() => setIsOpen(true)}
               >
                  حذف فرم
               </Button>
            </Card>
         </Container>

         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onModalClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                     حذف فرم
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     آیا از حذف این فرم اطمینان دارید؟
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button ref={cancelRef} onClick={onModalClose} ml='2'>
                        لغو
                     </Button>
                     <Button colorScheme='red' onClick={confirmDeleteForm}>
                        حذف
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   );
};

EditFormPage.authenticate = true;
EditFormPage.suppressFirstRenderFlicker = true;
EditFormPage.title = 'ویرایش فرم';

export default EditFormPage;
