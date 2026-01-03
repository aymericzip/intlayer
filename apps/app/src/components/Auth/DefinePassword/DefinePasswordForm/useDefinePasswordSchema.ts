import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useDefinePasswordSchema = () => {
  const {
    invalidPasswordLengthError,
    requiredErrorNewPassword,
    invalidTypeErrorNewPassword,
    requiredErrorNewPasswordConfirmation,
    invalidTypeErrorNewPasswordConfirmation,
    passwordNotMatchError,
  } = useIntlayer('define-password-form-schema');

  return z
    .object({
      newPassword: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorNewPassword.value
              : invalidTypeErrorNewPassword.value,
        })
        .min(8, { error: invalidPasswordLengthError.value }),
      newPasswordConfirmation: z
        .string({
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorNewPasswordConfirmation.value
              : invalidTypeErrorNewPasswordConfirmation.value,
        })
        .min(8, { error: invalidPasswordLengthError.value }),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: passwordNotMatchError.value,
      path: ['newPasswordConfirmation'], // This specifies which field the error should be associated with
    });
};
export type DefinePassword = z.infer<
  ReturnType<typeof useDefinePasswordSchema>
>;
