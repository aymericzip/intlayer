import { type Dictionary, t } from 'intlayer';

const pageContent = {
  key: 'page',
  content: {
    byVersel: t({
      en: 'By',
      es: 'Por',
      fr: 'Par',
    }),
    deploy: {
      detail: t({
        en: 'Instantly deploy your Next.js site to a shareable URL with Vercel.',
        es: 'Implemente instantáneamente su sitio Next.js en una URL compartible con Vercel.',
        fr: 'Déployez instantanément votre site Next.js sur une URL partageable avec Vercel.',
      }),
      title: t({
        en: 'Deploy',
        es: 'Desplegar',
        fr: 'Déployer',
      }),
    },
    docs: {
      detail: t({
        en: 'Find in-depth information about Next.js features and API.',
        es: 'Encuentre información detallada sobre las funciones y la API de Next.js.',
        fr: "Trouvez des informations détaillées sur les fonctionnalités et l'API de Next.js.",
      }),
      title: 'Docs',
    },
    getStarted: {
      main: t({
        en: 'Get started by editing',
        es: 'Comience por editar',
        // ru: 'Начните с редактирования',
        // rooou: 'Начните с редактирования',
        fr: 'Commencez par éditer',
      }),
      pageLink: 'src/app/page.tsx',
    },
    learn: {
      detail: t({
        en: 'Learn about Next.js in an interactive course with quizzes!',
        es: '¡Aprende sobre Next.js en un curso interactivo con cuestionarios!',
        fr: 'Apprenez Next.js dans un cours interactif avec des quiz!',
      }),
      title: t({
        en: 'Learn',
        es: 'Aprender',
        fr: 'Apprendre',
      }),
    },
    templates: {
      detail: t({
        en: 'Explore starter templates for Next.js.',
        es: 'Explore plantillas de inicio para Next.js.',
        fr: 'Explorez les modèles de départ pour Next.js.',
      }),
      title: t({
        en: 'Templates',
        es: 'Plantillas',
        fr: 'Modèles',
      }),
    },
  },
} satisfies Dictionary;

export default pageContent;
