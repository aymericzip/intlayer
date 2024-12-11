import { t, type DeclarationContent } from 'intlayer';

const dictionaryEditionDrawerContent = {
  key: 'dictionary-edition-drawer',
  content: {
    backButtonText: t({
      en: 'Dictionary list',
      fr: 'Liste des dictionnaires',
      es: 'Lista de diccionarios',
    }),
  },
} satisfies DeclarationContent;

export default dictionaryEditionDrawerContent;
