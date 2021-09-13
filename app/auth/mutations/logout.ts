import { Ctx } from 'blitz';

export default async function logout(_, ctx: Ctx) {
   return await ctx.session.$revoke();
}
