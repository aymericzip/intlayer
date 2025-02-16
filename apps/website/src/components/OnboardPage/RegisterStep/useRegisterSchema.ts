import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useRegisterSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail } = useIntlayer(
    'register-password-schema'
  );

  return z.object({
    email: z
      .string({
        required_error: requiredErrorEmail.value,
        invalid_type_error: invalidTypeErrorEmail.value,
      })
      .min(1, { message: invalidTypeErrorEmail.value })
      .email({ message: invalidTypeErrorEmail.value }),
  });
};

export type Register = z.infer<ReturnType<typeof useRegisterSchema>>;
