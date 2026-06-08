import { type Dictionary, t } from 'intlayer';

const nextStepsContent = {
  key: 'next-steps',
  content: {
    docs: {
      title: t({
        en: 'Documentation',
        fr: 'Documentation',
        es: 'Documentación',
      }),
      subtitle: t({
        en: 'Your questions, answered',
        fr: 'Vos questions, répondues',
        es: 'Sus preguntas, respondidas',
      }),
      links: {
        exploreVite: t({
          en: 'Explore Vite',
          fr: 'Explorer Vite',
          es: 'Explorar Vite',
        }),
        learnTypeScript: t({
          en: 'Learn TypeScript',
          fr: 'Apprendre TypeScript',
          es: 'Aprender TypeScript',
        }),
      },
    },

    social: {
      title: t({
        en: 'Connect with us',
        fr: 'Connectez-vous avec nous',
        es: 'Conéctese con nosotros',
      }),
      subtitle: t({
        en: 'Join the Vite community',
        fr: 'Rejoignez la communauté Vite',
        es: 'Únase a la comunidad Vite',
      }),
      links: {
        github: 'GitHub',
        discord: 'Discord',
        twitter: 'X.com',
        bluesky: 'Bluesky',
      },
    },
  },
} satisfies Dictionary;

export default nextStepsContent;
