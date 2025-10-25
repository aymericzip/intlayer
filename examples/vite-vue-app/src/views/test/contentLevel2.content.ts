import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'content-level-2',
  content: {
    syntax21: t({
      en: 'Call with {{syntax21}} in en',
      fr: 'Call with {{syntax21}} in fr',
      es: 'Call with {{syntax21}} in es',
    }),
    syntax22: t({
      en: 'Call with <syntax22/> in en',
      fr: 'Call with <syntax22/> in fr',
      es: 'Call with <syntax22/> in es',
    }),
    syntax23: t({
      en: 'Call with {{content.syntax23}} in en',
      fr: 'Call with {{content.syntax23}} in fr',
      es: 'Call with {{content.syntax23}} in es',
    }),
    syntax24: t({
      en: 'Call with <content.syntax24/> in en',
      fr: 'Call with <content.syntax24/> in fr',
      es: 'Call with <content.syntax24/> in es',
    }),
    syntax25: t({
      en: 'Call with <component :is="syntax25"/> in en',
      fr: 'Call with <component :is="syntax25"/> in fr',
      es: 'Call with <component :is="syntax25"/> in es',
    }),
    syntax26: t({
      en: 'Call with <component :is="content.syntax26"/> in en',
      fr: 'Call with <component :is="content.syntax26"/> in fr',
      es: 'Call with <component :is="content.syntax26"/> in es',
    }),
  },
} satisfies Dictionary;

export default homeContent;
