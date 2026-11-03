import { type Dictionary, plural, t } from 'intlayer';

const counterContent = {
  key: 'counter',
  content: {
    clicks: plural({
      one: t({
        en: '{{count}} click',
        es: '{{count}} clic',
        fr: '{{count}} clic',
      }),
      other: t({
        en: '{{count}} clicks',
        es: '{{count}} clics',
        fr: '{{count}} clics',
      }),
    }),
  },
} satisfies Dictionary;

export default counterContent;
