import { type Dictionary, t } from 'intlayer';

const langSwitcherContent = {
  key: 'lang-switcher',
  content: {
    langButtonLabel: t({
      en: 'Switch to ',
      es: 'Cambiar a ',
      fr: 'Passer à ',
    }),
    langSwitcherLabel: t({
      en: 'Lang selector',
      es: 'Selector de idioma',
      fr: 'Sélecteur de langue',
    }),
    title: t({
      en: 'Change locale ⬍',
      es: 'Cambiar de idioma ⬍',
      fr: 'Changer de langue ⬍',
    }),
  },
  id: '696bd486200a5ac2eabb8d2e',
} satisfies Dictionary;

export default langSwitcherContent;
