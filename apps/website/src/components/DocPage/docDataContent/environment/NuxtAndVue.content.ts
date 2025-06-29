import { GithubRoutes, PagesRoutes } from '@/Routes';
import { DocData } from '@components/DocPage/types';
import { Dictionary, t } from 'intlayer';

const docContent = {
  key: 'doc-intlayer-with-nuxt-vue-metadata',
  content: {
    docName: 'intlayer_with_nuxt',
    url: PagesRoutes.Doc_Environment_NuxtAndVue,
    githubUrl: GithubRoutes.IntlayerWithNuxtAndVue,
    createdAt: '2025-06-18',
    updatedAt: '2025-06-18',
    title: t({
      en: 'Translate your Nuxt and Vue website (i18n)',
      fr: 'Traduire votre site web Nuxt et Vue (i18n)',
      es: 'Traduce su sitio web Nuxt y Vue (i18n)',
      'en-GB': 'Translate your Nuxt and Vue website (i18n)',
      de: 'Übersetzen Sie Ihre Nuxt und Vue-Website (i18n)',
      ja: 'NuxtとVueのウェブサイトを翻訳する (i18n)',
      ko: 'Nuxt와 Vue의 웹사이트를 번역하십시오 (i18n)',
      zh: '翻译你的Nuxt和Vue网站 (i18n)',
      it: 'Traduci il tuo sito web Nuxt e Vue (i18n)',
      pt: 'Traduza o seu site Nuxt e Vue (i18n)',
      hi: 'Nuxt और Vue के वेबसाइट को अनुवाद करें (i18n)',
      ar: 'ترجم موقعك الإلكتروني Nuxt و Vue (i18n)',
      ru: 'Переведите свой сайт Nuxt и Vue (i18n)',
    }),

    description: t({
      en: 'Discover how to make your Nuxt and Vue website multilingual. Follow the documentation to internationalize (i18n) and translate it.',
      'en-GB':
        'Discover how to make your Nuxt and Vue website multilingual. Follow the documentation to internationalise (i18n) and translate it.',
      ar: 'اكتشف كيفية جعل موقعك الإلكتروني باستخدام Nuxt وVue متعدد اللغات. اتبع الوثائق لتدويله (i18n) وترجمته.',
      de: 'Erfahren Sie, wie Sie Ihre mit Nuxt und Vue erstellte Website mehrsprachig gestalten können. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und Übersetzung.',
      es: 'Descubre cómo hacer que tu sitio web con Nuxt y Vue sea multilingüe. Sigue la documentación para internacionalizarlo (i18n) y traducirlo.',
      fr: "Découvrez comment rendre votre site web avec Nuxt et Vue multilingue. Suivez la documentation pour l'internationaliser (i18n) et le traduire.",
      hi: 'जानें कि Nuxt और Vue का उपयोग करके अपनी वेबसाइट को बहुभाषी कैसे बनाएं। इसे अंतर्राष्ट्रीय (i18n) और अनुवादित करने के लिए प्रलेखन का पालन करें।',
      it: 'Scopri come rendere multilingue il tuo sito web con Nuxt e Vue. Segui la documentazione per internazionalizzarlo (i18n) e tradurlo.',
      ja: 'NuxtとVueを使ったウェブサイトを多言語対応にする方法を学びましょう。国際化（i18n）と翻訳のためにドキュメントに従ってください。',
      ko: 'Nuxt와 Vue를 사용한 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위해 문서를 참조하세요.',
      pt: 'Descubra como tornar seu site com Nuxt e Vue multilíngue. Siga a documentação para internacionalizá-lo (i18n) e traduzi-lo.',
      ru: 'Узнайте, как сделать ваш сайт на Nuxt и Vue многоязычным. Следуйте документации для интернационализации (i18n) и перевода.',
      zh: '了解如何使您使用 Nuxt 和 Vue 构建的网站实现多语言支持。请参阅文档以进行国际化（i18n）和翻译。',
    }),
    keywords: t({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Nuxt',
        'Vue',
        'JavaScript',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Nuxt',
        'Vue',
        'JavaScript',
      ],
      es: [
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Nuxt',
        'Vue',
        'JavaScript',
      ],
      de: [
        'Internationalisierung',
        'Dokumentation',
        'Intlayer',
        'Nuxt',
        'Vue',
        'JavaScript',
      ],
      ja: [
        '国際化',
        'ドキュメンテーション',
        'Intlayer',
        'Nuxt',
        'Vue',
        'JavaScript',
      ],
      ko: ['국제화', '문서', 'Intlayer', 'Nuxt', 'Vue', 'JavaScript'],
      zh: ['国际化', '文档', 'Intlayer', 'Nuxt', 'Vue', 'JavaScript'],
      it: [
        'Internazionalizzazione',
        'Documentazione',
        'Intlayer',
        'Nuxt',
        'Vue',
        'JavaScript',
      ],
      pt: [
        'Internacionalização',
        'Documentação',
        'Intlayer',
        'Nuxt',
        'Vue',
        'JavaScript',
      ],
      hi: [
        'अंतर्राष्ट्रीयकरण',
        'दस्तावेज़ीकरण',
        'Intlayer',
        'Nuxt',
        'Vue',
        'JavaScript',
      ],
      ar: ['التدويل', 'التوثيق', 'Intlayer', 'Nuxt', 'Vue', 'JavaScript'],
      ru: [
        ' интернационализация',
        'Документация',
        'Intlayer',
        'Nuxt',
        'Vue',
        'JavaScript',
      ],
      'en-GB': [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Nuxt',
        'Vue',
        'JavaScript',
      ],
    }),
  },
} satisfies Dictionary<DocData>;

export default docContent;
