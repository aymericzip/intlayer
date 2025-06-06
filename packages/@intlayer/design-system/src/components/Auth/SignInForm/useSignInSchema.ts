import { useDictionary } from 'react-intlayer';
import { z } from 'zod/v4';
import { signInSchemaContent } from './useSignInSchema.content';

export const useSignInSchema = () => {
  const {
    requiredErrorEmail,
    invalidTypeErrorEmail,
    requiredErrorPassword,
    invalidTypeErrorPassword,
  } = useDictionary(signInSchemaContent);

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
  });
};
export type SignIn = z.infer<ReturnType<typeof useSignInSchema>>;
