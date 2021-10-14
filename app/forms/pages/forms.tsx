import { Suspense } from 'react';
import { Link, useMutation, Routes, useRouter } from 'blitz';

import { useCurrentUser } from '~core/hooks';
import { Page } from '~core/types';
import { logout } from '~auth/resolvers';

const Forms = () => {
   const currentUser = useCurrentUser();
   const router = useRouter();
   const [logoutMutation] = useMutation(logout);

   const handleLogout = async () => {
      await logoutMutation();
      router.push('/login');
   };

   if (currentUser) {
      return (
         <>
            <button className='button small' onClick={handleLogout}>
               Logout
            </button>
            <div>
               User id: <code>{currentUser.id}</code>
               <br />
               User role: <code>{currentUser.role}</code>
            </div>
         </>
      );
   } else {
      return (
         <>
            <Link href={Routes.SignupPage()}>
               <a className='button small'>
                  <strong>Sign Up</strong>
               </a>
            </Link>
            <Link href={Routes.LoginPage()}>
               <a className='button small'>
                  <strong>Login</strong>
               </a>
            </Link>
         </>
      );
   }
};

const Home: Page = () => {
   return (
      <Suspense fallback='Loading...'>
         <Forms />
      </Suspense>
   );
};

Home.authenticate = true;
Home.suppressFirstRenderFlicker = true;
Home.title = 'فرم ها';

export default Home;
