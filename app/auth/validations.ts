import { z } from 'zod';

const password = z.string().min(6);

export const Signup = z.object({
   username: z.string().min(1).max(50),
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
