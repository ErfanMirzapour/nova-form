import {
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   NumberDecrementStepper,
   NumberIncrementStepper,
   NumberInput,
   NumberInputField,
   NumberInputStepper,
} from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

import { useHookFormInput } from '~core/hooks';

export interface Props extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
   name: string;
   label: string;
   type?: 'text' | 'password' | 'email' | 'url' | 'number';
}

const TextField = ({ label, name, required, ...props }: Props) => {
   const { register, error, isSubmitting } = useHookFormInput(name);
   const resisterProps = register(name);

   return (
      <FormControl
         isRequired={required}
         isInvalid={!!error}
         isDisabled={isSubmitting}
      >
         <FormLabel>{label}</FormLabel>
         {props.type === 'number' ? (
            <NumberInput>
               <NumberInputField {...resisterProps} {...props} />
               <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
               </NumberInputStepper>
            </NumberInput>
         ) : (
            <Input {...resisterProps} {...props} />
         )}
         <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
   );
};

export default TextField;
