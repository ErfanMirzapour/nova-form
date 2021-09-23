import { resolver } from 'blitz';

import db from '~db';

import { FormSchema } from '../validations';

export default resolver.pipe(
   resolver.zod(FormSchema),
   resolver.authorize(),
   ({ id, inputs, ...form }) => {
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
