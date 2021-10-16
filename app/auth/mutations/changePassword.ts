import { NotFoundError, SecurePassword, resolver } from 'blitz';

import db from '~db';
import { authenticateUser } from './login';
import { changePasswordSchema } from '../validations';

export default resolver.pipe(
   resolver.zod(changePasswordSchema),
   resolver.authorize(),
   async ({ currentPassword, password }, ctx) => {
      const user = await db.user.findFirst({
         where: { id: ctx.session.userId! },
      });
      if (!user) throw new NotFoundError();

      await authenticateUser(user.username, currentPassword);

      const hashedPassword = await SecurePassword.hash(password.trim());
      await db.user.update({
         where: { id: user.id },
         data: { hashedPassword },
      });

      return true;
   }
);
