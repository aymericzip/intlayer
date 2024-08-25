import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your username',
      invalid_type_error: 'Please enter a valid username',
    })
    .min(1, { message: 'Incorrect email address' }),
  password: z
    .string({ required_error: 'Please enter your password' })
    .min(1, { message: 'Incorrect password' }),
});

export type SignIn = z.infer<typeof SignInSchema>;
