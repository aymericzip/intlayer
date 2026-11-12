import { type Dictionary, t } from 'intlayer';

const navContent = {
  key: 'nav',
  content: {
    about: t({
      en: 'About',
      es: 'Acerca de',
      fr: 'À propos',
    }),
    home: t({
      en: 'Home',
      es: 'Inicio',
      fr: 'Accueil',
    }),
  },
} satisfies Dictionary;

export default navContent;
