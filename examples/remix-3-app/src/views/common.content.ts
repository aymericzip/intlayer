import { type Dictionary, t } from 'intlayer';

const commonContent = {
  key: 'common',
  content: {
    appName: t({
      en: 'Remix 3 + Intlayer',
      fr: 'Remix 3 + Intlayer',
      es: 'Remix 3 + Intlayer',
    }),
    nav: {
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
      api: t({
        en: 'API Demo',
        fr: 'Démo API',
        es: 'Demostración API',
      }),
    },
    switchLanguage: t({
      en: 'Switch language:',
      fr: 'Changer de langue :',
      es: 'Cambiar idioma:',
    }),
    footer: t({
      en: 'Built with Remix 3 and Intlayer internationalization.',
      fr: 'Construit avec Remix 3 et l’internationalisation Intlayer.',
      es: 'Construido con Remix 3 y la internacionalización de Intlayer.',
    }),
  },
} satisfies Dictionary;

export default commonContent;
