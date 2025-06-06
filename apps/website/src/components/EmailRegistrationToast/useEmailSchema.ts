'use client';

import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useEmailSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail } = useIntlayer(
    'email-registration-toast'
  );

  return z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorEmail.value
            : invalidTypeErrorEmail.value,
      })
      .min(1, { error: invalidTypeErrorEmail.value })
      .default(''),
  });
};

export type EmailSchemaValue = z.infer<ReturnType<typeof useEmailSchema>>;
