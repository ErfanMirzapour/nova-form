import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Select,
} from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

import { useHookFormInput } from '~core/hooks';

export interface Props
   extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
   name: string;
   label: string;
}

const TextField = ({ label, name, required, children, ...props }: Props) => {
   const { register, error, isSubmitting } = useHookFormInput(name);
   const resisterProps = register(name);

   return (
      <FormControl
         isRequired={required}
         isInvalid={!!error}
         isDisabled={isSubmitting}
      >
         <FormLabel>{label}</FormLabel>

         <Select {...resisterProps} {...props}>
            {children}
         </Select>
         <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
   );
};

export default TextField;
