import { type Dictionary, t } from 'intlayer';

const appContent = {
  content: {
    about: t({
      en: 'About',
      tr: 'Hakkında',
    }),
    greeting: t({
      en: 'Hello World',
      tr: 'Merhaba Dünya',
    }),
    home: t({
      en: 'Home',
      tr: 'Ana Sayfa',
    }),
  },
  key: 'page',
} satisfies Dictionary;

export default appContent;
