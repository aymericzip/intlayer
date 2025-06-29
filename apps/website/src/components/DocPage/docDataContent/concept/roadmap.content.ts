import { GithubRoutes, PagesRoutes } from '@/Routes';
import { DocData } from '@components/DocPage/types';
import { Dictionary, t } from 'intlayer';

const docContent = {
  key: 'doc-roadmap-metadata',
  content: {
    docName: 'roadmap',
    url: PagesRoutes.Doc_Roadmap,
    githubUrl: GithubRoutes.Roadmap,
    createdAt: '2025-03-01',
    updatedAt: '2025-03-01',
    title: t({
      en: 'Roadmap',
      fr: 'Feuille de route',
      es: 'Hoja de ruta',
      'en-GB': 'Roadmap',
      de: 'Fahrplan',
      ja: 'ロードマップ',
      ko: '로드맵',
      zh: '路线图',
      it: 'Tabella di marcia',
      pt: 'Roteiro',
      hi: 'रोडमैप',
      ar: 'خريطة الطريق',
      ru: 'Дорожная карта',
    }),

    description: t({
      en: 'Discover the roadmap of Intlayer. See all the features that Intlayer implemented, and is planning to implement.',
      'en-GB':
        'Discover the roadmap of Intlayer. See all the features that Intlayer implemented, and is planning to implement.',
      fr: "Découvrez la roadmap d'Intlayer. Voir toutes les fonctionnalités que l'Intlayer a implémentées, et qu'il prévoit d'implémenter.",
      es: 'Descubre el roadmap de Intlayer. Vea todas las funciones que Intlayer implementó, y está planeando implementarlas.',
      de: 'Entdecken Sie die Roadmap von Intlayer. Sehen Sie alle Funktionen, die Intlayer implementiert hat, und ist dabei, diese zu implementieren.',
      ja: 'Intlayerのロードマップを発見してください。すべてのフィーチャを見てください。Intlayerが実装したすべての機能を確認し、実装する予定の機能を確認してください。',
      ko: 'Intlayer의 로드맵을 발견하세요. 모든 기능을 알아보세요. Intlayer가 구현한 모든 기능을 검토하고 구현할 계획을 검토하세요.',
      it: "Scopri la roadmap di Intlayer. Vedi tutte le funzionalità che l'Intlayer ha implementato, e sta pianificando di implementarle.",
      pt: 'Descubra o roadmap do Intlayer. Veja todas as funcionalidades que o Intlayer implementou, e está planejando implementar.',
      zh: '发现Intlayer的路线图。查看所有已实现的Intlayer功能，并查看它打算实现的功能。',
      hi: 'जानें कि Intlayer की रूडमैप पता लगाएं। सभी क्षेत्रों को देखें, और इसे अनुस्मारित करने के लिए इसे देखें।',
      ar: 'اكتشف الطريق التالي للرواد مايكروسفت. اطلع على جميع الميزات التي تم تنفيذها في التطبيق، والذي يقترح بتنفيذها.',
      ru: 'Откройте свой путь к Intlayer. Просмотрите все функции, которые были реализованы в Intlayer, и о том, как они будут реализованы.',
    }),
    keywords: [
      'Roadmap',
      'Intlayer',
      t({
        en: 'Internationalization',
        'en-GB': 'Internationalization',
        fr: 'Internationalisation',
        es: 'Internacionalización',
        de: 'Internationalisierung',
        ja: '国際化',
        ko: '국제화',
        zh: '国际化',
        it: 'Internazionalizzazione',
        pt: 'Internacionalização',
        hi: 'अनेक भाषा',
        ar: 'الترجمة',
        ru: 'Интернационализация',
      }),
      'CMS',
      t({
        en: 'Content Management System',
        'en-GB': 'Content Management System',
        fr: 'Système de gestion de contenu',
        es: 'Sistema de gestión de contenido',
        de: 'Inhaltsmanagementsystem',
        ja: 'コンテンツマネジメントシステム',
        ko: '콘텐츠 관리 시스템',
        zh: '内容管理系统',
        it: 'Sistema di gestione dei contenuti',
        pt: 'Sistema de gerenciamento de conteúdo',
        hi: 'सामग्री प्रबंधन सिस्टम',
        ar: 'نظام إدارة المحتوى',
        ru: 'Система управления контентом',
      }),
      t({
        en: 'Visual Editor',
        'en-GB': 'Visual Editor',
        fr: 'Éditeur visuel',
        es: 'Editor visual',
        de: 'Visual Editor',
        ja: 'ビジュアルエディター',
        ko: '비주얼 편집기',
        zh: '视觉编辑器',
        it: 'Editor visuale',
        pt: 'Editor visual',
        hi: 'व्हिडिओ संपादक',
        ar: 'محرر المرئيات',
        ru: 'Визуальный редактор',
      }),
    ],
  },
} satisfies Dictionary<DocData>;

export default docContent;
