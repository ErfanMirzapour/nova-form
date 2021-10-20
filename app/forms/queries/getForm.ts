import { resolver, NotFoundError } from 'blitz';
import { z } from 'zod';
import { setTimeout } from 'timers/promises';

import db from '~db';

export default resolver.pipe(
   resolver.zod(z.string()),
   resolver.authorize(),
   async (id, { session }) => {
      await setTimeout(2000);

      const [form] = await db.form.findMany({
         where: { id, ownerId: session.userId },
         include: { inputs: true },
      });

      if (!form) throw new NotFoundError();

      return form;
   }
);
