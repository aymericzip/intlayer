import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useTwoFactorAuthSchema = () => {
  const { requiredErrorPassword, invalidTypeErrorPassword } = useIntlayer(
    'two-factor-auth-schema'
  );

  return z.object({
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorPassword.value
            : invalidTypeErrorPassword.value,
      })
      .min(1, { error: invalidTypeErrorPassword.value })
      .default(''),
  });
};

export type TwoFactorAuthForm = z.infer<
  ReturnType<typeof useTwoFactorAuthSchema>
>;
