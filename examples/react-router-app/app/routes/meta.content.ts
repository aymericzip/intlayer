import { type Dictionary, t } from 'intlayer';

const metaContent = {
  content: {
    description: t({
      en: 'This is the home page description.',
      es: 'Esta es la descripción de la página de inicio.',
      fr: "Ceci est la description de la page d'accueil.",
    }),
    title: t({
      en: 'Home',
      es: 'Inicio',
      fr: 'Accueil',
    }),
  },
  key: 'page-meta',
} satisfies Dictionary;

export default metaContent;
