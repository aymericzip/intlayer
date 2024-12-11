// @ts-ignore react-intlayer not build yet
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
          required_error: requiredErrorPassword,
          invalid_type_error: invalidTypeErrorPassword,
        })
        .min(8, { message: invalidPasswordLengthError }),
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
export type ChangePassword = z.infer<
  ReturnType<typeof useChangePasswordSchema>
>;
