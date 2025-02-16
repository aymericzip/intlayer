import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

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
              required_error: requiredErrorPassword.value,
              invalid_type_error: invalidTypeErrorPassword.value,
            })
            .min(8, { message: invalidPasswordLengthError.value })
        : z.undefined(),
      newPassword: z
        .string({
          required_error: requiredErrorNewPassword.value,
          invalid_type_error: invalidTypeErrorNewPassword.value,
        })
        .min(8, { message: invalidPasswordLengthError.value }),
      newPasswordConfirmation: z
        .string({
          required_error: requiredErrorNewPasswordConfirmation.value,
          invalid_type_error: invalidTypeErrorNewPasswordConfirmation.value,
        })
        .min(8, { message: invalidPasswordLengthError.value }),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: passwordNotMatchError.value,
      path: ['newPasswordConfirmation'], // This specifies which field the error should be associated with
    });
};

export type DefinePassword = z.infer<
  ReturnType<typeof useDefinePasswordSchema>
>;
