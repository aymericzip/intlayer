import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useResetPasswordSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail, invalidLengthErrorEmail } =
    useIntlayer('reset-password-schema');

  return z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorEmail.value
            : invalidTypeErrorEmail.value,
      })
      .min(1, { error: invalidLengthErrorEmail.value }),
  });
};

export type ResetPassword = z.infer<ReturnType<typeof useResetPasswordSchema>>;
