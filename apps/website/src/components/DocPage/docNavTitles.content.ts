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
  },
} satisfies DeclarationContent;

export default docNavTitlesContent;
