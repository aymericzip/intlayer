import { type Dictionary, t } from 'intlayer';

const pageContent = {
  key: 'page',
  content: {
    center: t({
      en: 'center.',
      es: 'centro.',
      fr: 'centre.',
    }),
    deployNow: t({
      en: 'Deploy Now',
      es: 'Desplegar ahora',
      fr: 'Déployer maintenant',
    }),
    description: t({
      en: 'Looking for a starting point or more instructions? Head over to',
      es: '¿Buscas un punto de partida o más instrucciones? Dirígete a',
      fr: "Vous cherchez un point de départ ou plus d'instructions ? Rendez-vous sur",
    }),
    documentation: t({
      en: 'Documentation',
      es: 'Documentación',
      fr: 'Documentation',
    }),
    learning: t({
      en: 'Learning',
      es: 'Aprendizaje',
      fr: 'Apprentissage',
    }),
    nextjsLogo: t({
      en: 'Next.js logo',
      es: 'Logo Next.js',
      fr: 'Logo Next.js',
    }),
    or: t({
      en: 'or the',
      es: 'o el',
      fr: 'ou le',
    }),
    templates: t({
      en: 'Templates',
      es: 'Plantillas',
      fr: 'Modèles',
    }),
    title: t({
      en: 'To get started, edit the page.tsx file.',
      es: 'Para empezar, edita el archivo page.tsx.',
      fr: 'Pour commencer, modifiez le fichier page.tsx.',
    }),
    vercelLogo: t({
      en: 'Vercel logomark',
      es: 'Logomark Vercel',
      fr: 'Logomark Vercel',
    }),
  },
} satisfies Dictionary;

export default pageContent;
