import { type Dictionary, t } from 'intlayer';

const localeSwitcherContent = {
  key: 'locale-switcher',
  content: {
    label: t({
      en: 'Change language',
      es: 'Cambiar idioma',
      fr: 'Changer de langue',
    }),
  },
} satisfies Dictionary;

export default localeSwitcherContent;
