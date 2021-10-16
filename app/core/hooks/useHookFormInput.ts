import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

const useHookFormInput = (name: string) => {
   const {
      register,
      formState: { isSubmitting, errors },
   } = useFormContext();

   const error: string | undefined = useMemo(
      () =>
         Array.isArray(errors[name])
            ? errors[name].join(', ')
            : errors[name]?.message || errors[name],
      [errors[name]] // eslint-disable-line react-hooks/exhaustive-deps
   );

   return { error, register, isSubmitting };
};

export default useHookFormInput;
