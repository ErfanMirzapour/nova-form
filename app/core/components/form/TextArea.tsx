import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Textarea,
} from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

import { useHookFormInput } from '~core/hooks';

export interface Props extends ComponentPropsWithoutRef<'textarea'> {
   name: string;
   label: string;
}

const TextArea = ({
   label,
   name,
   required,
   placeholder = label,
   ...props
}: Props) => {
   const { register, error, isSubmitting } = useHookFormInput(name);
   const resisterProps = register(name);

   return (
      <FormControl
         isRequired={required}
         isInvalid={!!error}
         isDisabled={isSubmitting}
      >
         <FormLabel>{label}</FormLabel>
         <Textarea {...resisterProps} placeholder={placeholder} {...props} />
         <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
   );
};

export default TextArea;
