import { type Dictionary, plural, t } from 'intlayer';

const counterContent = {
  key: 'counter',
  content: {
    clicks: plural({
      one: t({
        en: '{{count}} click',
        fr: '{{count}} clic',
        es: '{{count}} clic',
      }),
      other: t({
        en: '{{count}} clicks',
        fr: '{{count}} clics',
        es: '{{count}} clics',
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
