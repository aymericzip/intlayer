import { t, type DeclarationContent } from 'intlayer';

const content = {
  key: 'organization-form-schema',
  content: {
    requiredErrorName: t({
      en: 'Please enter a name for your organization',
      fr: 'Veuillez saisir un nom pour votre organisation',
      es: 'Por favor, ingrese un nombre para su organización',
    }),

    invalidTypeErrorName: t({
      en: 'Please enter a valid name for your organization',
      fr: 'Veuillez saisir un nom valide pour votre organisation',
      es: 'Por favor, ingrese un nombre válido para su organización',
    }),
  },
} satisfies DeclarationContent;
export default content;
