import { resolver } from 'blitz';
import { z } from 'zod';

import db from '~db';

const DeleteChoice = z.object({
   id: z.number(),
});

export default resolver.pipe(
   resolver.zod(DeleteChoice),
   resolver.authorize(),
   async ({ id }) => {
      // TODO: in multi-tenant app, you must add validation to ensure correct tenant
      const choice = await db.choice.deleteMany({ where: { id } });

      return choice;
   }
);
