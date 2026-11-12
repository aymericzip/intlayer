import { type Dictionary, t } from 'intlayer';

const notFoundContent = {
  key: 'not-found-page',
  content: {
    backHome: t({
      en: 'Back to home',
      es: 'Volver al inicio',
      fr: 'Retour à l’accueil',
    }),
    metaTitle: t({
      en: 'Not Found',
      es: 'No encontrada',
      fr: 'Introuvable',
    }),
    title: t({
      en: 'Page Not Found',
      es: 'Página no encontrada',
      fr: 'Page introuvable',
    }),
  },
} satisfies Dictionary;

export default notFoundContent;
