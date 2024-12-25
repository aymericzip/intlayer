import { type DeclarationContent, t } from 'intlayer';

const docNavTitlesContent = {
  key: 'doc-nav-list',
  content: {
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
      }),
    },
    blogButton: {
      label: t({
        en: 'Go to blog',
        fr: 'Aller à la blog',
        es: 'Ir a la blog',
        'en-GB': 'Go to blog',
        de: 'Gehe zur Blog',
        ja: 'ブログへ行く',
        ko: '블로그로 이동',
        zh: '转到博客',
        it: 'Vai al blog',
        pt: 'Ir para o blog',
        hi: 'ब्लॉग पर जाएं',
        ar: 'اذهب إلى المدونة',
        ru: 'Перейти к блогу',
      }),
      text: t({
        en: 'Blog',
        fr: 'Blog',
        es: 'Blog',
        'en-GB': 'Blog',
        de: 'Blog',
        ja: 'ブログ',
        ko: '블로그',
        zh: '博客',
        it: 'Blog',
        pt: 'Blog',
        hi: 'ब्लॉग',
        ar: 'مدونة',
        ru: 'Блог',
      }),
    },
  },
} satisfies DeclarationContent;

export default docNavTitlesContent;
