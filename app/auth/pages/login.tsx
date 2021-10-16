import { useRouter, AuthenticationError, useMutation, Routes } from 'blitz';
import { z } from 'zod';
import { Center, Divider, Heading, VStack } from '@chakra-ui/react';
import { SubmitHandler } from 'react-hook-form';

import { Page } from '~core/types';
import {
   TextField,
   HookForm,
   FORM_ERROR,
   ButtonLink,
   Card,
} from '~core/components';
import { loginMutation } from '~auth/resolvers';
import { loginSchema } from '~auth/validations';
import authErrors from '~auth/errors';
import { title as signupTitle } from './signup';

export const title = 'ورود به حساب کاربری';
const initialValues = { username: '', password: '' };

const LoginPage: Page = () => {
   const router = useRouter();
   const [login] = useMutation(loginMutation);

   const handleLogin: SubmitHandler<z.infer<typeof loginSchema>> =
      async values => {
         try {
            await login(values);
            router.push(Routes.FormsPage());
         } catch (error) {
            if (error instanceof AuthenticationError) {
               return {
                  [FORM_ERROR]: authErrors.invalidCredentials,
               };
            } else {
               return {
                  [FORM_ERROR]: error.toString(),
               };
            }
         }
      };

   return (
      <Center h='100vh'>
         <Card as={VStack} spacing='6' w='96'>
            <Heading as='h1'>{title}</Heading>

            <HookForm
               submitText='ورود'
               schema={loginSchema}
               initialValues={initialValues}
               onSubmit={handleLogin}
            >
               <TextField
                  required
                  name='username'
                  autoComplete='username'
                  label='نام کاربری'
                  placeholder='نام کاربری'
               />
               <TextField
                  required
                  type='password'
                  name='password'
                  autoComplete='current-password'
                  label='رمز عبور'
                  placeholder='رمز عبور'
               />
            </HookForm>

            <Divider />

            <ButtonLink
               href={Routes.SignupPage()}
               colorScheme='orange'
               w='full'
            >
               {signupTitle}
            </ButtonLink>
         </Card>
      </Center>
   );
};

LoginPage.title = title;
LoginPage.redirectAuthenticatedTo = Routes.FormsPage();

export default LoginPage;
