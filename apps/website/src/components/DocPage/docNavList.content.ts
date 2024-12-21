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
  },
} satisfies DeclarationContent;

export default docNavTitlesContent;
