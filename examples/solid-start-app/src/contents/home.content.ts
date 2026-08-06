import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'home-page',
  content: {
    title: t({
      en: 'Hello world!',
      fr: 'Bonjour le monde !',
      es: '¡Hola mundo!',
    }),
    metaTitle: 'SolidStart + Intlayer',
    metaDescription: t({
      en: 'A SolidStart application internationalized with Intlayer.',
      fr: 'Une application SolidStart internationalisée avec Intlayer.',
      es: 'Una aplicación SolidStart internacionalizada con Intlayer.',
    }),
    documentation: t({
      en: 'Visit start.solidjs.com to learn how to build SolidStart apps.',
      fr: 'Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.',
      es: 'Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.',
    }),
  },
} satisfies Dictionary;

export default homeContent;
