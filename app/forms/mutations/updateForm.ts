import { resolver } from 'blitz';

import db from '~db';

import { formSchema } from '../validations';

export default resolver.pipe(
   resolver.zod(formSchema),
   resolver.authorize(),
   async ({ id, inputs, ...form }, { session }) => {
      if (!(await db.form.count({ where: { ownerId: session.userId } })))
         return;

      return db.form.update({
         where: { id },
         data: {
            ...form,
            inputs: {
               upsert: inputs.map(({ id, ...input }) => ({
                  where: { id },
                  update: { ...input },
                  create: input,
               })),
            },
         },
      });
   }
);
