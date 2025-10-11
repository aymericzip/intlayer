import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'content-level-3',
  content: {
    subNode: {
      syntax31: t({
        en: 'Call with {{subNode.syntax31}} in en',
        fr: 'Call with {{subNode.syntax31}} in fr',
        es: 'Call with {{subNode.syntax31}} in es',
      }),
      syntax32: t({
        en: 'Call with {{content.subNode.syntax32}} in en',
        fr: 'Call with {{content.subNode.syntax32}} in fr',
        es: 'Call with {{content.subNode.syntax32}} in es',
      }),
      syntax33: t({
        en: 'Call with <subNode.syntax33/> in en',
        fr: 'Call with <subNode.syntax33/> in fr',
        es: 'Call with <subNode.syntax33/> in es',
      }),
      syntax34: t({
        en: 'Call with <content.subNode.syntax34/> in en',
        fr: 'Call with <content.subNode.syntax34/> in fr',
        es: 'Call with <content.subNode.syntax34/> in es',
      }),
      syntax35: t({
        en: 'Call with <component :is="subNode.syntax35"/> in en',
        fr: 'Call with <component :is="subNode.syntax35"/> in fr',
        es: 'Call with <component :is="subNode.syntax35"/> in es',
      }),
      syntax36: t({
        en: 'Call with <component :is="content.subNode.syntax36"/> in en',
        fr: 'Call with <component :is="content.subNode.syntax36"/> in fr',
        es: 'Call with <component :is="content.subNode.syntax36"/> in es',
      }),
    },
  },
} satisfies Dictionary;

export default homeContent;
