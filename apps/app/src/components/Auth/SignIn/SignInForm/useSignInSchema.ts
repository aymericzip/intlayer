import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useSignInSchema = () => {
  const {
    requiredErrorEmail,
    invalidTypeErrorEmail,
    requiredErrorPassword,
    invalidTypeErrorPassword,
  } = useIntlayer('sign-in-schema');

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
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? requiredErrorPassword.value
            : invalidTypeErrorPassword.value,
      })
      .min(1, { error: invalidTypeErrorPassword.value })
      .default(''),
    rememberMe: z.boolean().default(false),
  });
};
export type SignIn = z.infer<ReturnType<typeof useSignInSchema>>;
