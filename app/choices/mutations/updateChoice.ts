import { resolver } from 'blitz';
import db, { Choice } from 'db';
import { z } from 'zod';

const UpdateChoice = z.object({
   id: z.number(),
   name: z.string(),
});

export default resolver.pipe(
   resolver.zod(UpdateChoice),
   resolver.authorize(),
   async ({ id, ...data }) => {
      // TODO: in multi-tenant app, you must add validation to ensure correct tenant
      const choice = await db.choice.update({
         where: { id },
         data: data as unknown as Choice,
      });

      return choice;
   }
);
