import { type Dictionary, t } from 'intlayer';

const langSwitcherContent = {
  key: 'lang-switcher',
  content: {
    title: t({
      en: 'Change locale ⬍',
      fr: 'Changer de langue ⬍',
      es: 'Cambiar de idioma ⬍',
    }),
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
  id: '696bd486200a5ac2eabb8d2e',
} satisfies Dictionary;

export default langSwitcherContent;
