import { type Dictionary, t } from 'intlayer';

const asideNavigationContent = {
  key: 'aside-navigation',
  content: {
    title: t({
      ar: 'في هذه الصفحة',
      de: 'Auf dieser Seite',
      en: 'In this page',
      'en-GB': 'On this page',
      es: 'En esta página',
      fr: 'Dans cette page',
      hi: 'इस पृष्ठ में',
      it: 'In questa pagina',
      ja: 'このページについて',
      ko: '이 페이지에서',
      pt: 'Nesta página',
      ru: 'На этой странице',
      tr: 'Bu sayfada',
      zh: '在此页面',
    }),
    linkLabel: t({
      ar: 'اذهب إلى القسم',
      de: 'Gehe zur Sektion',
      en: 'Go to section',
      'en-GB': 'Go to section',
      es: 'Ir a la sección',
      fr: 'Aller à la section',
      hi: 'सेक्शन पर जाएं',
      it: 'Vai alla sezione',
      ja: 'セクションへ行く',
      ko: '섹션으로 이동',
      pt: 'Ir para a seção',
      ru: 'Перейти к разделу',
      tr: 'Bölüme git',
      zh: '转到节',
    }),
    collapseButton: {
      label: t({
        en: 'Collapse',
        fr: 'Réduire',
        es: 'Colapsar',
        'en-GB': 'Collapse',
        de: 'Zuklappen',
        ja: '折りたたむ',
        ko: '접기',
        zh: '折叠',
        it: 'Comprimi',
        pt: 'Recolher',
        hi: 'संकुचित करें',
        ar: 'اطوي التوسيع',
        ru: 'Свернуть',
        tr: 'Daralt',
      }),
    },
  },
} satisfies Dictionary;

export default asideNavigationContent;
