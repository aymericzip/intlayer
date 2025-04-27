import { t, type Dictionary } from 'intlayer';

const navTitlesContent = {
  key: 'nav-titles',
  content: {
    linkLabel: t({
      en: 'Go to section',
      fr: 'Aller à la section',
      es: 'Ir a la sección',
      'en-GB': 'Go to section',
      de: 'Gehe zur Sektion',
      ja: 'セクションへ行く',
      ko: '섹션으로 이동',
      zh: '转到节',
      it: 'Vai alla sezione',
      pt: 'Ir para a seção',
      hi: 'सेक्शन पर जाएं',
      ar: 'اذهب إلى القسم',
      ru: 'Перейти к разделу',
    }),
  },
} satisfies Dictionary;

export default navTitlesContent;
