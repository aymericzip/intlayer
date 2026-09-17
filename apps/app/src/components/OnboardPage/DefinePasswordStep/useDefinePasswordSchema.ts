import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useDefinePasswordSchema = () => {
  const {
    invalidPasswordLengthError,
    requiredErrorNewPassword,
    invalidTypeErrorNewPassword,
    requiredErrorNewPasswordConfirmation,
    invalidTypeErrorNewPasswordConfirmation,
    passwordNotMatchError,
  } = useIntlayer('define-password-schema');

  return z
    .object({
      newPassword: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorNewPassword.value
              : invalidTypeErrorNewPassword.value,
        })
        .check(z.minLength(8, invalidPasswordLengthError.value)),
      newPasswordConfirmation: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorNewPasswordConfirmation.value
              : invalidTypeErrorNewPasswordConfirmation.value,
        })
        .check(z.minLength(8, invalidPasswordLengthError.value)),
    })
    .check(
      z.refine((data) => data.newPassword === data.newPasswordConfirmation, {
        message: passwordNotMatchError.value,
        path: ['newPasswordConfirmation'], // This specifies which field the error should be associated with
      })
    );
};

export type DefinePassword = z.infer<
  ReturnType<typeof useDefinePasswordSchema>
>;
