import { useRouter, Routes, useMutation } from 'blitz';
import { Center, Divider, Heading, VStack } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Page } from '~core/types';
import {
   TextField,
   HookForm,
   FORM_ERROR,
   ButtonLink,
   Card,
} from '~core/components';
import { signupMutation } from '~auth/resolvers';
import { signupSchema } from '~auth/validations';
import errors from '~auth/errors';
import { title as loginTitle } from './login';

export const title = 'ساخت حساب کاربری';
const initialValues = { username: '', password: '', passwordConfirm: '' };

const SignupPage: Page = () => {
   const router = useRouter();
   const [signup] = useMutation(signupMutation);

   const handleSignup: SubmitHandler<z.infer<typeof signupSchema>> = async ({
      passwordConfirm,
      ...values
   }) => {
      if (values.password !== passwordConfirm)
         return {
            passwordConfirm: errors.invalidPasswordConfirmation,
         };

      try {
         await signup(values);
         router.push(Routes.FormsPage());
      } catch (error) {
         if (
            error.code === 'P2002' &&
            error.meta?.target?.includes('username')
         ) {
            // This error comes from Prisma
            return { username: errors.duplicateUsername };
         } else {
            return { [FORM_ERROR]: error.toString() };
         }
      }
   };

   return (
      <Center h='100vh'>
         <Card as={VStack} spacing='6' w='96'>
            <Heading as='h1'>{title}</Heading>

            <HookForm
               submitText='ایجاد'
               schema={signupSchema}
               initialValues={initialValues}
               onSubmit={handleSignup}
            >
               <TextField
                  required
                  name='username'
                  label='نام کاربری'
                  placeholder='نام کاربری'
                  autoComplete='username'
               />
               <TextField
                  required
                  type='password'
                  name='password'
                  autoComplete='new-password'
                  label='رمز عبور'
                  placeholder='رمز عبور'
               />
               <TextField
                  required
                  type='password'
                  name='passwordConfirm'
                  autoComplete='new-password'
                  label='تکرار رمز عبور'
                  placeholder='تکرار رمز عبور'
               />
            </HookForm>

            <Divider />

            <ButtonLink href={Routes.LoginPage()} colorScheme='orange' w='full'>
               {loginTitle}
            </ButtonLink>
         </Card>
      </Center>
   );
};

SignupPage.redirectAuthenticatedTo = Routes.FormsPage();
SignupPage.title = title;

export default SignupPage;
