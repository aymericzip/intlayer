import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useDeleteUserSchema = (userEmail?: string) => {
  const { requiredErrorEmail, invalidTypeErrorEmail, emailMismatchError } =
    useIntlayer('delete-user-schema');

  return z.object({
    email: z._default(
      z
        .email({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorEmail.value
              : invalidTypeErrorEmail.value,
        })
        .check(
          z.minLength(1, { error: invalidTypeErrorEmail.value }),
          z.refine((email) => email === userEmail, {
            error: emailMismatchError.value,
          })
        ),
      ''
    ),
  });
};

export type DeleteUserForm = z.infer<ReturnType<typeof useDeleteUserSchema>>;
