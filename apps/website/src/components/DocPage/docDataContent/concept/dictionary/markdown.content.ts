import { GithubRoutes, PagesRoutes } from '@/Routes';
import { DocData } from '@components/DocPage/types';
import { Dictionary, t } from 'intlayer';

const docContent = {
  key: 'doc-dictionary-markdown-metadata',
  content: {
    docName: 'dictionary__markdown',
    url: PagesRoutes.Doc_Dictionary_Markdown,
    githubUrl: GithubRoutes.Dictionary_Markdown,
    createdAt: '2025-02-7',
    updatedAt: '2025-02-7',
    title: 'Markdown',
    description: t({
      en: 'Learn how to declare and use Markdown content in your multilingual website with Intlayer. Follow the steps in this online documentation to integrate Markdown seamlessly into your project.',
      'en-GB':
        'Learn how to declare and use Markdown content in your multilingual website with Intlayer. Follow the steps in this online documentation to integrate Markdown seamlessly into your project.',
      fr: 'Découvrez comment déclarer et utiliser du contenu Markdown dans votre site web multilingue avec Intlayer. Suivez les étapes de cette documentation en ligne pour intégrer Markdown facilement dans votre projet.',
      es: 'Descubre cómo declarar y utilizar contenido Markdown en tu sitio web multilingüe con Intlayer. Sigue los pasos de esta documentación en línea para integrar Markdown sin problemas en tu proyecto.',
      de: 'Erfahren Sie, wie Sie Markdown-Inhalte in Ihrer mehrsprachigen Website mit Intlayer deklarieren und verwenden. Folgen Sie den Schritten in dieser Online-Dokumentation, um Markdown nahtlos in Ihr Projekt zu integrieren.',
      ja: 'Intlayerを使用して多言語ウェブサイトにMarkdownコンテンツを宣言および使用する方法を学びます。このオンラインドキュメントの手順に従って、プロジェクトにMarkdownを簡単に統合しましょう。',
      ko: 'Intlayer를 사용하여 다국어 웹사이트에서 Markdown 콘텐츠를 선언하고 사용하는 방법을 알아보세요. 이 온라인 문서의 단계를 따라 프로젝트에 Markdown을 손쉽게 통합하세요.',
      zh: '了解如何在多语言网站中使用Intlayer声明和使用Markdown内容。按照此在线文档中的步骤，将Markdown无缝集成到您的项目中。',
      it: 'Scopri come dichiarare e utilizzare contenuti Markdown nel tuo sito web multilingue con Intlayer. Segui i passaggi in questa documentazione online per integrare Markdown nel tuo progetto in modo semplice.',
      pt: 'Descubra como declarar e usar conteúdo Markdown no seu site multilíngue com o Intlayer. Siga os passos nesta documentação online para integrar o Markdown de forma simples ao seu projeto.',
      ar: 'تعرف على كيفية إعلان واستخدام محتوى Markdown في موقعك متعدد اللغات باستخدام Intlayer. اتبع الخطوات في هذه الوثيقة الإلكترونية لدمج Markdown بسلاسة في مشروعك.',
      ru: 'Узнайте, как объявлять и использовать Markdown-контент на вашем многоязычном сайте с помощью Intlayer. Следуйте шагам этой онлайн-документации, чтобы без проблем интегрировать Markdown в ваш проект.',
      hi: 'Intlayer के साथ अपने बहुभाषी वेबसाइट में Markdown सामग्री को घोषित करने और उपयोग करने का तरीका जानें। इस ऑनलाइन डाक्यूमेंटेशन में दिए गए चरणों का पालन करें और अपने प्रोजेक्ट में Markdown को आसानी से एकीकृत करें।',
    }),
    keywords: [
      'Markdown',
      t({
        en: 'Internationalization',
        'en-GB': 'Internationalisation',
        fr: 'Internationalisation',
        es: 'Internacionalización',
        de: 'Internationalisierung',
        ja: '国際化',
        ko: '국제화',
        zh: '国际化',
        it: 'Internazionalizzazione',
        pt: 'Internacionalização',
        hi: 'अंतर्राष्ट्रीयकरण',
        ar: 'دوليّة',
        ru: 'Интернационализация',
      }),
      t({
        en: 'Documentation',
        'en-GB': 'Documentation',
        fr: 'Documentation',
        es: 'Documentación',
        de: 'Dokumentation',
        ja: '文書',
        ko: '문서',
        zh: '文档',
        it: 'Documentazione',
        pt: 'Documentação',
        hi: 'प्रलेखन',
        ar: 'وثائق',
        ru: 'Документация',
      }),
      'Intlayer',
      'Next.js',
      'JavaScript',
      'React',
    ],
  },
} satisfies Dictionary<DocData>;

export default docContent;
