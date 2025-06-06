'use client';

import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useEmailSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail } = useIntlayer(
    'email-registration-toast'
  );

  return z.object({
    email: z
      .string({
        required_error: requiredErrorEmail.value,
        invalid_type_error: invalidTypeErrorEmail.value,
      })
      .min(1, { message: invalidTypeErrorEmail.value })
      .email({ message: invalidTypeErrorEmail.value })
      .default(''),
  });
};

export type EmailSchemaValue = z.infer<ReturnType<typeof useEmailSchema>>;
