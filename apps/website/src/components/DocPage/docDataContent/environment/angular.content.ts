import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const docContent = {
  key: 'doc-intlayer-with-angular-metadata',
  content: {
    title: t({
      en: 'Translate your Angular website (i18n)',
      fr: 'Traduire votre site web Angular (i18n)',
      es: 'Traduce su sitio web Angular (i18n)',
      'en-GB': 'Translate your Angular website (i18n)',
      de: 'Übersetzen Sie Ihre Angular-Website (i18n)',
      ja: 'Angularのウェブサイトを翻訳する (i18n)',
      ko: 'Angular의 웹사이트를 번역하십시오 (i18n)',
      zh: '翻译你的Angular网站 (i18n)',
      it: 'Traduci il tuo sito web Angular (i18n)',
      pt: 'Traduza o seu site Angular (i18n)',
      hi: 'Angular के वेबसाइट को अनुवाद करें (i18n)',
      ar: 'ترجم موقعك الإلكتروني Angular (i18n)',
      ru: 'Переведите свой сайт Angular (i18n)',
    }),

    description: t({
      en: 'Discover how to make your Angular website multilingual. Follow the documentation to internationalize (i18n) and translate it.',
      'en-GB':
        'Discover how to make your Angular website multilingual. Follow the documentation to internationalise (i18n) and translate it.',
      ar: 'اكتشف كيفية جعل موقعك الإلكتروني باستخدام Angular متعدد اللغات. اتبع الوثائق لتدويله (i18n) وترجمته.',
      de: 'Erfahren Sie, wie Sie Ihre mit Angular erstellte Website mehrsprachig gestalten können. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und Übersetzung.',
      es: 'Descubre cómo hacer que tu sitio web con Angular sea multilingüe. Sigue la documentación para internacionalizarlo (i18n) y traducirlo.',
      fr: 'Découvrez comment rendre votre site web avec Angular multilingue. Suivez la documentation pour l’internationaliser (i18n) et le traduire.',
      hi: 'जानें कि Angular का उपयोग करके अपनी वेबसाइट को बहुभाषी कैसे बनाएं। इसे अंतर्राष्ट्रीय (i18n) और अनुवादित करने के लिए प्रलेखन का पालन करें।',
      it: 'Scopri come rendere multilingue il tuo sito web con Angular. Segui la documentazione per internazionalizzarlo (i18n) e tradurlo.',
      ja: 'Angularを使ったウェブサイトを多言語対応にする方法を学びましょう。国際化（i18n）と翻訳のためにドキュメントに従ってください。',
      ko: 'Angular를 사용한 웹사이트를 다국어로 만드는 방법을 알아보세요. 국제화(i18n) 및 번역을 위해 문서를 참조하세요.',
      pt: 'Descubra como tornar seu site com Angular multilíngue. Siga a documentação para internacionalizá-lo (i18n) e traduzi-lo.',
      ru: 'Узнайте, как сделать ваш сайт на Angular многоязычным. Следуйте документации для интернационализации (i18n) и перевода.',
      zh: '了解如何使您使用 Angular 构建的网站实现多语言支持。请参阅文档以进行国际化（i18n）和翻译。',
    }),
    keywords: t({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Angular',
        'JavaScript',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Angular',
        'JavaScript',
      ],
      es: [
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Angular',
        'JavaScript',
      ],
      de: [
        'Internationalisierung',
        'Dokumentation',
        'Intlayer',
        'Angular',
        'JavaScript',
      ],
      ja: [
        '国際化',
        'ドキュメンテーション',
        'Intlayer',
        'Angular',
        'JavaScript',
      ],
      ko: ['국제화', '문서', 'Intlayer', 'Angular', 'JavaScript'],
      zh: ['国际化', '文档', 'Intlayer', 'Angular', 'JavaScript'],
      it: [
        'Internazionalizzazione',
        'Documentazione',
        'Intlayer',
        'Angular',
        'JavaScript',
      ],
      pt: [
        'Internacionalização',
        'Documentação',
        'Intlayer',
        'Angular',
        'JavaScript',
      ],
      hi: [
        'अंतर्राष्ट्रीयकरण',
        'दस्तावेज़ीकरण',
        'Intlayer',
        'Angular',
        'JavaScript',
      ],
      ar: ['التدويل', 'ت Documentation', 'Intlayer', 'Angular', 'JavaScript'],
      ru: [
        ' интернационализация',
        'Документация',
        'Intlayer',
        'Angular',
        'JavaScript',
      ],
      'en-GB': [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Angular',
        'JavaScript',
      ],
    }),
  },
} satisfies Dictionary<Metadata>;

export default docContent;
