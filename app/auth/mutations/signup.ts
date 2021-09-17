import { resolver, SecurePassword } from 'blitz';

import db from '~db';
import { Role } from '~/types';

import { Signup } from '../validations';

export default resolver.pipe(
   resolver.zod(Signup),
   async ({ username, password }, ctx) => {
      const hashedPassword = await SecurePassword.hash(password.trim());
      const user = await db.user.create({
         data: {
            username: username.toLowerCase(),
            hashedPassword,
            role: 'USER',
         },
         select: { id: true, fullName: true, username: true, role: true },
      });

      await ctx.session.$create({ userId: user.id, role: user.role as Role });
      return user;
   }
);
