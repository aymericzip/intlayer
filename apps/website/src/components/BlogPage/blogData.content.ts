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
        'intlayer-with-next-i18next': {
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
        'intlayer-with-react-i18next': {
          title: t({
            en: 'Intlayer and react-i18next',
            'en-GB': 'Intlayer and react-i18next',
            fr: 'Intlayer et react-i18next',
            es: 'Intlayer y react-i18next',
            de: 'Intlayer und react-i18next',
            ja: 'Intlayerとreact-i18next',
            ko: 'Intlayer와 react-i18next',
            zh: 'Intlayer和react-i18next',
            it: 'Intlayer e react-i18next',
            pt: 'Intlayer e react-i18next',
            hi: 'Intlayer और react-i18next',
            ar: 'Intlayer و react-i18next',
            ru: 'Intlayer и react-i18next',
          }),
        },
        'intlayer-with-next-intl': {
          title: t({
            en: 'Intlayer and next-intl',
            'en-GB': 'Intlayer and next-intl',
            fr: 'Intlayer et next-intl',
            es: 'Intlayer y next-intl',
            de: 'Intlayer und next-intl',
            ja: 'Intlayerとnext-intl',
            ko: 'Intlayer와 next-intl',
            zh: 'Intlayer和next-intl',
            it: 'Intlayer e next-intl',
            pt: 'Intlayer e next-intl',
            hi: 'Intlayer और next-intl',
            ar: 'Intlayer و next-intl',
            ru: 'Intlayer и next-intl',
          }),
        },
        'intlayer-with-react-intl': {
          title: t({
            en: 'Intlayer and react-intl',
            'en-GB': 'Intlayer and react-intl',
            fr: 'Intlayer et react-intl',
            es: 'Intlayer y react-intl',
            de: 'Intlayer und react-intl',
            ja: 'Intlayerとreact-intl',
            ko: 'Intlayer와 react-intl',
            zh: 'Intlayer和react-intl',
            it: 'Intlayer e react-intl',
            pt: 'Intlayer e react-intl',
            hi: 'Intlayer और react-intl',
            ar: 'Intlayer و react-intl',
            ru: 'Intlayer и react-intl',
          }),
        },
        'next-i18next_vs_next-intl_vs_intlayer': {
          title: 'next-i18n vs next-intl vs Intlayer',
        },
        'react-i18n-vs-react-intl-vs-intlayer': {
          title: 'react-i18n vs react-intl vs Intlayer',
        },
      },
    },
  },
} satisfies DeclarationContent;

export default blogDataContent;
