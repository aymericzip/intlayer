import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useSignInSchema = () => {
  const {
    requiredErrorEmail,
    invalidTypeErrorEmail,
    requiredErrorPassword,
    invalidTypeErrorPassword,
  } = useIntlayer('sign-in-schema');

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
    password: z._default(
      z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorPassword.value
              : invalidTypeErrorPassword.value,
        })
        .check(z.minLength(1, { error: invalidTypeErrorPassword.value })),
      ''
    ),
    rememberMe: z._default(z.boolean(), false),
  });
};
export type SignIn = z.infer<ReturnType<typeof useSignInSchema>>;
