import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useAskResetPasswordSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail, invalidLengthErrorEmail } =
    useIntlayer('ask-reset-password-schema');

  return z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorEmail.value
            : invalidTypeErrorEmail.value,
      })
      .check(z.minLength(1, { error: invalidLengthErrorEmail.value })),
  });
};

export type AskResetPassword = z.infer<
  ReturnType<typeof useAskResetPasswordSchema>
>;
