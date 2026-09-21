import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useSignUpSchema = () => {
  const {
    requiredErrorEmail,
    invalidTypeErrorEmail,
    requiredErrorPassword,
    invalidTypeErrorPassword,
    requiredErrorPasswordConfirmation,
    invalidTypeErrorPasswordConfirmation,
    passwordNotMatchError,
    termsAndConditionsError,
  } = useIntlayer('sign-up-schema');

  return z
    .object({
      email: z
        .email({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorEmail.value
              : invalidTypeErrorEmail.value,
        })
        .check(z.minLength(1, { error: invalidTypeErrorEmail.value })),
      password: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorPassword.value
              : invalidTypeErrorPassword.value,
        })
        .check(z.minLength(8, { error: invalidTypeErrorPassword.value })),
      passwordConfirmation: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorPasswordConfirmation.value
              : invalidTypeErrorPasswordConfirmation.value,
        })
        .check(
          z.minLength(8, { error: invalidTypeErrorPasswordConfirmation.value })
        ),
      termsAndConditions: z._default(z.boolean(), false).check(
        z.refine((value) => Boolean(value), {
          message: termsAndConditionsError.value,
        })
      ),
    })
    .check(
      z.refine((data) => data.password === data.passwordConfirmation, {
        message: passwordNotMatchError.value,
        path: ['passwordConfirmation'], // This specifies which field the error should be associated with
      })
    );
};

export type SignUp = z.infer<ReturnType<typeof useSignUpSchema>>;
