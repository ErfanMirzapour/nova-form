import { resolver } from 'blitz';
import { z } from 'zod';

import db from '~db';

const UpdateChoice = z.object({
   id: z.number(),
   text: z.string(),
   votes: z.number(),
});

export default resolver.pipe(
   resolver.zod(UpdateChoice),
   resolver.authorize(),
   async ({ id, ...data }) => {
      // TODO: in multi-tenant app, you must add validation to ensure correct tenant
      const choice = await db.choice.update({
         where: { id },
         data,
      });

      return choice;
   }
);
