import { t, type DeclarationContent } from 'intlayer';

export const nodeTypeSelectorContent = {
  key: 'node-type-selector',
  content: {
    triggerPlaceHolder: t({
      en: 'Node type',
      fr: 'Type du Nœud',
      es: 'Typo del nodo',
    }),
    multilingualText: t({
      en: 'Multilingual Text',
      fr: 'Texte multilingue',
      es: 'Texto multilingüe',
    }),
    text: t({
      en: 'Text',
      fr: 'Texte',
      es: 'Texto',
    }),
    node: t({
      en: 'Node',
      fr: 'Nœud',
      es: 'Nodo',
    }),
    array: t({
      en: 'Array',
      fr: 'Tableau',
      es: 'Matriz',
    }),
    enumeration: t({
      en: 'Enumeration',
      fr: 'Énumération',
      es: 'Enumeración',
    }),
  },
} satisfies DeclarationContent;
