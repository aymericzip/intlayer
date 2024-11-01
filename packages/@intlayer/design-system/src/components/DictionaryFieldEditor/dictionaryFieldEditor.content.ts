import { t, type DeclarationContent } from 'intlayer';

export const dictionaryFieldEditorContent = {
  key: 'dictionary-field-editor',
  content: {
    titleInformation: t({
      en: 'Dictionary informations',
      fr: 'Informations du dictionnaire',
      es: 'Información del diccionario',
    }),
    titleContent: t({
      en: 'Dictionary content',
      fr: 'Contenu du dictionnaire',
      es: 'Contenido del diccionario',
    }),
    returnToDictionaryList: {
      label: t({
        en: 'Return to dictionary list',
        fr: 'Retourner à la liste des dictionnaires',
        es: 'Volver a la lista de diccionarios',
      }),
      text: t({
        en: 'Dictionary list',
        fr: 'Liste des dictionnaires',
        es: 'Lista de diccionarios',
      }),
    },
  },
} satisfies DeclarationContent;
