import { t, type DeclarationContent } from 'intlayer';

export const nodeWrapperContent = {
  id: 'node-wrapper',
  tsxNotEditable: t({
    en: 'React node not editable',
    fr: 'Node React non éditable',
    es: 'Nodo React no editable',
  }),
  goToField: {
    label: t({
      en: 'Go to field',
      fr: 'Aller au champ',
      es: 'Ir al campo',
    }),
  },
  addNewField: {
    label: t({
      en: 'Click to add field',
      fr: 'Cliquez pour ajouter un champ',
      es: 'Haga clic para agregar un campo',
    }),
    text: t({
      en: 'Add new field',
      fr: 'Ajouter un nouveau champ',
      es: 'Agregar nuevo campo',
    }),
  },
  goToElement: {
    label: t({
      en: 'Go to element',
      fr: "Aller à l'élément",
      es: 'Ir al elemento',
    }),
  },
  addNewElement: {
    label: t({
      en: 'Click to add element',
      fr: 'Cliquez pour ajouter un élément',
      es: 'Haga clic para agregar un elemento',
    }),
    text: t({
      en: 'Add new element',
      fr: 'Ajouter un nouvel élément',
      es: 'Agregar nuevo elemento',
    }),
  },
  goToTranslation: {
    label: t({
      en: 'Go to translation',
      fr: 'Aller à la traduction',
      es: 'Ir a la traducción',
    }),
  },
  addNewTranslation: {
    label: t({
      en: 'Click to add translation',
      fr: 'Cliquez pour ajouter une traduction',
      es: 'Haga clic para agregar una traducción',
    }),
    text: t({
      en: 'Add new translation',
      fr: 'Ajouter une nouvelle traduction',
      es: 'Agregar nueva traducción',
    }),
  },
  goToEnumeration: {
    label: t({
      en: 'Go to enumeration',
      fr: "Aller à l'énumération",
      es: 'Ir a la enumeración',
    }),
  },
  addNewEnumeration: {
    label: t({
      en: 'Click to add enumeration',
      fr: 'Cliquez pour ajouter une énumération',
      es: 'Haga clic para agregar una enumeración',
    }),
    text: t({
      en: 'Add new enumeration',
      fr: 'Ajouter une nouvelle énumération',
      es: 'Agregar nueva enumeración',
    }),
  },
} satisfies DeclarationContent;
