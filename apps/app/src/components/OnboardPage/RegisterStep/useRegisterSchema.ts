import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useRegisterSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail } = useIntlayer(
    'register-password-schema'
  );

  return z.object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorEmail.value
            : invalidTypeErrorEmail.value,
      })
      .min(1, { error: invalidTypeErrorEmail.value }),
  });
};

export type Register = z.infer<ReturnType<typeof useRegisterSchema>>;
