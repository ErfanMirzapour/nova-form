import { resolver } from 'blitz';

import db from '~db';

export default resolver.pipe(
   resolver.authorize(),
   (formId: string | undefined, { session }) => {
      return db.formResult.findMany({
         where: { formId, form: { ownerId: session.userId } },
      });
   }
);
