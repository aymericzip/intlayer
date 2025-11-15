import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useDeleteUserSchema = (userEmail?: string) => {
  const { requiredErrorEmail, invalidTypeErrorEmail, emailMismatchError } =
    useIntlayer('delete-user-schema');

  return z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorEmail.value
            : invalidTypeErrorEmail.value,
      })
      .min(1, { error: invalidTypeErrorEmail.value })
      .refine((email) => email === userEmail, {
        error: emailMismatchError.value,
      })
      .default(''),
  });
};

export type DeleteUserForm = z.infer<ReturnType<typeof useDeleteUserSchema>>;
