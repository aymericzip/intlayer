import { t, type DeclarationContent } from 'intlayer';

export const dictionaryFieldEditorContent = {
  key: 'dictionary-field-editor',
  content: {
    returnToDictionaryList: {
      label: t({
        en: 'Return to dictionary list',
        fr: 'Retourner à la liste des dictionnaires',
        es: 'Volver a la lista de diccionarios',
      }),
    },
  },
} satisfies DeclarationContent;
