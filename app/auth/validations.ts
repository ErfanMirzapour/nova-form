import { z } from 'zod';

const password = z.string();

export const Signup = z.object({
   email: z.string().email(),
   password,
});

export const Login = z.object({
   email: z.string().email(),
   password: z.string(),
});

export const ChangePassword = z.object({
   currentPassword: z.string(),
   newPassword: password,
});
