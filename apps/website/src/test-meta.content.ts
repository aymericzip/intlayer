import { type Dictionary, t } from 'intlayer';

const testContent = {
  key: 'test-multilingual-meta',
  title: t({
    en: 'Test title',
    fr: 'Titre de test',
  }),
  description: t({
    en: 'Test description',
    fr: 'Description de test',
  }),
  content: {
    hello: t({
      en: 'Hello',
      fr: 'Bonjour',
    }),
  },
} satisfies Dictionary;

export default testContent;
