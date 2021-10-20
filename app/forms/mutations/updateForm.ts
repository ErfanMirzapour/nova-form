import { resolver } from 'blitz';

import db from '~db';
import { formSchema } from '../validations';

export default resolver.pipe(
   resolver.zod(formSchema),
   resolver.authorize(),
   async ({ id, inputs, ...form }, { session }) => {
      if (!(await db.form.count({ where: { ownerId: session.userId } })))
         return;

      const deleteInputs = db.customInput.deleteMany({
         where: {
            formId: id,
            id: { notIn: inputs.map(({ id }) => id!).filter(Boolean) },
         },
      });

      const updateForm = db.form.update({
         where: { id },
         data: {
            ...form,
            inputs: {
               upsert: inputs.map(({ id: inputId, ...input }) => ({
                  where: { id: inputId || '' },
                  update: { ...input },
                  create: input,
               })),
            },
         },
      });

      return db.$transaction([deleteInputs, updateForm]);
   }
);
