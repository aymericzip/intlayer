import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'home-page',
  content: {
    documentation: t({
      en: 'Visit start.solidjs.com to learn how to build SolidStart apps.',
      es: 'Visita start.solidjs.com para aprender a crear aplicaciones SolidStart.',
      fr: 'Visitez start.solidjs.com pour apprendre à créer des applications SolidStart.',
    }),
    metaDescription: t({
      en: 'A SolidStart application internationalized with Intlayer.',
      es: 'Una aplicación SolidStart internacionalizada con Intlayer.',
      fr: 'Une application SolidStart internationalisée avec Intlayer.',
    }),
    metaTitle: 'SolidStart + Intlayer',
    title: t({
      en: 'Hello world!',
      es: '¡Hola mundo!',
      fr: 'Bonjour le monde !',
    }),
  },
} satisfies Dictionary;

export default homeContent;
