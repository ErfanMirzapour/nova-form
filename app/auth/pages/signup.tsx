import { useRouter, BlitzPage, Routes } from 'blitz';

import { Layout } from '~core/components';

import { SignupForm } from '../components';

const SignupPage: BlitzPage = () => {
   const router = useRouter();

   return (
      <div>
         <SignupForm onSuccess={() => router.push(Routes.Home())} />
      </div>
   );
};

SignupPage.redirectAuthenticatedTo = '/';
SignupPage.getLayout = page => <Layout title='Sign Up'>{page}</Layout>;

export default SignupPage;
