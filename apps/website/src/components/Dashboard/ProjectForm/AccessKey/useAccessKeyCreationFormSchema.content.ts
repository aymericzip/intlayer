import { t, type DeclarationContent } from 'intlayer';

const content = {
  key: 'access-key-creation-form-schema',
  content: {
    requiredErrorName: t({
      en: 'Please enter a name for your access key',
      fr: "Veuillez saisir un nom pour votre clé d'accès",
      es: 'Por favor, ingrese un nombre para su clave de acceso',
    }),

    invalidTypeErrorName: t({
      en: 'Please enter a valid name for your access key',
      fr: "Veuillez saisir un nom valide pour votre clé d'accès",
      es: 'Por favor, ingrese un nombre válido para su clave de acceso',
    }),

    invalidDateErrorName: t({
      en: 'Please enter a valid date for your access key expiration date',
      fr: "Veuillez saisir une date valide pour la date d'expiration de votre clé d'accès",
      es: 'Por favor, ingrese una fecha válida para la fecha de expiración de su clave de acceso',
    }),
  },
} satisfies DeclarationContent;

export default content;
