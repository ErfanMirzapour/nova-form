import { resolver } from 'blitz';
import { z } from 'zod';

import db from '~db';

const CreateQuestion = z.object({
   text: z.string(),
});

export default resolver.pipe(
   resolver.zod(CreateQuestion),
   resolver.authorize(),
   async input => {
      // TODO: in multi-tenant app, you must add validation to ensure correct tenant
      const question = await db.question.create({ data: input });

      return question;
   }
);
