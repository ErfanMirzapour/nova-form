import { Head, ErrorComponent } from 'blitz';

import errors from '../errors';

const statusCode = 404;
const title = errors.notFound;

const Page404 = () => {
   return (
      <>
         <Head>
            <title>
               {statusCode}: {title}
            </title>
         </Head>
         <ErrorComponent statusCode={statusCode} title={title} />
      </>
   );
};

export default Page404;
