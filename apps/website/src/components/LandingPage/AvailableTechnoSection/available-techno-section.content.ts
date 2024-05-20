import { t, type DeclarationContent } from 'intlayer';

const availableTechnoContent: DeclarationContent = {
  id: 'available-techno-section',
  text: t({
    en: 'Available on',
    fr: 'Disponible sur',
    es: 'Disponible en',
  }),
  react: {
    label: t({
      en: 'Go to ReactJS official website',
      fr: 'Aller sur le site officiel de ReactJS',
      es: 'Ir al sitio web oficial de ReactJS',
    }),
  },
  nextjs: {
    label: t({
      en: 'Go to NextJS official website',
      fr: 'Aller sur le site officiel de NextJS',
      es: 'Ir al sitio web oficial de NextJS',
    }),
  },
  vite: {
    label: t({
      en: 'Go to ViteJS official website',
      fr: 'Aller sur le site officiel de ViteJS',
      es: 'Ir al sitio web oficial de ViteJS',
    }),
  },
};

export default availableTechnoContent;
