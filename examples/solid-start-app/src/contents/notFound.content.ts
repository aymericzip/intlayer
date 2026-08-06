import { type Dictionary, t } from 'intlayer';

const notFoundContent = {
  key: 'not-found-page',
  content: {
    title: t({
      en: 'Page Not Found',
      fr: 'Page introuvable',
      es: 'Página no encontrada',
    }),
    metaTitle: t({
      en: 'Not Found',
      fr: 'Introuvable',
      es: 'No encontrada',
    }),
    backHome: t({
      en: 'Back to home',
      fr: 'Retour à l’accueil',
      es: 'Volver al inicio',
    }),
  },
} satisfies Dictionary;

export default notFoundContent;
