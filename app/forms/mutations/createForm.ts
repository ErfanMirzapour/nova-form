import { resolver } from 'blitz';

import db from '~db';
import { formSchema } from '../validations';

export default resolver.pipe(
   resolver.zod(formSchema),
   resolver.authorize(),
   async ({ inputs, ...form }, { session }) => {
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
