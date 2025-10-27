import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'content-level-1',
  content: t({
    en: 'Call with syntax1 in en',
    fr: 'Call with syntax1 in fr',
    es: 'Call with syntax1 in es',
  }),
} satisfies Dictionary;

export default homeContent;
