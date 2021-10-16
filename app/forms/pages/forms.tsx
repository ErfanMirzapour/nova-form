import { Suspense } from 'react';
import { Link, useMutation, Routes, useRouter } from 'blitz';

import { useCurrentUser } from '~core/hooks';
import { Page } from '~core/types';
import { logoutMutation } from '~auth/resolvers';

const Forms = () => {
   const currentUser = useCurrentUser();
   const router = useRouter();
   const [logout] = useMutation(logoutMutation);

   const handleLogout = async () => {
      await logout();
      router.push(Routes.LoginPage());
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

const FormsPage: Page = () => {
   return (
      <Suspense fallback='Loading...'>
         <Forms />
      </Suspense>
   );
};

FormsPage.authenticate = true;
FormsPage.suppressFirstRenderFlicker = true;
FormsPage.title = 'فرم ها';

export default FormsPage;
