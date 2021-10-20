import { resolver } from 'blitz';
import { setTimeout } from 'timers/promises';

import db, { Prisma } from '~db';

export default resolver.pipe(
   resolver.authorize(),
   async (
      orderBy: Prisma.FormFindManyArgs['orderBy'] | undefined,
      { session }
   ) => {
      await setTimeout(2000);

      return db.form.findMany({
         orderBy,
         where: { ownerId: session.userId },
      });
   }
);
