import { type Dictionary, t } from 'intlayer';

const pageContent = {
  key: 'page',
  content: {
    title: t({
      en: 'To get started, edit the page.tsx file.',
      fr: 'Pour commencer, modifiez le fichier page.tsx.',
      es: 'Para empezar, edita el archivo page.tsx.',
    }),
    description: t({
      en: 'Looking for a starting point or more instructions? Head over to',
      fr: "Vous cherchez un point de départ ou plus d'instructions ? Rendez-vous sur",
      es: '¿Buscas un punto de partida o más instrucciones? Dirígete a',
    }),
    templates: t({
      en: 'Templates',
      fr: 'Modèles',
      es: 'Plantillas',
    }),
    or: t({
      en: 'or the',
      fr: 'ou le',
      es: 'o el',
    }),
    learning: t({
      en: 'Learning',
      fr: 'Apprentissage',
      es: 'Aprendizaje',
    }),
    center: t({
      en: 'center.',
      fr: 'centre.',
      es: 'centro.',
    }),
    deployNow: t({
      en: 'Deploy Now',
      fr: 'Déployer maintenant',
      es: 'Desplegar ahora',
    }),
    documentation: t({
      en: 'Documentation',
      fr: 'Documentation',
      es: 'Documentación',
    }),
    nextjsLogo: t({
      en: 'Next.js logo',
      fr: 'Logo Next.js',
      es: 'Logo Next.js',
    }),
    vercelLogo: t({
      en: 'Vercel logomark',
      fr: 'Logomark Vercel',
      es: 'Logomark Vercel',
    }),
  },
} satisfies Dictionary;

export default pageContent;
