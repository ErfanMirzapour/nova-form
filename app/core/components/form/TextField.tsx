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

type types = 'text' | 'password' | 'email' | 'url' | 'number';
export interface Props extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
   name: string;
   label: string;
   type?: types | Uppercase<types>;
}

const TextField = ({
   label,
   name,
   required,
   placeholder = label,
   ...props
}: Props) => {
   const { register, error, isSubmitting } = useHookFormInput(name);
   const resisterProps = register(name);
   let inputType = props.type?.toLowerCase();

   return (
      <FormControl
         isRequired={required}
         isInvalid={!!error}
         isDisabled={isSubmitting}
      >
         <FormLabel>{label}</FormLabel>
         {inputType === 'number' ? (
            <NumberInput>
               <NumberInputField
                  {...resisterProps}
                  placeholder={placeholder}
                  {...props}
               />
               <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
               </NumberInputStepper>
            </NumberInput>
         ) : (
            <Input {...resisterProps} placeholder={placeholder} {...props} />
         )}
         <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
   );
};

export default TextField;
