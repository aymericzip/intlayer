import { type Dictionary, t } from 'intlayer';

const aboutContent = {
  key: 'about-page',
  content: {
    title: t({
      en: 'About',
      fr: 'À propos',
      es: 'Acerca de',
    }),
    metaTitle: t({
      en: 'About | SolidStart + Intlayer',
      fr: 'À propos | SolidStart + Intlayer',
      es: 'Acerca de | SolidStart + Intlayer',
    }),
    metaDescription: t({
      en: 'Learn more about this internationalized SolidStart application.',
      fr: 'En savoir plus sur cette application SolidStart internationalisée.',
      es: 'Conoce más sobre esta aplicación SolidStart internacionalizada.',
    }),
    description: t({
      en: 'This page is rendered on the server in the locale detected from the URL.',
      fr: 'Cette page est rendue sur le serveur dans la locale détectée depuis l’URL.',
      es: 'Esta página se renderiza en el servidor en la locale detectada desde la URL.',
    }),
  },
} satisfies Dictionary;

export default aboutContent;
