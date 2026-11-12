import { type Dictionary, t } from 'intlayer';

const aboutContent = {
  key: 'about-page',
  content: {
    description: t({
      en: 'This page is rendered on the server in the locale detected from the URL.',
      es: 'Esta página se renderiza en el servidor en la locale detectada desde la URL.',
      fr: 'Cette page est rendue sur le serveur dans la locale détectée depuis l’URL.',
    }),
    metaDescription: t({
      en: 'Learn more about this internationalized SolidStart application.',
      es: 'Conoce más sobre esta aplicación SolidStart internacionalizada.',
      fr: 'En savoir plus sur cette application SolidStart internationalisée.',
    }),
    metaTitle: t({
      en: 'About | SolidStart + Intlayer',
      es: 'Acerca de | SolidStart + Intlayer',
      fr: 'À propos | SolidStart + Intlayer',
    }),
    title: t({
      en: 'About',
      es: 'Acerca de',
      fr: 'À propos',
    }),
  },
} satisfies Dictionary;

export default aboutContent;
