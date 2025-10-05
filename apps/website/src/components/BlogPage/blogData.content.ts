import {
  type BlogKey,
  getBlogMetadata as getBlogMetadataCore,
} from '@intlayer/docs';
import { type Dictionary, localeRecord, t } from 'intlayer';

const getBlogMetadata = (blog: BlogKey) =>
  t(
    localeRecord(async ({ locale }) => await getBlogMetadataCore(blog, locale))
  );

const blogDataContent: any = {
  key: 'blog-data',
  content: {
    'what-is-internationalization': {
      title: t({
        en: 'What is Internationalization (i18n)?',
        'en-GB': 'What is Internationalization (i18n)?',
        fr: "Qu'est-ce que l'internationalisation (i18n) ?",
        es: '¿Qué es la internacionalización (i18n)?',
        de: 'Was ist Internationalisierung (i18n)?',
        ja: '国際化とは？',
        ko: '국제화란?',
        zh: '什么是国际化？',
        it: "Cos'è l'internazionalizzazione (i18n)?",
        pt: 'O que é internacionalização (i18n)?',
        hi: 'अंतर्राष्ट्रीयकरण (i18n) क्या है?',
        ar: 'ما هو التدويل (i18n)?',
        ru: 'Что такое интернационализация (i18n)?',
        tr: 'Uluslararasılaştırma (i18n) nedir?',
      }),
      default: getBlogMetadata('./blog/en/what_is_internationalization.md'),
    },
    'SEO-and-i18n': {
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
        tr: 'SEO ve i18n',
      }),
      default: getBlogMetadata('./blog/en/internationalization_and_SEO.md'),
    },

    // 'intlayer-with-next-i18next': {
    //   title: t({
    //     en: 'Intlayer and next-i18next',
    //     fr: 'Intlayer et next-i18next',
    //     es: 'Intlayer y next-i18next',
    //     'en-GB': 'Intlayer and next-i18next',
    //     de: 'Intlayer und next-i18next',
    //     ja: 'Intlayerとnext-i18next',
    //     ko: 'Intlayer와 next-i18next',
    //     zh: 'Intlayer和next-i18next',
    //     it: 'Intlayer e next-i18next',
    //     pt: 'Intlayer e next-i18next',
    //     hi: 'Intlayer और next-i18next',
    //     ar: 'Intlayer و next-i18next',
    //     ru: 'Intlayer и next-i18next',
    //     tr: 'Intlayer ve next-i18next',
    //   }),
    //   default: getBlogMetadata('./blog/en/intlayer_with_next-i18next.md'),
    // },
    // 'intlayer-with-react-i18next': {
    //   title: t({
    //     en: 'Intlayer and react-i18next',
    //     'en-GB': 'Intlayer and react-i18next',
    //     fr: 'Intlayer et react-i18next',
    //     es: 'Intlayer y react-i18next',
    //     de: 'Intlayer und react-i18next',
    //     ja: 'Intlayerとreact-i18next',
    //     ko: 'Intlayer와 react-i18next',
    //     zh: 'Intlayer和react-i18next',
    //     it: 'Intlayer e react-i18next',
    //     pt: 'Intlayer e react-i18next',
    //     hi: 'Intlayer और react-i18next',
    //     ar: 'Intlayer و react-i18next',
    //     ru: 'Intlayer и react-i18next',
    //     tr: 'Intlayer ve react-i18next',
    //   }),
    //   default: getBlogMetadata('./blog/en/intlayer_with_react-i18next.md'),
    // },
    // 'intlayer-with-next-intl': {
    //   title: t({
    //     en: 'Intlayer and next-intl',
    //     'en-GB': 'Intlayer and next-intl',
    //     fr: 'Intlayer et next-intl',
    //     es: 'Intlayer y next-intl',
    //     de: 'Intlayer und next-intl',
    //     ja: 'Intlayerとnext-intl',
    //     ko: 'Intlayer와 next-intl',
    //     zh: 'Intlayer和next-intl',
    //     it: 'Intlayer e next-intl',
    //     pt: 'Intlayer e next-intl',
    //     hi: 'Intlayer और next-intl',
    //     ar: 'Intlayer و next-intl',
    //     ru: 'Intlayer и next-intl',
    //     tr: 'Intlayer ve next-intl',
    //   }),
    //   default: getBlogMetadata('./blog/en/intlayer_with_next-intl.md'),
    // },
    // 'intlayer-with-react-intl': {
    //   title: t({
    //     en: 'Intlayer and react-intl',
    //     'en-GB': 'Intlayer and react-intl',
    //     fr: 'Intlayer et react-intl',
    //     es: 'Intlayer y react-intl',
    //     de: 'Intlayer und react-intl',
    //     ja: 'Intlayerとreact-intl',
    //     ko: 'Intlayer와 react-intl',
    //     zh: 'Intlayer和react-intl',
    //     it: 'Intlayer e react-intl',
    //     pt: 'Intlayer e react-intl',
    //     hi: 'Intlayer और react-intl',
    //     ar: 'Intlayer و react-intl',
    //     ru: 'Intlayer и react-intl',
    //     tr: 'Intlayer ve react-intl',
    //   }),
    //   default: getBlogMetadata('./blog/en/intlayer_with_react-intl.md'),
    // },
    'next-i18next-vs-next-intl-vs-intlayer': {
      title: 'next-i18next vs next-intl vs Intlayer',
      default: getBlogMetadata(
        './blog/en/next-i18next_vs_next-intl_vs_intlayer.md'
      ),
    },
    'react-i18next-vs-react-intl-vs-intlayer': {
      title: 'react-i18next vs react-intl vs Intlayer',
      default: getBlogMetadata(
        './blog/en/react-i18next_vs_react-intl_vs_intlayer.md'
      ),
    },
    // 'vue-i18n-vs-intlayer': {
    //   title: 'vue-i18n vs Intlayer',
    //   default: getBlogMetadata('./blog/en/vue-i18n_vs_intlayer.md'),
    // },

    // 'i18n-technologies': {
    //   title: t({
    //     en: 'i18n Technologies',
    //     'en-GB': 'i18n Technologies',
    //     fr: "Technologies d'i18n",
    //     es: 'Tecnologías de i18n',
    //     de: 'i18n-Technologien',
    //     ja: 'i18n テクノロジー',
    //     ko: 'i18n 기술',
    //     zh: 'i18n 技术',
    //     pt: 'Tecnologias de i18n',
    //     ru: 'Технологии i18n',
    //     hi: 'i18n तकनीकी',
    //     ar: 'تقنيات i18n',
    //     it: 'Tecnologie di i18n',
    //     tr: 'i18n Teknolojileri',
    //   }),
    //   subSections: {
    //     frameworks: {
    //       title: t({
    //         en: 'Frameworks',
    //         'en-GB': 'Frameworks',
    //         fr: 'Frameworks',
    //         es: 'Frameworks',
    //         de: 'Frameworks',
    //         ja: 'フレームワーク',
    //         ko: '프레임워크',
    //         zh: '框架',
    //         it: 'Frameworks',
    //         pt: 'Frameworks',
    //         hi: 'फ्रेमवर्क',
    //         ar: 'الإطارات',
    //         ru: 'Фреймворки',
    //         tr: 'Frameworks',
    //       }),
    //       subSections: {
    //         angular: {
    //           title: 'Angular',
    //           default: getBlogMetadata(
    //             './blog/en/list_i18n_technologies/frameworks/angular.md'
    //           ),
    //         },
    //         react: {
    //           title: 'React',
    //           default: getBlogMetadata(
    //             './blog/en/list_i18n_technologies/frameworks/react.md'
    //           ),
    //         },
    //         vue: {
    //           title: 'Vue',
    //           default: getBlogMetadata(
    //             './blog/en/list_i18n_technologies/frameworks/vue.md'
    //           ),
    //         },
    //         svelte: {
    //           title: 'Svelte',
    //           default: getBlogMetadata(
    //             './blog/en/list_i18n_technologies/frameworks/svelte.md'
    //           ),
    //         },
    //         flutter: {
    //           title: 'Flutter',
    //           default: getBlogMetadata(
    //             './blog/en/list_i18n_technologies/frameworks/flutter.md'
    //           ),
    //         },
    //         'react-native': {
    //           title: 'React Native',
    //           default: getBlogMetadata(
    //             './blog/en/list_i18n_technologies/frameworks/react-native.md'
    //           ),
    //         },
    //       },
    //     },
    //     CMS: {
    //       title: 'CMS',
    //       subSections: {
    //         wordpress: {
    //           title: 'Wordpress',
    //           default: getBlogMetadata(
    //             './blog/en/list_i18n_technologies/CMS/wordpress.md'
    //           ),
    //         },
    //         drupal: {
    //           title: 'Drupal',
    //           default: getBlogMetadata(
    //             './blog/en/list_i18n_technologies/CMS/drupal.md'
    //           ),
    //         },
    //         wix: {
    //           title: 'Wix',
    //           default: getBlogMetadata(
    //             './blog/en/list_i18n_technologies/CMS/wix.md'
    //           ),
    //         },
    //       },
    //     },
    //   },
    // },
  },
} satisfies Dictionary;

export default blogDataContent;
