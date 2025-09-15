import { type Dictionary, t } from 'intlayer';

const metaContent = {
  content: {
    description: t({
      en: 'This is the home page description.',
      tr: 'Bu, ana sayfanın açıklamasıdır.',
    }),
    title: t({
      en: 'Home',
      tr: 'Ana Sayfa',
    }),
  },
  key: 'page-meta',
} satisfies Dictionary;

export default metaContent;
