import { type Dictionary, t } from 'intlayer';

const metaContent = {
  content: {
    description: t({
      en: 'This is the about page description.',
      tr: 'Bu, hakkında sayfasının açıklamasıdır.',
    }),
    title: t({
      en: 'About',
      tr: 'Hakkında',
    }),
  },
  key: 'about-meta',
} satisfies Dictionary;

export default metaContent;
