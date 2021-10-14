import { useState, ReactNode, PropsWithoutRef } from 'react';
import { FormProvider, useForm, UseFormProps } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface Props<Schema extends z.ZodType<any, any>>
   extends PropsWithoutRef<JSX.IntrinsicElements['form']> {
   children?: ReactNode;
   submitText?: string;
   schema?: Schema;
   onSubmit: (values: z.infer<Schema>) => Promise<void | OnSubmitResult>;
   initialValues?: UseFormProps<z.infer<Schema>>['defaultValues'];
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
   ...props
}: Props<Schema>) => {
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
   };

   return (
      <FormProvider {...ctx}>
         <form onSubmit={ctx.handleSubmit(handleSubmit)} {...props}>
            {children}

            {formError && (
               <div role='alert' style={{ color: 'red' }}>
                  {formError}
               </div>
            )}

            <button type='submit' disabled={ctx.formState.isSubmitting}>
               {submitText || 'ثبت'}
            </button>
         </form>
      </FormProvider>
   );
};

export default HookForm;
