import { useMutation } from 'blitz';

import { LabeledTextField, Form, FORM_ERROR } from '~core/components';
import { signup } from '~auth/resolvers';
import { SignupForm as SignupFormSchema } from '~auth/validations';

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
            schema={SignupFormSchema}
            initialValues={{ username: '', password: '', passwordConfirm: '' }}
            onSubmit={async ({ passwordConfirm, ...values }) => {
               if (values.password !== passwordConfirm)
                  return { passwordConfirm: 'رمزهای عبور همخوانی ندارند!' };

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
            <LabeledTextField
               name='passwordConfirm'
               label='تکرار رمز عبور'
               placeholder='تکرار رمز عبور'
               type='password'
            />
         </Form>
      </div>
   );
};

export default SignupForm;
