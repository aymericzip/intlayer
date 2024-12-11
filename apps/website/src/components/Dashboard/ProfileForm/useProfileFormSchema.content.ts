import { t, type DeclarationContent } from 'intlayer';

const content = {
  key: 'profile-form-schema',
  content: {
    requiredErrorName: t({
      en: 'Please enter your name',
      fr: 'Veuillez saisir votre nom d’utilisateur',
      es: 'Por favor, ingrese su nombre de usuario',
    }),

    invalidTypeErrorName: t({
      en: 'Please enter a valid username',
      fr: 'Veuillez saisir un nom d’utilisateur valide',
      es: 'Por favor, ingrese un nombre de usuario válido',
    }),
  },
} satisfies DeclarationContent;

export default content;
