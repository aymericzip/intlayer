import { t, type Dictionary } from 'intlayer';

const landingSectionContent = {
  key: 'landing-section',
  content: {
    title: t({
      en: 'Internationalize (i18n) your website React and Next.js easily',
      'en-GB': 'Internationalize (i18n) your website React and Next.js easily',
      fr: 'Internationalisez (i18n) votre site web React et Next.js facilement',
      es: 'Internacionalice (i18n) su sitio web React y Next.js fácilmente',
      de: 'Internationalisieren Sie Ihre Website React und Next.js einfach',
      ja: 'ReactおよびNext.jsを簡単に国際化（i18n）します',
      ko: '웹사이트 React 및 Next.js를 쉽게 국제화 (i18n)하세요',
      zh: '轻松国际化您的网站React和Next.js',
      it: 'Internazionalizza facilmente il tuo sito web React e Next.js',
      pt: 'Internacionalize facilmente seu site React e Next.js',
      hi: 'अपने वेबसाइट React और Next.js को आसानी से अंतर्राष्ट्रीयकरण करें',
      ar: 'سهولة تعريب موقعك الإلكتروني React و Next.js',
      ru: 'Легко интернациализируйте ваш веб-сайт React и Next.js',
    }),
    description: t({
      en: 'Intlayer is an internationalization library designed specifically for JavaScript developers. It allows the declaration of your content throughout your code. It converts multilingual content declarations into structured dictionaries, making integration easy. Using TypeScript, Intlayer strengthens your development and enhances efficiency.',
      'en-GB':
        'Intlayer is an internationalization library designed specifically for JavaScript developers. It allows the declaration of your content throughout your code. It converts multilingual content declarations into structured dictionaries, making integration easy. Using TypeScript, Intlayer strengthens your development and enhances efficiency.',
      fr: "Intlayer est une librarie d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu à n'importe quel endroit dans votre code. Elle convertit la déclaration de votre contenu multilingue en dictionnaires structurés pour faciliter l'intégration dans votre codebase. En utilisant TypeScript, Intlayer rend votre developpement plus fort et efficace.",
      es: 'Intlayer es una librería de internacionalización diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de su contenido en cualquier parte de su código. Convierte la declaración de contenido multilingüe en diccionarios estructurados para facilitar la integración en su base de código. Al utilizar TypeScript, Intlayer fortalece su desarrollo y lo hace más eficiente.',
      de: 'Intlayer ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Es ermöglicht die Deklaration Ihres Inhalts in Ihrem gesamten Code. Es wandelt mehrsprachige Inhaltsdeklarationen in strukturierte Wörterbücher um, wodurch die Integration erleichtert wird. Mit TypeScript stärkt Intlayer Ihre Entwicklung und erhöht die Effizienz.',
      ja: 'Intlayerは、JavaScript開発者向けに特別に設計された国際化ライブラリです。コード全体でコンテンツを宣言できます。多言語コンテンツの宣言を構造化された辞書に変換し、統合を容易にします。TypeScriptを使用することで、Intlayerは開発を強化し、効率を向上させます。',
      ko: 'Intlayer는 JavaScript 개발자를 위해 특별히 설계된 국제화 라이브러리입니다. 코드 전반에 걸쳐 콘텐츠를 선언할 수 있습니다. 다국어 콘텐츠 선언을 구조화된 사전으로 변환하여 통합을 쉽게 만듭니다. TypeScript를 사용하여 Intlayer는 개발을 강화하고 효율성을 향상시킵니다.',
      zh: 'Intlayer是专门为JavaScript开发人员设计的国际化库。它允许在代码中声明您的内容。它将多语言内容声明转换为结构化字典，从而使集成变得容易。使用TypeScript，Intlayer增强了您的开发并提高了效率。',
      it: "Intlayer è una libreria di internazionalizzazione progettata specificamente per gli sviluppatori JavaScript. Consente la dichiarazione dei contenuti in tutto il codice. Converte le dichiarazioni di contenuti multilingue in dizionari strutturati, rendendo l'integrazione semplice. Utilizzando TypeScript, Intlayer rafforza il tuo sviluppo e aumenta l'efficienza.",
      pt: 'Intlayer é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Permite a declaração de seu conteúdo em seu código. Converte declarações de conteúdo multilíngue em dicionários estruturados, facilitando a integração. Ao utilizar TypeScript, o Intlayer fortalece seu desenvolvimento e aumenta a eficiência.',
      hi: 'Intlayer एक अंतरराष्ट्रीयकरण पुस्तकालय है जिसे विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया है। यह आपके कोड में आपके कंटेंट की घोषणा की अनुमति देता है। यह बहुभाषी कंटेंट घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है, जिससे एकीकरण आसान हो जाता है। TypeScript का उपयोग करके, Intlayer आपके विकास को मजबूत करता है और दक्षता को बढ़ाता है।',
      ar: 'Intlayer مكتبة دولية تم تصميمها خصيصًا لمطوري JavaScript. يسمح بإعلان المحتوى الخاص بك في جميع أنحاء التعليمات البرمجية الخاصة بك. تقوم بتحويل إعلانات المحتوى متعددة اللغات إلى قواميس منظمة ، مما يجعل التكامل سهلاً. من خلال استخدام TypeScript ، يعزز Intlayer تطويرك ويعزز الكفاءة.',
      ru: 'Intlayer - это библиотека интернационализации, разработанная специально для разработчиков JavaScript. Она позволяет объявлять ваш контент по всему коду. Она преобразует многоязычные объявления контента в структурированные словари, упрощая интеграцию. Использование TypeScript усиливает вашу разработку и увеличивает эффективность.',
    }),
  },
} satisfies Dictionary;

export default landingSectionContent;
