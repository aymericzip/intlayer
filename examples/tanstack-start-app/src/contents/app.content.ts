import type { Dictionary } from 'intlayer';

import { t } from 'intlayer';

const appContent = {
  content: {
    links: {
      about: t({
        en: 'About',
        es: 'Acerca de',
        fr: 'À propos',
      }),
      home: t({
        en: 'Home',
        es: 'Inicio',
        fr: 'Accueil',
      }),
    },
    meta: {
      description: t({
        en: 'This is an example of using Intlayer with TanStack Router',
        es: 'Este es un ejemplo de uso de Intlayer con TanStack Router',
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      en: 'Welcome to Intlayer + TanStack Router',
      es: 'Bienvenido a Intlayer + TanStack Router',
      fr: 'Bienvenue à Intlayer + TanStack Router',
    }),
  },
  key: 'app',
} satisfies Dictionary;

export default appContent;
