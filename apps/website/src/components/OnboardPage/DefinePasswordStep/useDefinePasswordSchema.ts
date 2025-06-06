import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useDefinePasswordSchema = (isPasswordDefined: boolean) => {
  const {
    requiredErrorPassword,
    invalidTypeErrorPassword,
    invalidPasswordLengthError,
    requiredErrorNewPassword,
    invalidTypeErrorNewPassword,
    requiredErrorNewPasswordConfirmation,
    invalidTypeErrorNewPasswordConfirmation,
    passwordNotMatchError,
  } = useIntlayer('define-password-schema');

  return z
    .object({
      currentPassword: isPasswordDefined
        ? z
            .string({
              error: (issue) =>
                issue.input === undefined
                  ? requiredErrorPassword.value
                  : invalidTypeErrorPassword.value,
            })
            .min(8, invalidPasswordLengthError.value)
        : z.undefined(),
      newPassword: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorNewPassword.value
              : invalidTypeErrorNewPassword.value,
        })
        .min(8, invalidPasswordLengthError.value),
      newPasswordConfirmation: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorNewPasswordConfirmation.value
              : invalidTypeErrorNewPasswordConfirmation.value,
        })
        .min(8, invalidPasswordLengthError.value),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: passwordNotMatchError.value,
      path: ['newPasswordConfirmation'], // This specifies which field the error should be associated with
    });
};

export type DefinePassword = z.infer<
  ReturnType<typeof useDefinePasswordSchema>
>;
