import { resolver, SecurePassword, AuthenticationError } from 'blitz';

import db from '~db';
import { Role } from '~/types';

import { Login } from '../validations';

export const authenticateUser = async (
   rawUsername: string,
   rawPassword: string
) => {
   const username = rawUsername.toLowerCase();
   const password = rawPassword.trim();
   const user = await db.user.findFirst({ where: { username } });
   if (!user) throw new AuthenticationError();

   const result = await SecurePassword.verify(user.hashedPassword, password);

   if (result === SecurePassword.VALID_NEEDS_REHASH) {
      // Upgrade hashed password with a more secure hash
      const improvedHash = await SecurePassword.hash(password);
      await db.user.update({
         where: { id: user.id },
         data: { hashedPassword: improvedHash },
      });
   }

   const { hashedPassword, ...rest } = user;
   return rest;
};

export default resolver.pipe(
   resolver.zod(Login),
   async ({ username, password }, ctx) => {
      // This throws an error if credentials are invalid
      const user = await authenticateUser(username, password);

      await ctx.session.$create({ userId: user.id, role: user.role as Role });

      return user;
   }
);
