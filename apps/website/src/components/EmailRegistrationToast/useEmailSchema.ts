'use client';

import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useEmailSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail } = useIntlayer(
    'email-registration-toast'
  );

  return z.object({
    email: z
      .string()
      .min(1, { error: requiredErrorEmail.value })
      .email({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorEmail.value
            : invalidTypeErrorEmail.value,
      })
      .default(''),
  });
};

export type EmailSchemaValue = z.infer<ReturnType<typeof useEmailSchema>>;
