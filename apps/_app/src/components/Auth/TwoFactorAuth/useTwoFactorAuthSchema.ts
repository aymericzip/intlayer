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

export const useTwoFactorAuthOTPSchema = () => {
  const { invalidTypeErrorOTP } = useIntlayer('two-factor-auth-schema');

  return z
    .object({
      code: z.string().length(6),
    })
    .refine((data) => data.code.length === 6, {
      message: invalidTypeErrorOTP.value,
      path: ['code'],
    });
};

export type TwoFactorAuthOTPSchema = z.infer<
  ReturnType<typeof useTwoFactorAuthOTPSchema>
>;
