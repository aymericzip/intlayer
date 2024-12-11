import { DeclarationContent, t } from 'intlayer';

export const signInSchemaContent = {
  key: 'sign-in-schema',
  content: {
    requiredErrorEmail: t({
      en: 'Please enter your username',
      fr: 'Veuillez saisir votre nom d’utilisateur',
      es: 'Por favor, ingrese su nombre de usuario',
    }),

    invalidTypeErrorEmail: t({
      en: 'Please enter a valid username',
      fr: 'Veuillez saisir un nom d’utilisateur valide',
      es: 'Por favor, ingrese un nombre de usuario válido',
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
  },
} satisfies DeclarationContent;

export default signInSchemaContent;
