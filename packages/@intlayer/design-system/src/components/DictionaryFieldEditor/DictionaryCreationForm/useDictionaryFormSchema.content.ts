import { DeclarationContent, t } from 'intlayer';

export const dictionaryFormSchemaContent = {
  key: 'dictionary-form-schema',
  content: {
    requiredErrorName: t({
      en: 'Please enter a key for your dictionary',
      fr: 'Veuillez saisir une clef pour votre dictionaire',
      es: 'Por favor, ingrese un clave para su diccionario',
    }),

    invalidTypeErrorName: t({
      en: 'Please enter a valid key for your dictionary',
      fr: 'Veuillez saisir une clée valide pour votre dictionaire',
      es: 'Por favor, ingrese un clave válido para su diccionario',
    }),

    requiredErrorProjectId: t({
      en: 'Please select a project',
      fr: 'Veuillez sélectionner un projet',
      es: 'Por favor, seleccione un proyecto',
    }),

    invalidTypeErrorProjectId: t({
      en: 'Please select a valid project',
      fr: 'Veuillez sélectionner un projet valide',
      es: 'Por favor, seleccione un proyecto válido',
    }),
  },
} satisfies DeclarationContent;

export default dictionaryFormSchemaContent;
