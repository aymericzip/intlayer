import { type DeclarationContent, t } from 'intlayer';

const notFountContent = {
  key: 'not-found',
  content: {
    title: t({
      en: '404 - Page not found',
      fr: '404 - Page non trouvée',
      es: '404 - Página no encontrada',
    }),
    content: t({
      en: 'Page not found',
      fr: 'Page non trouvée',
      es: 'Página no encontrada',
    }),
  },
} satisfies DeclarationContent;

export default notFountContent;
