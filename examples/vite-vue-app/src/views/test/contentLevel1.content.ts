import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'content-level-1',
  content: t({
    en: 'Call with syntax1 in en',
    es: 'Call with syntax1 in es',
    fr: 'Call with syntax1 in fr',
  }),
} satisfies Dictionary;

export default homeContent;
