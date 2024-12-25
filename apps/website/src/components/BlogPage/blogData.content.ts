import { t, type DeclarationContent } from 'intlayer';

const blogDataContent = {
  key: 'blog-data',
  content: {
    default: {
      title: t({
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
      subSections: {
        SEO: {
          title: t({
            en: 'SEO and i18n',
            'en-GB': 'SEO and i18n',
            fr: 'SEO et i18n',
            es: 'SEO y i18n',
            de: 'SEO und i18n',
            ja: 'SEOと国際化',
            ko: 'SEO와 국제화',
            zh: 'SEO和国际化',
            it: 'SEO e i18n',
            pt: 'SEO e i18n',
            hi: 'SEO और अंतर्राष्ट्रीयकरण',
            ar: 'SEO و التدويل',
            ru: 'SEO и Интернационализация',
          }),
        },
        i18next: {
          title: t({
            en: 'Intlayer and i18next',
            fr: 'Intlayer et i18next',
            es: 'Intlayer y i18next',
            'en-GB': 'Intlayer and i18next',
            de: 'Intlayer und i18next',
            ja: 'Intlayerとi18next',
            ko: 'Intlayer와 i18next',
            zh: 'Intlayer和i18next',
            it: 'Intlayer e i18next',
            pt: 'Intlayer e i18next',
            hi: 'Intlayer और i18next',
            ar: 'Intlayer و i18next',
            ru: 'Intlayer и i18next',
          }),
        },
      },
    },
  },
} satisfies DeclarationContent;

export default blogDataContent;
