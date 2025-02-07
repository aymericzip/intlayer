import { useDictionary } from 'react-intlayer';
import { z } from 'zod';
import { useResetPasswordSchemaContent } from './useResetPasswordSchema.content';

export const useResetPasswordSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail, invalidLengthErrorEmail } =
    useDictionary(useResetPasswordSchemaContent, undefined, false);

  return z.object({
    email: z
      .string({
        required_error: requiredErrorEmail,
        invalid_type_error: invalidTypeErrorEmail,
      })
      .min(1, { message: invalidLengthErrorEmail }),
  });
};

export type ResetPassword = z.infer<ReturnType<typeof useResetPasswordSchema>>;
