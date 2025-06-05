import { t, type Dictionary } from 'intlayer';

const langSwitcherContent = {
  key: 'lang-switcher',
  content: {
    langSwitcherLabel: t({
      en: 'Lang selector',
      es: 'Selector de idioma',
      fr: 'Sélecteur de langue',
    }),
    langButtonLabel: t({
      en: 'Switch to ',
      es: 'Cambiar a ',
      fr: 'Passer à ',
    }),
  },
} satisfies Dictionary;

export default langSwitcherContent;
