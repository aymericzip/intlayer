import { z } from 'zod';

export const ResetPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email',
      invalid_type_error: 'Please enter a valid email',
    })
    .min(1, { message: 'Incorrect email address' }),
});

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
