import { t, type ContentModule } from 'intlayer';

const langSwitcherContent: ContentModule = {
  id: 'lang-switcher',
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
};

export default langSwitcherContent;
