import { useRouter } from 'blitz';

import { Page } from '~core/types';
import { LoginForm } from '../components';

const LoginPage: Page = () => {
   const router = useRouter();

   return (
      <LoginForm
         onSuccess={() => {
            const next = router.query.next
               ? decodeURIComponent(router.query.next as string)
               : '/forms';
            router.push(next);
         }}
      />
   );
};

LoginPage.redirectAuthenticatedTo = '/forms';
LoginPage.title = 'ورود به حساب کاربری';

export default LoginPage;
