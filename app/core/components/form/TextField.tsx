import { PropsWithoutRef } from 'react';

import { useHookFormInput } from '~core/hooks';

export interface Props extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
   name: string;
   label: string;
   type?: 'text' | 'password' | 'email' | 'url' | 'number';
   outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>;
}

const TextField = ({ label, outerProps, name, ...props }: Props) => {
   const { register, error, isSubmitting } = useHookFormInput(name);

   return (
      <div {...outerProps}>
         <label>
            {label}
            <input disabled={isSubmitting} {...register(name)} {...props} />
         </label>

         {error && (
            <div role='alert' style={{ color: 'red' }}>
               {error}
            </div>
         )}
      </div>
   );
};

export default TextField;
