// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore react-intlayer not build yet
import { t } from 'react-intlayer';
import { z } from 'zod';

export const getChangePasswordSchema = () => {
  const requiredErrorPassword = t({
    en: 'Please enter your current password',
    fr: 'Veuillez saisir votre mot de passe actuel',
    es: 'Por favor, ingrese su contraseña actual',
  });

  const invalidTypeErrorPassword = t({
    en: 'Please enter a valid password',
    fr: 'Veuillez saisir un mot de passe valide',
    es: 'Por favor, ingrese una contraseña válida',
  });

  const invalidPasswordLengthError = t({
    en: 'Your password must be at least 8 characters',
    fr: 'Votre mot de passe doit comporter au moins 8 caractères',
    es: 'Su contraseña debe tener al menos 8 caracteres',
  });

  const requiredErrorNewPassword = t({
    en: 'Please enter your new password',
    fr: 'Veuillez saisir votre nouveau mot de passe',
    es: 'Por favor, ingrese su nueva contraseña',
  });

  const invalidTypeErrorNewPassword = t({
    en: 'Please enter a valid new password',
    fr: 'Veuillez saisir un nouveau mot de passe valide',
    es: 'Por favor, ingrese una nueva contraseña válida',
  });

  const requiredErrorNewPasswordConfirmation = t({
    en: 'Please enter your new password again',
    fr: 'Veuillez saisir votre nouveau mot de passe à nouveau',
    es: 'Por favor, ingrese su nueva contraseña nuevamente',
  });

  const invalidTypeErrorNewPasswordConfirmation = t({
    en: 'Please enter a valid new password again',
    es: 'Por favor, ingrese una nueva contraseña válida nuevamente',
    fr: 'Veuillez saisir un nouveau mot de passe valide à nouveau',
  });

  const passwordNotMatchError = t({
    en: 'New password and password confirmation must match',
    fr: 'Le nouveau mot de passe et la confirmation de mot de passe doivent correspondre',
    es: 'La nueva contraseña y la confirmación de la contraseña deben coincidir',
  });

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
  ReturnType<typeof getChangePasswordSchema>
>;
