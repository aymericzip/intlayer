import { label } from 'framer-motion/client';
import { type DeclarationContent, t } from 'intlayer';

const docNavTitlesContent = {
  key: 'doc-nav-titles',
  content: {
    title: t({
      en: 'In this page',
      fr: 'Dans cette page',
      es: 'En esta página',
      'en-GB': 'On this page',
      de: 'Auf dieser Seite',
      ja: 'このページについて',
      ko: '이 페이지에서',
      zh: '在此页面',
      it: 'In questa pagina',
      pt: 'Nesta página',
      hi: 'इस पृष्ठ में',
      ar: 'في هذه الصفحة',
      ru: 'На этой странице',
    }),
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
} satisfies DeclarationContent;

export default docNavTitlesContent;
