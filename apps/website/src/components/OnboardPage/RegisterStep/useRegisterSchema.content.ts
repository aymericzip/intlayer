import { t, type DeclarationContent } from 'intlayer';

const content = {
  key: 'register-password-schema',
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
  },
} satisfies DeclarationContent;

export default content;
