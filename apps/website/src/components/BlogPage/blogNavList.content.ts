import { type Dictionary, t } from 'intlayer';

const blogNavTitlesContent = {
  key: 'blog-nav-list',
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
        tr: 'Daralt',
        pl: 'Zwiń',
      }),
    },
    docButton: {
      label: t({
        en: 'Go to documentation',
        fr: 'Aller à la documentation',
        es: 'Ir a la documentación',
        'en-GB': 'Go to documentation',
        de: 'Gehe zur Dokumentation',
        ja: 'ドキュメンテーションへ行く',
        ko: '문서화 방문',
        zh: '转到文档',
        it: 'Vai alla documentazione',
        pt: 'Ir para a documentação',
        hi: 'दस्तावेज़ पर जाएं',
        ar: 'اذهب إلى الوثائق',
        ru: 'Перейти к документации',
        tr: 'Belgelere git',
        pl: 'Przejdź do dokumentacji',
      }),
      text: t({
        en: 'Documentation',
        fr: 'Documentation',
        es: 'Documentación',
        'en-GB': 'Documentation',
        de: 'Dokumentation',
        ja: 'ドキュメンテーション',
        ko: '문서화',
        zh: '文档',
        it: 'Documentazione',
        pt: 'Documentação',
        hi: 'दस्तावेज़',
        ar: 'الوثائق',
        ru: 'Документация',
        tr: 'Dokümantasyon',
        pl: 'Dokumentacja',
      }),
    },
  },
} satisfies Dictionary;

export default blogNavTitlesContent;
