import { t, type DeclarationContent } from 'intlayer';

const content = {
  key: 'define-password-schema',
  content: {
    requiredErrorPassword: t({
      en: 'Please enter your current password',
      fr: 'Veuillez saisir votre mot de passe actuel',
      es: 'Por favor, ingrese su contraseña actual',
    }),

    invalidTypeErrorPassword: t({
      en: 'Please enter a valid password',
      fr: 'Veuillez saisir un mot de passe valide',
      es: 'Por favor, ingrese una contraseña válida',
    }),

    invalidPasswordLengthError: t({
      en: 'Your password must be at least 8 characters',
      fr: 'Votre mot de passe doit comporter au moins 8 caractères',
      es: 'Su contraseña debe tener al menos 8 caracteres',
    }),

    requiredErrorNewPassword: t({
      en: 'Please enter your new password',
      fr: 'Veuillez saisir votre nouveau mot de passe',
      es: 'Por favor, ingrese su nueva contraseña',
    }),

    invalidTypeErrorNewPassword: t({
      en: 'Please enter a valid new password',
      fr: 'Veuillez saisir un nouveau mot de passe valide',
      es: 'Por favor, ingrese una nueva contraseña válida',
    }),

    requiredErrorNewPasswordConfirmation: t({
      en: 'Please enter your new password again',
      fr: 'Veuillez saisir votre nouveau mot de passe à nouveau',
      es: 'Por favor, ingrese su nueva contraseña nuevamente',
    }),

    invalidTypeErrorNewPasswordConfirmation: t({
      en: 'Please enter a valid new password again',
      es: 'Por favor, ingrese una nueva contraseña válida nuevamente',
      fr: 'Veuillez saisir un nouveau mot de passe valide à nouveau',
    }),

    passwordNotMatchError: t({
      en: 'New password and password confirmation must match',
      fr: 'Le nouveau mot de passe et la confirmation de mot de passe doivent correspondre',
      es: 'La nueva contraseña y la confirmación de la contraseña deben coincidir',
    }),
  },
} satisfies DeclarationContent;

export default content;
