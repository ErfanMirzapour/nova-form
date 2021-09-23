import { resolver } from 'blitz';

import db from '~db';

import { FormSchema } from '../validations';

export default resolver.pipe(
   resolver.zod(FormSchema),
   resolver.authorize(),
   ({ inputs, ...form }, { session }) => {
      return db.form.create({
         data: {
            owner: { connect: { id: session.userId! } },
            ...form,
            inputs: {
               createMany: { data: inputs },
            },
         },
      });
   }
);
