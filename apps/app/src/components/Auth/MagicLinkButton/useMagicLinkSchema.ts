import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useMagicLinkSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail } =
    useIntlayer('magic-link-schema');

  return z.object({
    email: z._default(
      z
        .email({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorEmail.value
              : invalidTypeErrorEmail.value,
        })
        .check(z.minLength(1, { error: invalidTypeErrorEmail.value })),
      ''
    ),
  });
};

export type MagicLinkForm = z.infer<ReturnType<typeof useMagicLinkSchema>>;
