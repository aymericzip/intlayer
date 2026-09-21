import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useEmailSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail } = useIntlayer(
    'email-registration-toast'
  );

  return z.object({
    email: z._default(
      z.string().check(
        z.minLength(1, { error: requiredErrorEmail.value }),
        z.email({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorEmail.value
              : invalidTypeErrorEmail.value,
        })
      ),
      ''
    ),
  });
};

export type EmailSchemaValue = z.infer<ReturnType<typeof useEmailSchema>>;
