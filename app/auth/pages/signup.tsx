import { useRouter, Routes, useMutation } from 'blitz';

import { Page } from '~core/types';
import { TextField, HookForm, FORM_ERROR } from '~core/components';
import { signup } from '~auth/resolvers';
import { signupSchema } from '~auth/validations';
import errors from '~auth/errors';

const title = 'ساخت حساب کاربری';

const SignupPage: Page = () => {
   const router = useRouter();
   const [signupMutation] = useMutation(signup);

   return (
      <div>
         <h1>Create an Account</h1>

         <HookForm
            submitText={title}
            schema={signupSchema}
            initialValues={{ username: '', password: '', passwordConfirm: '' }}
            onSubmit={async ({ passwordConfirm, ...values }) => {
               if (values.password !== passwordConfirm)
                  return {
                     passwordConfirm: errors.invalidPasswordConfirmation,
                  };

               try {
                  await signupMutation(values);
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
            }}
         >
            <TextField
               name='username'
               label='نام کاربری'
               placeholder='نام کاربری'
            />
            <TextField
               name='password'
               label='Password'
               placeholder='Password'
               type='password'
            />
            <TextField
               name='passwordConfirm'
               label='تکرار رمز عبور'
               placeholder='تکرار رمز عبور'
               type='password'
            />
         </HookForm>
      </div>
   );
};

SignupPage.redirectAuthenticatedTo = Routes.FormsPage();
SignupPage.title = title;

export default SignupPage;
