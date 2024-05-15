import { t, type DeclarationContent } from 'intlayer';
import { ExternalLinks } from '@/Routes';

const availableTechnoContent: DeclarationContent = {
  id: 'available-techno-section',
  text: t({
    en: 'Available on',
    fr: 'Disponible sur',
    es: 'Disponible en',
  }),
  react: {
    href: ExternalLinks.IntlayerWithReact,
    label: t({
      en: 'Go to ReactJS official website',
      fr: 'Aller sur le site officiel de ReactJS',
      es: 'Ir al sitio web oficial de ReactJS',
    }),
  },
  nextjs: {
    href: ExternalLinks.IntlayerWithNextjs,
    label: t({
      en: 'Go to NextJS official website',
      fr: 'Aller sur le site officiel de NextJS',
      es: 'Ir al sitio web oficial de NextJS',
    }),
  },
  vite: {
    href: ExternalLinks.IntlayerWithVite,
    label: t({
      en: 'Go to ViteJS official website',
      fr: 'Aller sur le site officiel de ViteJS',
      es: 'Ir al sitio web oficial de ViteJS',
    }),
  },
};

export default availableTechnoContent;
