import { type Dictionary, t } from 'intlayer';

const appContent = {
  content: {
    about: t({
      en: 'About',
      es: 'Acerca de',
      fr: 'À propos',
    }),
  },
  key: 'about',
} satisfies Dictionary;

export default appContent;
