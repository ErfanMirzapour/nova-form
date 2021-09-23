import { resolver, NotFoundError } from 'blitz';
import { z } from 'zod';

import db from '~db';

export default resolver.pipe(
   resolver.zod(z.string()),
   resolver.authorize(),
   async id => {
      const form = await db.form.findUnique({ where: { id } });

      if (!form) throw new NotFoundError();

      return form;
   }
);
