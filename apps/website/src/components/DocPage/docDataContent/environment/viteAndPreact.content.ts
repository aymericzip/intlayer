import { GithubRoutes, PagesRoutes } from '@/Routes';
import { DocData } from '@components/DocPage/types';
import { Dictionary, t } from 'intlayer';

const docContent = {
  key: 'doc-intlayer-with-vite-preact-metadata',
  content: {
    docName: 'intlayer_with_vite_preact',
    url: PagesRoutes.Doc_Environment_ViteAndPreact,
    githubUrl: GithubRoutes.IntlayerWithVitePreact,
    createdAt: '2025-04-18',
    updatedAt: '2025-04-18',
    title: t({
      en: 'Translate your Vite and Preact website (i18n)',
      fr: 'Traduire votre site web Vite et Preact (i18n)',
      es: 'Traduce su sitio web Vite y Preact (i18n)',
      'en-GB': 'Translate your Vite and Preact website (i18n)',
      de: 'Übersetzen Sie Ihre Vite und Preact-Website (i18n)',
      ja: 'ViteとPreactのウェブサイトを翻訳する (i18n)',
      ko: 'Vite와 Preact의 웹사이트를 번역하십시오 (i18n)',
      zh: '翻译你的Vite和Preact网站 (i18n)',
      it: 'Traduci il tuo sito web Vite e Preact (i18n)',
      pt: 'Traduza o seu site Vite e Preact (i18n)',
      hi: 'Vite और Preact के वेबसाइट को अनुवाद करें (i18n)',
      ar: 'ترجم موقعك الإلكتروني Vite و Preact (i18n)',
      ru: 'Переведите свой сайт Vite и Preact (i18n)',
    }),

    description: t({
      en: 'Discover how to make your Vite and Preact website multilingual. Follow the documentation to internationalize (i18n) and translate it.',
      'en-GB':
        'Discover how to make your Vite and Preact website multilingual. Follow the documentation to internationalise (i18n) and translate it.',
      ar: 'اكتشف كيفية جعل موقعك الإلكتروني باستخدام Vite وPreact متعدد اللغات. اتبع الوثائق لتدويله (i18n) وترجمته.',
      de: 'Erfahren Sie, wie Sie Ihre mit Vite und Preact erstellte Website mehrsprachig gestalten können. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und Übersetzung.',
      es: 'Descubre cómo hacer que tu sitio web con Vite y Preact sea multilingüe. Sigue la documentación para internacionalizarlo (i18n) y traducirlo.',
      fr: 'Découvrez comment rendre votre site web avec Vite et Preact multilingue. Suivez la documentation pour l’internationaliser (i18n) et le traduire.',
      hi: 'जानें कि Vite और Preact का उपयोग करके अपनी वेबसाइट को बहुभाषी कैसे बनाएं। इसे अंतर्राष्ट्रीय (i18n) और अनुवादित करने के लिए प्रलेखन का पालन करें।',
      it: 'Scopri come rendere multilingue il tuo sito web con Vite e Preact. Segui la documentazione per internazionalizzarlo (i18n) e tradurlo.',
      ja: 'ViteとPreactを使ったウェブサイトを多言語対応にする方法を学びましょう。国際化（i18n）と翻訳のためにドキュメントに従ってください。',
      ko: 'Vite와 Preact를 사용한 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위해 문서를 참조하세요.',
      pt: 'Descubra como tornar seu site com Vite e Preact multilíngue. Siga a documentação para internacionalizá-lo (i18n) e traduzi-lo.',
      ru: 'Узнайте, как сделать ваш сайт на Vite и Preact многоязычным. Следуйте документации для интернационализации (i18n) и перевода.',
      zh: '了解如何使您使用 Vite 和 Preact 构建的网站实现多语言支持。请参阅文档以进行国际化（i18n）和翻译。',
    }),
    keywords: t({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
      es: [
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
      de: [
        'Internationalisierung',
        'Dokumentation',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
      ja: [
        '国際化',
        'ドキュメンテーション',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
      ko: ['국제화', '문서', 'Intlayer', 'Vite', 'Preact', 'JavaScript'],
      zh: ['国际化', '文档', 'Intlayer', 'Vite', 'Preact', 'JavaScript'],
      it: [
        'Internazionalizzazione',
        'Documentazione',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
      pt: [
        'Internacionalização',
        'Documentação',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
      hi: [
        'अंतर्राष्ट्रीयकरण',
        'दस्तावेज़ीकरण',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
      ar: [
        'التدويل',
        'ت Documentation',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
      ru: [
        ' интернационализация',
        'Документация',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
      'en-GB': [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Vite',
        'Preact',
        'JavaScript',
      ],
    }),
  },
} satisfies Dictionary<DocData>;

export default docContent;
