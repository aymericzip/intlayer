import { useDictionary } from 'react-intlayer';
import { z } from 'zod/v4';
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
          error: (issue) =>
            issue.input === undefined
              ? requiredErrorPassword.value
              : invalidTypeErrorPassword.value,
        })
        .min(8, { error: invalidPasswordLengthError.value }),
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
export type ChangePassword = z.infer<
  ReturnType<typeof useChangePasswordSchema>
>;
