import { t, type DeclarationContent } from 'intlayer';

export const useDictionaryDetailsSchemaContent = {
  key: 'dictionary-detail-schema',
  content: {
    titleRequiredError: t({
      en: 'Please enter a name for your organization.',
      fr: 'Veuillez saisir un nom pour votre organisation.',
      es: 'Por favor, ingrese un nombre para su organización.',
    }),

    titleInvalidTypeError: t({
      en: 'The organization name must be a valid string.',
      fr: 'Le nom de votre organisation doit être une chaîne valide.',
      es: 'El nombre de su organización debe ser una cadena válida.',
    }),

    titleMinLengthError: t({
      en: 'The organization name must be at least 4 characters long.',
      fr: 'Le nom de votre organisation doit comporter au moins 4 caractères.',
      es: 'El nombre de su organización debe tener al menos 4 caracteres.',
    }),

    keyRequiredError: t({
      en: 'Please enter a key for your organization.',
      fr: 'Veuillez saisir une clé pour votre organisation.',
      es: 'Por favor, ingrese una clave para su organización.',
    }),

    keyInvalidTypeError: t({
      en: 'The key must be a valid string.',
      fr: 'La clé doit être une chaîne valide.',
      es: 'La clave debe ser una cadena válida.',
    }),

    keySpaceError: t({
      en: 'The key cannot contain spaces or special characters.',
      fr: "La clé ne peut pas contenir d'espaces ou de caractères spéciaux.",
      es: 'La clave no puede contener espacios o caracteres especiales.',
    }),

    keyMinLengthError: t({
      en: 'The key must be at least 4 characters long.',
      fr: 'La clé doit comporter au moins 4 caractères.',
      es: 'La clave debe tener al menos 4 caracteres.',
    }),

    // Description Field Error Messages
    descriptionRequiredError: t({
      en: 'Please enter a description for your organization.',
      fr: 'Veuillez saisir une description pour votre organisation.',
      es: 'Por favor, ingrese una descripción para su organización.',
    }),

    descriptionInvalidTypeError: t({
      en: 'The description must be a valid string.',
      fr: 'La description doit être une chaîne valide.',
      es: 'La descripción debe ser una cadena válida.',
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
