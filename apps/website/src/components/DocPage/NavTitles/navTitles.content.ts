import { type Dictionary, t } from 'intlayer';

const navTitlesContent = {
  key: 'nav-titles',
  content: {
    linkLabel: t({
      en: 'Go to section',
      ar: 'اذهب إلى القسم',
      de: 'Gehe zur Sektion',
      'en-GB': 'Go to section',
      es: 'Ir a la sección',
      fr: 'Aller à la section',
      'he-IL': 'מעבר לסעיף',
      hi: 'सेक्शन पर जाएं',
      id: 'Ke bagian',
      it: 'Vai alla sezione',
      ja: 'セクションへ行く',
      ko: '섹션으로 이동',
      pl: 'Przejdź do sekcji',
      pt: 'Ir para a seção',
      ru: 'Перейти к разделу',
      tr: 'Bölüme git',
      uk: 'Перейти до розділу',
      vi: 'Đi tới phần',
      zh: '转到节',
    }),
  },
  title: 'Navigation titles',
  description:
    'Content declaration for navigation titles used to label navigation links or buttons across the interface.',
  tags: ['navigation', 'ui component'],
} satisfies Dictionary;

export default navTitlesContent;
