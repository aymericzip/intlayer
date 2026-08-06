import { type Dictionary, t } from 'intlayer';

const localeSwitcherContent = {
  key: 'locale-switcher',
  content: {
    label: t({
      en: 'Change language',
      fr: 'Changer de langue',
      es: 'Cambiar idioma',
    }),
  },
} satisfies Dictionary;

export default localeSwitcherContent;
