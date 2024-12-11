import { t, type DeclarationContent } from 'intlayer';

const content = {
  key: 'project-form-schema',
  content: {
    requiredErrorName: t({
      en: 'Please enter a name for your project',
      fr: 'Veuillez saisir un nom pour votre projet',
      es: 'Por favor, ingrese un nombre para su proyecto',
    }),

    invalidTypeErrorName: t({
      en: 'Please enter a valid name for your project',
      fr: 'Veuillez saisir un nom valide pour votre projet',
      es: 'Por favor, ingrese un nombre válido para su proyecto',
    }),
  },
} satisfies DeclarationContent;

export default content;
