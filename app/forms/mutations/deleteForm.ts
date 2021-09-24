import { resolver } from 'blitz';
import { z } from 'zod';

import db from '~db';

export default resolver.pipe(
   resolver.zod(z.string()),
   resolver.authorize(),
   async (id, { session }) => {
      const deleteInputs = db.customInput.deleteMany({ where: { formId: id } });

      const deleteForm = db.form.deleteMany({
         where: { id, ownerId: session.userId },
      });

      return db.$transaction([deleteInputs, deleteForm]);
   }
);
