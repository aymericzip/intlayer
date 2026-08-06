import { type Dictionary, t } from 'intlayer';

const navContent = {
  key: 'nav',
  content: {
    home: t({
      en: 'Home',
      fr: 'Accueil',
      es: 'Inicio',
    }),
    about: t({
      en: 'About',
      fr: 'À propos',
      es: 'Acerca de',
    }),
  },
} satisfies Dictionary;

export default navContent;
