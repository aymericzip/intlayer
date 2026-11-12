import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'content-level-2',
  content: {
    syntax21: t({
      en: 'Call with {{syntax21}} in en',
      es: 'Call with {{syntax21}} in es',
      fr: 'Call with {{syntax21}} in fr',
    }),
    syntax22: t({
      en: 'Call with <syntax22/> in en',
      es: 'Call with <syntax22/> in es',
      fr: 'Call with <syntax22/> in fr',
    }),
    syntax23: t({
      en: 'Call with {{content.syntax23}} in en',
      es: 'Call with {{content.syntax23}} in es',
      fr: 'Call with {{content.syntax23}} in fr',
    }),
    syntax24: t({
      en: 'Call with <content.syntax24/> in en',
      es: 'Call with <content.syntax24/> in es',
      fr: 'Call with <content.syntax24/> in fr',
    }),
    syntax25: t({
      en: 'Call with <component :is="syntax25"/> in en',
      es: 'Call with <component :is="syntax25"/> in es',
      fr: 'Call with <component :is="syntax25"/> in fr',
    }),
    syntax26: t({
      en: 'Call with <component :is="content.syntax26"/> in en',
      es: 'Call with <component :is="content.syntax26"/> in es',
      fr: 'Call with <component :is="content.syntax26"/> in fr',
    }),
  },
} satisfies Dictionary;

export default homeContent;
