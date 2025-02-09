import { useDictionary } from 'react-intlayer';
import { z } from 'zod';
import { useResetPasswordSchemaContent } from './useResetPasswordSchema.content';

export const useResetPasswordSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail, invalidLengthErrorEmail } =
    useDictionary(useResetPasswordSchemaContent);

  return z.object({
    email: z
      .string({
        required_error: requiredErrorEmail.value,
        invalid_type_error: invalidTypeErrorEmail.value,
      })
      .min(1, { message: invalidLengthErrorEmail.value }),
  });
};

export type ResetPassword = z.infer<ReturnType<typeof useResetPasswordSchema>>;
