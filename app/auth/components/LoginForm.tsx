import { AuthenticationError, Link, useMutation, Routes } from 'blitz';

import { TextField, HookForm, FORM_ERROR } from '~core/components';
import { login } from '~auth/resolvers';
import { loginSchema } from '~auth/validations';
import authErrors from '../errors';

interface Props {
   onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: Props) => {
   const [loginMutation] = useMutation(login);

   return (
      <div>
         <h1>Login</h1>

         <HookForm
            submitText='Login'
            schema={loginSchema}
            initialValues={{ username: '', password: '' }}
            onSubmit={async values => {
               try {
                  await loginMutation(values);
                  onSuccess?.();
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
         </HookForm>

         <div style={{ marginTop: '1rem' }}>
            Or <Link href={Routes.SignupPage()}>Sign Up</Link>
         </div>
      </div>
   );
};

export default LoginForm;
