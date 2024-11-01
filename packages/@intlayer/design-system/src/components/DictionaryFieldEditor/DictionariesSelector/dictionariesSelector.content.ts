import { t, type DeclarationContent } from 'intlayer';

export const dictionariesSelectorContent = {
  key: 'dictionaries-selector',
  content: {
    noDictionaryMessage: t({
      en: 'No dictionary',
      fr: 'Aucun dictionnaire',
      es: 'Sin diccionario',
    }),
    dictionaryNotFoundMessage: t({
      en: 'Dictionary not found',
      fr: 'Dictionnaire non trouvé',
      es: 'Diccionario no encontrado',
    }),
  },
} satisfies DeclarationContent;
