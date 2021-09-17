import { z } from 'zod';
import sanitizer from 'string-sanitizer';

import errors from '~core/errors';

import authErrors from './errors';

const password = z.string().min(6, errors.min(6));

export const Signup = z.object({
   username: z
      .string()
      .min(2, errors.min(2))
      .max(30, errors.max(30))
      .refine(
         username => sanitizer.validate.isUsername(username),
         authErrors.invalidUsername
      ),
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
