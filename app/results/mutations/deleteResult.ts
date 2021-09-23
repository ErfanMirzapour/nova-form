import { resolver } from 'blitz';
import { z } from 'zod';

import db from '~db';

export default resolver.pipe(
   resolver.zod(z.string()),
   resolver.authorize(),
   async (id, { session }) => {
      const result = await db.formResult.deleteMany({
         where: { id, form: { ownerId: session.userId } },
      });

      return result;
   }
);
