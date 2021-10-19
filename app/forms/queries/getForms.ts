import { resolver } from 'blitz';

import db, { Prisma } from '~db';

export default resolver.pipe(
   resolver.authorize(),
   (orderBy: Prisma.FormFindManyArgs['orderBy'] | undefined, { session }) => {
      return db.form.findMany({
         orderBy,
         where: { ownerId: session.userId },
      });
   }
);
