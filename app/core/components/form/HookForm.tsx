import { useState, PropsWithChildren } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   Button,
   FormControl,
   FormErrorMessage,
   VStack,
} from '@chakra-ui/react';

export interface Props<Schema extends z.ZodType<any, any>> {
   submitText?: string;
   submitScheme?: string;
   schema?: Schema;
   onSubmit: (values: z.infer<Schema>) => Promise<void | OnSubmitResult> | void;
   initialValues?: UseFormProps<z.infer<Schema>>['defaultValues'];
   resetAfterSubmit?: boolean;
}

interface OnSubmitResult {
   FORM_ERROR?: string;
   [prop: string]: any;
}

export const FORM_ERROR = 'FORM_ERROR';

const HookForm = <Schema extends z.ZodType<any, any>>({
   children,
   submitText,
   schema,
   initialValues,
   onSubmit,
   resetAfterSubmit,
   submitScheme,
   ...props
}: PropsWithChildren<Props<Schema>>) => {
   const ctx = useForm<z.infer<Schema>>({
      mode: 'onTouched',
      resolver: schema ? zodResolver(schema) : undefined,
      defaultValues: initialValues,
   });
   const [formError, setFormError] = useState<string | null>(null);

   const handleSubmit = async values => {
      const result = (await onSubmit(values)) || {};

      for (const [key, value] of Object.entries(result)) {
         if (key === FORM_ERROR) {
            setFormError(value);
         } else {
            ctx.setError(key as any, {
               type: 'submit',
               message: value,
            });
         }
      }
      if (resetAfterSubmit) ctx.reset();
   };

   return (
      <FormProvider {...ctx}>
         <VStack
            as='form'
            onSubmit={ctx.handleSubmit(handleSubmit)}
            spacing='5'
            w='full'
            {...props}
         >
            {formError && (
               <FormControl isInvalid>
                  <FormErrorMessage>{formError}</FormErrorMessage>
               </FormControl>
            )}

            {children}

            <Button
               type='submit'
               disabled={ctx.formState.isSubmitting}
               w='full'
               colorScheme={submitScheme || 'blue'}
            >
               {submitText || 'ثبت'}
            </Button>
         </VStack>
      </FormProvider>
   );
};

export default HookForm;
