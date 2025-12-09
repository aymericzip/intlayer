import {
  type BlogKey,
  getBlogMetadata as getBlogMetadataCore,
} from '@intlayer/docs';
import { type Dictionary, localeRecord, t } from 'intlayer';

const getBlogMetadata = (blog: BlogKey) =>
  t(
    localeRecord(async ({ locale }) => await getBlogMetadataCore(blog, locale))
  );

const blogDataContent: Dictionary = {
  key: 'blog-data',
  fill: false,
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
        pl: 'Co to jest国际化 (i18n)?',
        id: 'Apa itu国际化 (i18n)?',
        vi: 'Internationalization (i18n) là gì?',
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
        pl: 'SEO dan i18n',
        id: 'SEO dan i18n',
        vi: 'SEO và i18n',
      }),
      default: getBlogMetadata('./blog/en/internationalization_and_SEO.md'),
    },
    guide: {
      title: t({
        en: 'Guide',
        'en-GB': 'Guide',
        fr: 'Guide',
        es: 'Guía',
        de: 'Leitfaden',
        ja: 'ガイド',
        ko: '가이드',
        zh: '指南',
        it: 'Guida',
        pt: 'Guia',
        hi: 'मार्गदर्शिका',
        ar: 'دليل',
        ru: 'Руководство',
        tr: 'Rehber',
        pl: 'Przewodnik',
        id: 'Panduan',
        vi: 'Hướng dẫn',
      }),
      subSections: {
        'i18n-using-next-i18next': {
          title: t({
            en: 'i18n using next-i18next',
            'en-GB': 'i18n using next-i18next',
            fr: 'i18n avec next-i18next',
            es: 'i18n usando next-i18next',
            de: 'i18n mit next-i18next',
            ja: 'next-i18nextによるi18n',
            ko: 'next-i18next로 i18n',
            zh: '使用next-i18next的i18n',
            it: 'i18n con next-i18next',
            pt: 'i18n com next-i18next',
            hi: 'next-i18next के साथ i18n',
            ar: 'i18n باستخدام next-i18next',
            ru: 'i18n с помощью next-i18next',
            tr: 'next-i18next ile i18n',
            pl: 'i18n przy użyciu next-i18next',
            id: 'i18n dengan next-i18next',
            vi: 'i18n với next-i18next',
          }),
          default: getBlogMetadata('./blog/en/i18n_using_next-i18next.md'),
        },
        'i18n-using-with-next-intl': {
          title: t({
            en: 'i18n using next-intl',
            'en-GB': 'i18n using next-intl',
            fr: 'i18n avec next-intl',
            es: 'i18n usando next-intl',
            de: 'i18n mit next-intl',
            ja: 'next-intlによるi18n',
            ko: 'next-intl로 i18n',
            zh: '使用next-intl的i18n',
            it: 'i18n con next-intl',
            pt: 'i18n com next-intl',
            hi: 'next-intl के साथ i18n',
            ar: 'i18n باستخدام next-intl',
            ru: 'i18n с помощью next-intl',
            tr: 'next-intl ile i18n',
            pl: 'i18n przy użyciu next-intl',
            id: 'i18n dengan next-intl',
            vi: 'i18n với next-intl',
          }),
          default: getBlogMetadata('./blog/en/i18n_using_next-intl.md'),
        },
      },
    },
    'wrapping-your-current-i18n-solution-with-intlayer': {
      title: t({
        en: 'Use Intlayer on your solution',
        'en-GB': 'Use Intlayer on your solution',
        fr: 'Utilisez Intlayer sur votre solution',
        es: 'Utiliza Intlayer en tu solución',
        de: 'Verwenden Sie Intlayer in Ihrer Lösung',
        ja: 'Intlayerをあなたのソリューションで使う',
        ko: 'Intlayer를 당신의 솔루션에 사용하세요',
        zh: '在你的方案中使用Intlayer',
        it: 'Usa Intlayer sulla tua soluzione',
        pt: 'Use Intlayer na sua solução',
        hi: 'अपनी समाधान में Intlayer का उपयोग करें',
        ar: 'استخدم Intlayer على الحل الخاص بك',
        ru: 'Используйте Intlayer в вашем решении',
        tr: 'Çözümünüzde Intlayer kullanın',
        pl: 'Użyj Intlayer w swoim rozwiązaniu',
        id: 'Gunakan Intlayer di solusi Anda',
        vi: 'Sử dụng Intlayer trên giải pháp của bạn',
      }),
      subSections: {
        'intlayer-with-next-i18next': {
          title: t({
            en: 'Automate next-i18next',
            'en-GB': 'Automate next-i18next',
            fr: 'Automatiser next-i18next',
            es: 'Automatizar next-i18next',
            de: 'Automatisieren next-i18next',
            ja: 'next-i18nextを自動化',
            ko: 'next-i18next 자동화',
            zh: '自动化 next-i18next',
            it: 'Automatizza next-i18next',
            pt: 'Automatizar next-i18next',
            hi: 'next-i18next को स्वचालित करें',
            ar: 'أتمتة next-i18next',
            ru: 'Автоматизировать next-i18next',
            tr: 'next-i18next otomatikleştir',
            pl: 'Automatyzacja next-i18next',
            id: 'Automatisasi next-i18next',
            vi: 'Tự động hóa next-i18next',
          }),
          default: getBlogMetadata('./blog/en/intlayer_with_next-i18next.md'),
        },
        'intlayer-with-react-i18next': {
          title: t({
            en: 'Automate react-i18next',
            'en-GB': 'Automate react-i18next',
            fr: 'Automatiser react-i18next',
            es: 'Automatizar react-i18next',
            de: 'Automatisieren react-i18next',
            ja: 'react-i18nextを自動化',
            ko: 'react-i18next 자동화',
            zh: '自动化 react-i18next',
            it: 'Automatizza react-i18next',
            pt: 'Automatizar react-i18next',
            hi: 'react-i18next को स्वचालित करें',
            ar: 'أتمتة react-i18next',
            ru: 'Автоматизировать react-i18next',
            tr: 'react-i18next otomatikleştir',
            pl: 'Automatyzacja react-i18next',
            id: 'Automatisasi react-i18next',
            vi: 'Tự động hóa react-i18next',
          }),
          default: getBlogMetadata('./blog/en/intlayer_with_react-i18next.md'),
        },
        'intlayer-with-next-intl': {
          title: t({
            en: 'Automate next-intl',
            'en-GB': 'Automate next-intl',
            fr: 'Automatiser next-intl',
            es: 'Automatizar next-intl',
            de: 'Automatisieren next-intl',
            ja: 'next-intlを自動化',
            ko: 'next-intl 자동화',
            zh: '自动化 next-intl',
            it: 'Automatizza next-intl',
            pt: 'Automatizar next-intl',
            hi: 'next-intl को स्वचालित करें',
            ar: 'أتمتة next-intl',
            ru: 'Автоматизировать next-intl',
            tr: 'next-intl otomatikleştir',
            pl: 'Automatyzacja next-intl',
            id: 'Automatisasi next-intl',
            vi: 'Tự động hóa next-intl',
          }),
          default: getBlogMetadata('./blog/en/intlayer_with_next-intl.md'),
        },
        'intlayer-with-react-intl': {
          title: t({
            en: 'Automate react-intl',
            'en-GB': 'Automate react-intl',
            fr: 'Automatiser react-intl',
            es: 'Automatizar react-intl',
            de: 'Automatisieren react-intl',
            ja: 'react-intlを自動化',
            ko: 'react-intl 자동화',
            zh: '自动化 react-intl',
            it: 'Automatizza react-intl',
            pt: 'Automatizar react-intl',
            hi: 'react-intl को स्वचालित करें',
            ar: 'أتمتة react-intl',
            ru: 'Автоматизировать react-intl',
            tr: 'react-intl otomatikleştir',
            pl: 'Automatyzacja react-intl',
            id: 'Automatisasi react-intl',
            vi: 'Tự động hóa react-intl',
          }),
          default: getBlogMetadata('./blog/en/intlayer_with_react-intl.md'),
        },
        'intlayer-with-vue-i18n': {
          title: t({
            en: 'Automate vue-i18n',
            'en-GB': 'Automate vue-i18n',
            fr: 'Automatiser vue-i18n',
            es: 'Automatizar vue-i18n',
            de: 'Automatisieren vue-i18n',
            ja: 'vue-i18nを自動化',
            ko: 'vue-i18n 자동화',
            zh: '自动化 vue-i18n',
            it: 'Automatizza vue-i18n',
            pt: 'Automatizar vue-i18n',
            hi: 'vue-i18n को स्वचालित करें',
            ar: 'أتمتة vue-i18n',
            ru: 'Автоматизировать vue-i18n',
            tr: 'vue-i18n otomatikleştir',
            pl: 'Automatyzacja vue-i18n',
            id: 'Automatisasi vue-i18n',
            vi: 'Tự động hóa vue-i18n',
          }),
          default: getBlogMetadata('./blog/en/intlayer_with_vue-i18n.md'),
        },
      },
    },
    comparisons: {
      title: t({
        en: 'Comparisons',
        'en-GB': 'Comparisons',
        fr: 'Comparaisons',
        es: 'Comparaciones',
        de: 'Vergleiche',
        ja: '比較',
        ko: '비교',
        zh: '比较',
        it: 'Comparazioni',
        pt: 'Comparações',
        hi: 'अंतर्गत',
        ar: 'مقارنات',
        ru: 'Сравнения',
        tr: 'Karşılaştırmalar',
        pl: 'Porównania',
        id: 'Perbandingan',
        vi: 'So sánh',
      }),
      subSections: {
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
      },
      // 'vue-i18n-vs-intlayer': {
      //   title: 'vue-i18n vs Intlayer',
      //   default: getBlogMetadata('./blog/en/vue-i18n_vs_intlayer.md'),
      // },
    },

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
    //     pl: 'Technologies i18n',
    //     id: 'Technologies i18n',
    //     vi: 'Technologies i18n',
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
    //         pl: 'Frameworks',
    //         id: 'Frameworks',
    //         vi: 'Frameworks',
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
