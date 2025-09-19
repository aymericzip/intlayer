import { type Dictionary, t } from 'intlayer';

const appContent = {
  content: {
    about: t({
      en: 'About',
      tr: 'Hakkımda',
    }),
    home: t({
      en: 'Home',
      tr: 'Ana Sayfa',
    }),
  },
  key: 'about',
} satisfies Dictionary;

export default appContent;
