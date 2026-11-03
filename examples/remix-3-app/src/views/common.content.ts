import { type Dictionary, t } from 'intlayer';

const commonContent = {
  key: 'common',
  content: {
    appName: 'Remix 3 + Intlayer',
    footer: t({
      en: 'Built with Remix 3 and Intlayer internationalization.',
      es: 'Construido con Remix 3 y la internacionalización de Intlayer.',
      fr: 'Construit avec Remix 3 et l’internationalisation Intlayer.',
    }),
    nav: {
      about: t({
        en: 'About',
        es: 'Acerca de',
        fr: 'À propos',
      }),
      api: t({
        en: 'API Demo',
        es: 'Demostración API',
        fr: 'Démo API',
      }),
      home: t({
        en: 'Home',
        es: 'Inicio',
        fr: 'Accueil',
      }),
    },
    switchLanguage: t({
      en: 'Switch language:',
      es: 'Cambiar idioma:',
      fr: 'Changer de langue :',
    }),
  },
} satisfies Dictionary;

export default commonContent;
