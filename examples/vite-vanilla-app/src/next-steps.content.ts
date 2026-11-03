import { type Dictionary, t } from 'intlayer';

const nextStepsContent = {
  key: 'next-steps',
  content: {
    docs: {
      links: {
        exploreVite: t({
          en: 'Explore Vite',
          es: 'Explorar Vite',
          fr: 'Explorer Vite',
        }),
        learnTypeScript: t({
          en: 'Learn TypeScript',
          es: 'Aprender TypeScript',
          fr: 'Apprendre TypeScript',
        }),
      },
      subtitle: t({
        en: 'Your questions, answered',
        es: 'Sus preguntas, respondidas',
        fr: 'Vos questions, répondues',
      }),
      title: t({
        en: 'Documentation',
        es: 'Documentación',
        fr: 'Documentation',
      }),
    },

    social: {
      links: {
        bluesky: 'Bluesky',
        discord: 'Discord',
        github: 'GitHub',
        twitter: 'X.com',
      },
      subtitle: t({
        en: 'Join the Vite community',
        es: 'Únase a la comunidad Vite',
        fr: 'Rejoignez la communauté Vite',
      }),
      title: t({
        en: 'Connect with us',
        es: 'Conéctese con nosotros',
        fr: 'Connectez-vous avec nous',
      }),
    },
  },
} satisfies Dictionary;

export default nextStepsContent;
