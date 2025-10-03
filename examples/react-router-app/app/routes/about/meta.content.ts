import { type Dictionary, t } from 'intlayer';

const metaContent = {
  content: {
    description: t({
      en: 'This is the about page description.',
      es: 'Esta es la descripción de la página de about.',
      fr: 'Ceci est la description de la page about.',
    }),
    title: t({
      en: 'About',
      es: 'About',
      fr: 'About',
    }),
  },
  key: 'about-meta',
} satisfies Dictionary;

export default metaContent;
