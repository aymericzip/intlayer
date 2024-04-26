import { t, type ContentModule, type IConfigLocales } from 'intlayer';

export const test1: IConfigLocales<string> = {
  en: '',
  es: '',
  fr: '',
};

const pageContent: ContentModule = {
  id: 'page',

  getStarted: {
    main: t({
      en: 'Get started by editing',
      fr: 'Commencez par éditer',
      es: 'Comience por editar',
      // ru: 'Начните с редактирования',
      // rooou: 'Начните с редактирования',
    }),
    pageLink: 'src/app/page.tsx',
  },

  byVersel: t({
    en: 'By',
    fr: 'Par',
    es: 'Por',
  }),

  docs: {
    title: 'Docs',
    detail: t({
      en: 'Find in-depth information about Next.js features and API.',
      fr: "Trouvez des informations détaillées sur les fonctionnalités et l'API de Next.js.",
      es: 'Encuentre información detallada sobre las funciones y la API de Next.js.',
    }),
  },

  learn: {
    title: t({
      en: 'Learn',
      fr: 'Apprendre',
      es: 'Aprender',
    }),
    detail: t({
      en: 'Learn about Next.js in an interactive course with quizzes!',
      fr: 'Apprenez Next.js dans un cours interactif avec des quiz!',
      es: '¡Aprende sobre Next.js en un curso interactivo con cuestionarios!',
    }),
  },

  templates: {
    title: t({
      en: 'Templates',
      fr: 'Modèles',
      es: 'Plantillas',
    }),
    detail: t({
      en: 'Explore starter templates for Next.js.',
      fr: 'Explorez les modèles de départ pour Next.js.',
      es: 'Explore plantillas de inicio para Next.js.',
    }),
  },

  deploy: {
    title: t({
      en: 'Deploy',
      fr: 'Déployer',
      es: 'Desplegar',
    }),
    detail: t({
      en: 'Instantly deploy your Next.js site to a shareable URL with Vercel.',
      fr: 'Déployez instantanément votre site Next.js sur une URL partageable avec Vercel.',
      es: 'Implemente instantáneamente su sitio Next.js en una URL compartible con Vercel.',
    }),
  },
};

export default pageContent;
