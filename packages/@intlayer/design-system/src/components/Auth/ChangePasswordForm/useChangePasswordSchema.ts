import { useDictionary } from 'react-intlayer';
import { z } from 'zod';
import { changePasswordSchemaContent } from './useChangePasswordSchema.content';

export const useChangePasswordSchema = () => {
  const {
    requiredErrorPassword,
    invalidTypeErrorPassword,
    invalidPasswordLengthError,
    requiredErrorNewPassword,
    invalidTypeErrorNewPassword,
    requiredErrorNewPasswordConfirmation,
    invalidTypeErrorNewPasswordConfirmation,
    passwordNotMatchError,
  } = useDictionary(changePasswordSchemaContent);

  return z
    .object({
      currentPassword: z
        .string({
          required_error: requiredErrorPassword.value,
          invalid_type_error: invalidTypeErrorPassword.value,
        })
        .min(8, { message: invalidPasswordLengthError.value }),
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
export type ChangePassword = z.infer<
  ReturnType<typeof useChangePasswordSchema>
>;
