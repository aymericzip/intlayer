import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useMagicLinkSchema = () => {
  const { requiredErrorEmail, invalidTypeErrorEmail } =
    useIntlayer('magic-link-schema');

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

export type MagicLinkForm = z.infer<ReturnType<typeof useMagicLinkSchema>>;
