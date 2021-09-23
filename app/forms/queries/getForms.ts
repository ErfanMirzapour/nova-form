import { resolver } from 'blitz';

import db, { Prisma } from '~db';

export default resolver.pipe(
   resolver.authorize(),
   (orderBy?: Prisma.FormFindManyArgs['orderBy']) => {
      return db.form.findMany({ orderBy });
   }
);
