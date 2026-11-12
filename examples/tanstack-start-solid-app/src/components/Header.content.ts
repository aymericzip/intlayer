import { type Dictionary, t } from 'intlayer';

const headerContent = {
  key: 'header',
  content: {
    intlayer: 'Intlayer',
    navAbout: t({ en: 'About', es: 'Acerca de', fr: 'À propos' }),
    navDocs: t({ en: 'Docs', es: 'Documentación', fr: 'Documentation' }),
    navHome: t({ en: 'Home', es: 'Inicio', fr: 'Accueil' }),
    tanstack: 'TanStack Start',
  },
} satisfies Dictionary;

export default headerContent;
