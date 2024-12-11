import { DeclarationContent, t } from 'intlayer';

export const signUpSchemaContent = {
  key: 'sign-up-schema',
  content: {
    requiredErrorEmail: t({
      en: 'Please enter your email address',
      fr: 'Veuillez saisir votre adresse e-mail',
      es: 'Por favor, ingrese su dirección de correo electrónico',
    }),

    invalidTypeErrorEmail: t({
      en: 'Please enter a valid email address',
      fr: 'Veuillez saisir une adresse e-mail valide',
      es: 'Por favor, ingrese una dirección de correo electrónico válida',
    }),

    requiredErrorPassword: t({
      en: 'Please enter your password',
      fr: 'Veuillez saisir votre mot de passe',
      es: 'Por favor, ingrese su contraseña',
    }),

    invalidTypeErrorPassword: t({
      en: 'Please enter a valid password',
      fr: 'Veuillez saisir un mot de passe valide',
      es: 'Por favor, ingrese una contraseña válida',
    }),

    requiredErrorPasswordConfirmation: t({
      en: 'Please enter your password again',
      fr: 'Veuillez saisir votre mot de passe à nouveau',
      es: 'Por favor, ingrese su contraseña nuevamente',
    }),

    invalidTypeErrorPasswordConfirmation: t({
      en: 'Please enter a valid password',
      fr: 'Veuillez saisir un mot de passe valide',
      es: 'Por favor, ingrese una contraseña válida',
    }),

    passwordNotMatchError: t({
      en: 'Password and password confirmation must match',
      fr: 'Le mot de passe et la confirmation de mot de passe doivent correspondre',
      es: 'La contraseña y la confirmación de la contraseña deben coincidir',
    }),
  },
} satisfies DeclarationContent;

export default signUpSchemaContent;
