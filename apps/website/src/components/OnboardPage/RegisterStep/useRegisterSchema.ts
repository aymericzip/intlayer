import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useRegisterSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail } = useIntlayer(
    'register-password-schema',
    undefined,
    false
  );

  return z.object({
    email: z
      .string({
        required_error: requiredErrorEmail,
        invalid_type_error: invalidTypeErrorEmail,
      })
      .min(1, { message: invalidTypeErrorEmail })
      .email({ message: invalidTypeErrorEmail }),
  });
};

export type Register = z.infer<ReturnType<typeof useRegisterSchema>>;
