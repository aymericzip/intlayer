import { GithubRoutes, PagesRoutes } from '@/Routes';
import { DocData } from '@components/DocPage/types';
import { t, type Dictionary } from 'intlayer';

const docContent = {
  key: 'doc-dictionary-auto-fill-metadata',
  content: {
    docName: 'autoFill',
    url: PagesRoutes.Doc_Dictionary_AutoFill,
    githubUrl: GithubRoutes.Dictionary_AutoFill,
    createdAt: '2025-03-13',
    updatedAt: '2025-03-13',
    title: t({
      en: 'Auto Fill',
      'en-GB': 'Auto Fill',
      fr: 'Remplissage automatique',
      es: 'Autocompletado',
      de: 'Automatisches Ausfüllen',
      ja: '自動入力',
      ko: '자동 채우기',
      zh: '自动填充',
      it: 'Compilazione automatica',
      pt: 'Preenchimento automático',
      hi: 'स्वतः भरण',
      ar: 'الملء التلقائي',
      ru: 'Автозаполнение',
    }),

    description: t({
      en: 'Learn how to use auto fill functionality in Intlayer to automatically populate content based on predefined patterns. Follow this documentation to implement auto fill features efficiently in your project.',
      'en-GB':
        'Learn how to use auto fill functionality in Intlayer to automatically populate content based on predefined patterns. Follow this documentation to implement auto fill features efficiently in your project.',
      fr: 'Découvrez comment utiliser la fonctionnalité de remplissage automatique dans Intlayer pour remplir automatiquement le contenu selon des modèles prédéfinis. Suivez cette documentation pour implémenter efficacement les fonctionnalités de remplissage automatique dans votre projet.',
      es: 'Descubre cómo usar la funcionalidad de autocompletado en Intlayer para llenar automáticamente el contenido basado en patrones predefinidos. Sigue esta documentación para implementar características de autocompletado de manera eficiente en tu proyecto.',
      de: 'Erfahren Sie, wie Sie die automatische Ausfüllfunktion in Intlayer nutzen können, um Inhalte basierend auf vordefinierten Mustern automatisch zu füllen. Folgen Sie dieser Dokumentation, um Auto-Fill-Funktionen effizient in Ihr Projekt zu integrieren.',
      ja: 'Intlayerで自動入力機能を使用して、事前定義されたパターンに基づいてコンテンツを自動的に入力する方法を学びます。このドキュメントに従って、プロジェクトに自動入力機能を効率的に実装してください。',
      ko: 'Intlayer에서 자동 채우기 기능을 사용하여 미리 정의된 패턴을 기반으로 콘텐츠를 자동으로 채우는 방법을 배우세요. 이 문서를 따라 프로젝트에 자동 채우기 기능을 효율적으로 구현하세요.',
      zh: '了解如何在Intlayer中使用自动填充功能，根据预定义的模式自动填充内容。按照本文档在您的项目中高效实现自动填充功能。',
      it: 'Scopri come utilizzare la funzionalità di compilazione automatica in Intlayer per popolare automaticamente i contenuti in base a modelli predefiniti. Segui questa documentazione per implementare le funzionalità di compilazione automatica in modo efficiente nel tuo progetto.',
      pt: 'Descubra como usar a funcionalidade de preenchimento automático no Intlayer para preencher automaticamente o conteúdo com base em padrões predefinidos. Siga esta documentação para implementar recursos de preenchimento automático de forma eficiente em seu projeto.',
      hi: 'Intlayer में स्वतः भरण कार्यक्षमता का उपयोग करके पूर्वनिर्धारित पैटर्न के आधार पर सामग्री को स्वचालित रूप से भरने का तरीका जानें। इस दस्तावेज़ का पालन करें और अपने प्रोजेक्ट में स्वतः भरण सुविधाओं को कुशलतापूर्वक लागू करें।',
      ar: 'تعلم كيفية استخدام وظيفة الملء التلقائي في Intlayer لملء المحتوى تلقائيًا بناءً على الأنماط المحددة مسبقًا. اتبع هذه الوثيقة لتنفيذ ميزات الملء التلقائي بكفاءة في مشروعك.',
      ru: 'Узнайте, как использовать функцию автозаполнения в Intlayer для автоматического заполнения контента на основе предопределенных шаблонов. Следуйте этой документации, чтобы эффективно реализовать функции автозаполнения в вашем проекте.',
    }),

    keywords: t({
      en: [
        'Auto Fill',
        'Content Automation',
        'Dynamic Content',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      'en-GB': [
        'Auto Fill',
        'Content Automation',
        'Dynamic Content',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      fr: [
        'Remplissage automatique',
        'Automatisation du contenu',
        'Contenu dynamique',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      es: [
        'Autocompletado',
        'Automatización de contenido',
        'Contenido dinámico',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      de: [
        'Automatisches Ausfüllen',
        'Inhaltsautomatisierung',
        'Dynamischer Inhalt',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      ja: [
        '自動入力',
        'コンテンツ自動化',
        '動的コンテンツ',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      ko: [
        '자동 채우기',
        '콘텐츠 자동화',
        '동적 콘텐츠',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      zh: [
        '自动填充',
        '内容自动化',
        '动态内容',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      it: [
        'Compilazione automatica',
        'Automazione dei contenuti',
        'Contenuto dinamico',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      pt: [
        'Preenchimento automático',
        'Automação de conteúdo',
        'Conteúdo dinâmico',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      hi: [
        'स्वतः भरण',
        'सामग्री स्वचालन',
        'गतिशील सामग्री',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      ar: [
        'الملء التلقائي',
        'أتمتة المحتوى',
        'محتوى ديناميكي',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
      ru: [
        'Автозаполнение',
        'Автоматизация контента',
        'Динамический контент',
        'Intlayer',
        'Next.js',
        'JavaScript',
        'React',
      ],
    }),
  },
} satisfies Dictionary<DocData>;

export default docContent;
