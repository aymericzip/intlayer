import { useDictionary } from 'react-intlayer';
import { z } from 'zod/v4';
import { signUpSchemaContent } from './useSignUpSchema.content';

export const useSignUpSchema = () => {
  const {
    requiredErrorEmail,
    invalidTypeErrorEmail,
    requiredErrorPassword,
    invalidTypeErrorPassword,
    requiredErrorPasswordConfirmation,
    invalidTypeErrorPasswordConfirmation,
    passwordNotMatchError,
  } = useDictionary(signUpSchemaContent);

  return z
    .object({
      email: z
        .email({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorEmail.value
              : invalidTypeErrorEmail.value,
        })
        .min(1, { error: invalidTypeErrorEmail.value }),
      password: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorPassword.value
              : invalidTypeErrorPassword.value,
        })
        .min(8, { error: invalidTypeErrorPassword.value }),
      passwordConfirmation: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorPasswordConfirmation.value
              : invalidTypeErrorPasswordConfirmation.value,
        })
        .min(8, { error: invalidTypeErrorPasswordConfirmation.value }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: passwordNotMatchError.value,
      path: ['passwordConfirmation'], // This specifies which field the error should be associated with
    });
};

export type SignUp = z.infer<ReturnType<typeof useSignUpSchema>>;
