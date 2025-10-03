import { type Dictionary, t } from 'intlayer';

const appContent = {
  content: {
    about: t({
      en: 'About',
      es: 'Acerca de',
      fr: 'À propos',
    }),
    greeting: t({
      en: 'Hello World',
      es: 'Hola Mundo',
      fr: 'Bonjour le monde',
    }),
    home: t({
      en: 'Home',
      es: 'Inicio',
      fr: 'Accueil',
    }),
  },
  key: 'page',
} satisfies Dictionary;

export default appContent;
