import { resolver } from 'blitz';
import { z } from 'zod';

import db from '~db';

export default resolver.pipe(resolver.zod(z.string()), async id => {
   await db.customInput.deleteMany({ where: { formId: id } });

   return db.form.delete({ where: { id } });
});
