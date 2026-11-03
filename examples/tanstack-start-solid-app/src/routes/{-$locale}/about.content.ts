import { type Dictionary, t } from 'intlayer';

const aboutContent = {
  key: 'about-page',
  content: {
    desc: t({
      en: 'TanStack Start gives you type-safe routing, server functions, and modern SSR defaults. Use this as a clean foundation, then layer in your own routes, styling, and add-ons.',
      es: 'TanStack Start te ofrece enrutamiento tipado, funciones del servidor y valores SSR modernos. Úsalo como una base limpia, luego agrega tus propias rutas, estilos y complementos.',
      fr: 'TanStack Start vous offre un routage typé, des fonctions serveur et des valeurs SSR modernes. Utilisez-le comme une base propre, puis ajoutez vos propres routes, styles et extensions.',
    }),
    kicker: t({ en: 'About', es: 'Acerca de', fr: 'À propos' }),
    title: t({
      en: 'A small starter with room to grow.',
      es: 'Un starter pequeño con espacio para crecer.',
      fr: 'Un modèle léger avec de la place pour grandir.',
    }),
  },
} satisfies Dictionary;

export default aboutContent;
