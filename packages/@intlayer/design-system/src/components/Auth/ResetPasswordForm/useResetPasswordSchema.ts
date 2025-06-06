import { useDictionary } from 'react-intlayer';
import { z } from 'zod/v4';
import { useResetPasswordSchemaContent } from './useResetPasswordSchema.content';

export const useResetPasswordSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail, invalidLengthErrorEmail } =
    useDictionary(useResetPasswordSchemaContent);

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
