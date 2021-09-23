import { resolver } from 'blitz';
import { z } from 'zod';

import db from '~db';

const formResultSchema = z.object({
   formId: z.string(),
   result: z.object({}).passthrough(),
});

export default resolver.pipe(
   resolver.zod(formResultSchema),
   resolver.authorize(),
   ({ formId, result }, { session }) => {
      return db.formResult.create({
         data: { result, formId, submitterId: session.userId },
      });
   }
);
