import { resolver, NotFoundError } from 'blitz';

import db from '~db';

export default resolver.pipe(resolver.authorize(), async (id: string) => {
   const form = await db.form.findUnique({ where: { id } });

   if (!form) throw new NotFoundError();

   return form;
});
