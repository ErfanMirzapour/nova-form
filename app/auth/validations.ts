import { z } from 'zod';
import sanitizer from 'string-sanitizer';
import errors from './errors';

const password = z.string().min(6);

export const Signup = z.object({
   username: z
      .string()
      .min(2)
      .max(50)
      .refine(username => sanitizer.validate.isUsername(username), {
         message: errors.invalidUsername,
      }),
   password,
});

export const SignupForm = Signup.extend({
   passwordConfirm: password,
});

export const Login = Signup;

export const ChangePassword = z.object({
   currentPassword: password,
   newPassword: password,
});
