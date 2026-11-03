import { type Dictionary, t } from 'intlayer';

const content = {
  key: 'home-page',
  content: {
    metaDescription: t({
      en: 'Discover your multilingual Nuxt app homepage powered by Intlayer.',
      es: 'Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.',
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
    }),
    metaTitle: t({
      en: 'Welcome | My Application',
      es: 'Bienvenido | Mi Aplicación',
      fr: 'Bienvenue | Mon Application',
    }),
    title: t({
      en: 'Hello world',
      es: 'Hola mundo',
      fr: 'Bonjour le monde',
    }),
  },
} satisfies Dictionary;

export default content;
