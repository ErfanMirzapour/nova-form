import { useRouter, Routes } from 'blitz';

import { Page } from '~/app/core/types';
import { SignupForm } from '../components';

const SignupPage: Page = () => {
   const router = useRouter();

   return (
      <div>
         <SignupForm onSuccess={() => router.push(Routes.Home())} />
      </div>
   );
};

SignupPage.redirectAuthenticatedTo = '/forms';
SignupPage.title = 'ساخت حساب کاربری';

export default SignupPage;
