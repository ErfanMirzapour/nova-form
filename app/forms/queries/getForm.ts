import { resolver, NotFoundError } from 'blitz';
import { z } from 'zod';

import db from '~db';

export default resolver.pipe(
   resolver.zod(z.string()),
   resolver.authorize(),
   async (id, { session }) => {
      const [form] = await db.form.findMany({
         where: { id, ownerId: session.userId },
      });

      if (!form) throw new NotFoundError();

      return form;
   }
);
