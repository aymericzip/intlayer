import { type Dictionary, t } from 'intlayer';

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
      tr: 'Bölüme git',
      pl: 'Przejdź do sekcji',
      id: 'Ke bagian',
      vi: 'Đi tới phần',
    }),
  },
  title: 'Navigation titles',
  description:
    'Content declaration for navigation titles used to label navigation links or buttons across the interface.',
  tags: ['navigation', 'ui component'],
} satisfies Dictionary;

export default navTitlesContent;
