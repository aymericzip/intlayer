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
        en: 'This is the about page of the Intlayer + TanStack Router example',
        es: 'Esta es la página de acerca de del ejemplo Intlayer + TanStack Router',
        fr: "Ceci est la page à propos de l'exemple Intlayer + TanStack Router",
      }),
    },
    title: t({
      en: 'About Us',
      es: 'Acerca de Nosotros',
      fr: 'À Propos de Nous',
    }),
  },
  key: 'about',
} satisfies Dictionary;

export default appContent;
