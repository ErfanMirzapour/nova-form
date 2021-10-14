import {
   useRouter,
   AuthenticationError,
   Link,
   useMutation,
   Routes,
} from 'blitz';

import { Page } from '~core/types';
import { TextField, HookForm, FORM_ERROR } from '~core/components';
import { login } from '~auth/resolvers';
import { loginSchema } from '~auth/validations';
import authErrors from '~auth/errors';

const title = 'ورود حساب کاربری';

const LoginPage: Page = () => {
   const router = useRouter();
   const [loginMutation] = useMutation(login);

   return (
      <div>
         <h1>Login</h1>

         <HookForm
            submitText={title}
            schema={loginSchema}
            initialValues={{ username: '', password: '' }}
            onSubmit={async values => {
               try {
                  await loginMutation(values);
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

LoginPage.redirectAuthenticatedTo = Routes.FormsPage();
LoginPage.title = title;

export default LoginPage;
