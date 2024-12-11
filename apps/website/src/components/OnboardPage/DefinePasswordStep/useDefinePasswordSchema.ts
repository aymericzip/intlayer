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
  } = useIntlayer('define-password-schema', undefined, false);

  return z
    .object({
      currentPassword: isPasswordDefined
        ? z
            .string({
              required_error: requiredErrorPassword,
              invalid_type_error: invalidTypeErrorPassword,
            })
            .min(8, { message: invalidPasswordLengthError })
        : z.undefined(),
      newPassword: z
        .string({
          required_error: requiredErrorNewPassword,
          invalid_type_error: invalidTypeErrorNewPassword,
        })
        .min(8, { message: invalidPasswordLengthError }),
      newPasswordConfirmation: z
        .string({
          required_error: requiredErrorNewPasswordConfirmation,
          invalid_type_error: invalidTypeErrorNewPasswordConfirmation,
        })
        .min(8, { message: invalidPasswordLengthError }),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: passwordNotMatchError,
      path: ['newPasswordConfirmation'], // This specifies which field the error should be associated with
    });
};

export type DefinePassword = z.infer<
  ReturnType<typeof useDefinePasswordSchema>
>;
