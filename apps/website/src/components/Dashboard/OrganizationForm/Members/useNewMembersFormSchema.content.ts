import { t, type DeclarationContent } from 'intlayer';

const content = {
  key: 'new-members-form-schema',
  content: {
    emailError: t({
      en: 'Please enter a valid email address',
      fr: 'Veuillez entrer une adresse email valide',
      es: 'Por favor, introduzca una dirección de correo electrónico válida',
    }),
  },
} satisfies DeclarationContent;

export default content;
