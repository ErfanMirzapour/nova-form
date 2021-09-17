import { useMutation } from 'blitz';

import { LabeledTextField, Form, FORM_ERROR } from '~core/components';
import { signup } from '~auth/resolvers';
import { Signup } from '~auth/validations';

type SignupFormProps = {
   onSuccess?: () => void;
};

const SignupForm = (props: SignupFormProps) => {
   const [signupMutation] = useMutation(signup);

   return (
      <div>
         <h1>Create an Account</h1>

         <Form
            submitText='Create Account'
            schema={Signup}
            initialValues={{ username: '', password: '' }}
            onSubmit={async values => {
               try {
                  await signupMutation(values);
                  props.onSuccess?.();
               } catch (error) {
                  if (
                     error.code === 'P2002' &&
                     error.meta?.target?.includes('username')
                  ) {
                     // This error comes from Prisma
                     return { username: 'This username is already being used' };
                  } else {
                     return { [FORM_ERROR]: error.toString() };
                  }
               }
            }}
         >
            <LabeledTextField
               name='username'
               label='نام کاربری'
               placeholder='نام کاربری'
            />
            <LabeledTextField
               name='password'
               label='Password'
               placeholder='Password'
               type='password'
            />
         </Form>
      </div>
   );
};

export default SignupForm;
