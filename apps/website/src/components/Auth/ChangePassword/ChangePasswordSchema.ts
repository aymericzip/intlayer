/* eslint-disable sonarjs/no-duplicate-string */
import { z } from 'zod';

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: 'Please enter your current password' })
      .min(1, { message: 'Incorrect password' }),
    newPassword: z
      .string({ required_error: 'Please enter your new password' })
      .min(1, { message: 'Incorrect password' }),
    newPasswordConfirmation: z
      .string({ required_error: 'Confirm enter your new password' })
      .min(1, { message: 'Incorrect password' }),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: 'New password and password confirmation must match',
    path: ['newPasswordConfirmation'], // This specifies which field the error should be associated with
  });

export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
