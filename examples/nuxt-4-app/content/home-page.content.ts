import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'home-page',
  content: {
    title: t({
      en: 'Hello world',
      fr: 'Bonjour le monde',
      es: 'Hola mundo',
    }),
    metaTitle: t({
      en: 'Welcome | My Application',
      fr: 'Bienvenue | Mon Application',
      es: 'Bienvenido | Mi Aplicación',
    }),
    metaDescription: t({
      en: 'Discover your multilingual Nuxt app homepage powered by Intlayer.',
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: 'Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.',
    }),
  },
} satisfies Dictionary;

export default content;
