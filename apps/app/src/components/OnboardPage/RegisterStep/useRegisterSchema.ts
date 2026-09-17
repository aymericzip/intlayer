import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

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
      .check(z.minLength(1, { error: invalidTypeErrorEmail.value })),
  });
};

export type Register = z.infer<ReturnType<typeof useRegisterSchema>>;
