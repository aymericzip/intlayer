import { type Dictionary, t } from 'intlayer';

const homeContent = {
  key: 'content-level-3',
  content: {
    subNode: {
      syntax31: t({
        en: 'Call with {{subNode.syntax31}} in en',
        es: 'Call with {{subNode.syntax31}} in es',
        fr: 'Call with {{subNode.syntax31}} in fr',
      }),
      syntax32: t({
        en: 'Call with {{content.subNode.syntax32}} in en',
        es: 'Call with {{content.subNode.syntax32}} in es',
        fr: 'Call with {{content.subNode.syntax32}} in fr',
      }),
      syntax33: t({
        en: 'Call with <subNode.syntax33/> in en',
        es: 'Call with <subNode.syntax33/> in es',
        fr: 'Call with <subNode.syntax33/> in fr',
      }),
      syntax34: t({
        en: 'Call with <content.subNode.syntax34/> in en',
        es: 'Call with <content.subNode.syntax34/> in es',
        fr: 'Call with <content.subNode.syntax34/> in fr',
      }),
      syntax35: t({
        en: 'Call with <component :is="subNode.syntax35"/> in en',
        es: 'Call with <component :is="subNode.syntax35"/> in es',
        fr: 'Call with <component :is="subNode.syntax35"/> in fr',
      }),
      syntax36: t({
        en: 'Call with <component :is="content.subNode.syntax36"/> in en',
        es: 'Call with <component :is="content.subNode.syntax36"/> in es',
        fr: 'Call with <component :is="content.subNode.syntax36"/> in fr',
      }),
    },
  },
} satisfies Dictionary;

export default homeContent;
