import { t, type Dictionary } from 'intlayer';

export const breadCrumbContent = {
  key: 'breadcrumb',
  autoFill: './{{key}}.content.json',
  content: {
    linkLabel: t({
      en: 'Go to',
      fr: 'Aller à',
      es: 'Ir a',
      'en-GB': 'Go to',
      de: 'Gehe zu',
      ja: 'に移動',
      ko: '로 이동',
      zh: '转到',
      it: 'Vai a',
      pt: 'Ir para',
      hi: 'कर जाएं',
      ar: 'اذهب إلى',
      ru: 'Перейти на',
      tr: 'Git',
    }),
  },
} satisfies Dictionary;

export default breadCrumbContent;
