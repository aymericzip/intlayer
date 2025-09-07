import { t, type Dictionary } from 'intlayer';

const landingSectionContent = {
  key: 'landing-section',
  content: {
    title: t({
      en: 'Internationalization focused on scalability',
      'en-GB': 'Internationalization focused on scalability',
      fr: "L'internationalisation axée sur l’évolutivité",
      es: 'La internacionalización enfocada en la escalabilidad',
      de: 'Internationalisierung mit Fokus auf Skalierbarkeit',
      ja: '保守性と拡張性に重点を置いた国際化（i18n）ソリューション',
      ko: '유지 관리성과 확장성에 중점을 둔 국제 솔루션',
      zh: '专注于可维护性和可扩展性的国际化（i18n）解决方案',
      it: "L'internazionalizzazione focalizzata sulla scalabilità",
      pt: 'Internacionalização focada em escalabilidade',
      hi: 'स्केलेबलिटी पर केंद्रित अंतर्राष्ट्रीयकरण',
      ar: 'التدويل المركزي على القابلية التوسع',
      ru: 'Решение для интернационализации, ориентированное на масштабируемость',
      tr: 'Ölçeklenebilirliğe odaklanan uluslararasılaştırma',
    }),
    description: t({
      en: [
        'Intlayer is an internationalization and content management solution designed specifically for developers. Make your code maintainable and scalable. Available for React, Next.js, Vue, Svelte, and more.',
        'Collaborate with your team and simplify your content editing by externalizing it with a component-oriented CMS. Leverage AI tools to accelerate writing and automate translations.',
      ],
      'en-GB': [
        'Intlayer is an internationalization and content management solution designed specifically for developers. Make your code maintainable and scalable. Available for React, Next.js, Vue, Svelte, and more.',
        'Collaborate with your team and simplify your content editing by externalizing it with a component-oriented CMS. Leverage AI tools to accelerate writing and automate translations.',
      ],
      fr: [
        'Intlayer est une solution d’internationalisation et de gestion de contenu conçue spécialement pour les développeurs. Rendez votre code maintenable et évolutif. Disponible pour React, Next.js, Vue, Svelte et d’autres.',
        'Collaborez avec votre équipe et facilitez l’édition de contenu en l’externalisant grâce à un CMS orienté composants. Profitez des outils d’IA pour accélérer vos rédactions et automatiser vos traductions.',
      ],
      es: [
        'Intlayer es una solución de internacionalización y gestión de contenido diseñada especialmente para desarrolladores. Haz que tu código sea mantenible y escalable. Disponible para React, Next.js, Vue, Svelte y más.',
        'Colabora con tu equipo y facilita la edición de contenido externalizándolo mediante un CMS orientado a componentes. Aprovecha las herramientas de IA para acelerar la redacción y automatizar las traducciones.',
      ],
      de: [
        'Intlayer ist eine Lösung für Internationalisierung und Content-Management, die speziell für Entwickler entwickelt wurde. Machen Sie Ihren Code wartbar und skalierbar. Verfügbar für React, Next.js, Vue, Svelte und mehr.',
        'Arbeiten Sie im Team zusammen und vereinfachen Sie die Inhaltsbearbeitung, indem Sie sie mit einem komponentenorientierten CMS auslagern. Nutzen Sie KI-Tools, um die Texterstellung zu beschleunigen und Übersetzungen zu automatisieren.',
      ],
      ja: [
        'Intlayerは、開発者向けに特別に設計された国際化およびコンテンツ管理ソリューションです。コードの保守性と拡張性を向上させましょう。React、Next.js、Vue、Svelteなどに対応しています。',
        'チームで協力し、コンポーネント指向CMSを用いてコンテンツ編集を外部化することで簡素化しましょう。AIツールを活用して執筆を加速し、翻訳を自動化します。',
      ],
      ko: [
        'Intlayer는 개발자를 위해 특별히 설계된 국제화 및 콘텐츠 관리 솔루션입니다. 코드를 유지 보수 가능하고 확장 가능하게 만드세요. React, Next.js, Vue, Svelte 등에서 사용할 수 있습니다.',
        '팀과 협력하여 컴포넌트 지향 CMS로 콘텐츠 편집을 외부화하고 간소화하세요. AI 도구를 활용하여 작성 속도를 높이고 번역을 자동화하세요.',
      ],
      zh: [
        'Intlayer 是专为开发者设计的国际化和内容管理解决方案。让您的代码更易维护和扩展。支持 React、Next.js、Vue、Svelte 等框架。',
        '与您的团队协作，通过组件化 CMS 外部化内容编辑并加以简化。利用 AI 工具加速写作并自动化翻译。',
      ],
      it: [
        'Intlayer è una soluzione di internazionalizzazione e gestione dei contenuti progettata appositamente per gli sviluppatori. Rendi il tuo codice manutenibile ed evolutivo. Disponibile per React, Next.js, Vue, Svelte e altro ancora.',
        'Collabora con il tuo team e semplifica l’editing dei contenuti esternalizzandoli tramite un CMS orientato ai componenti. Sfrutta gli strumenti di IA per accelerare la scrittura e automatizzare le traduzioni.',
      ],
      pt: [
        'Intlayer é uma solução de internacionalização e gestão de conteúdo projetada especialmente para desenvolvedores. Torne seu código mais fácil de manter e escalável. Disponível para React, Next.js, Vue, Svelte e outros.',
        'Colabore com sua equipe e simplifique a edição de conteúdo externalizando-o com um CMS orientado a componentes. Aproveite as ferramentas de IA para acelerar a redação e automatizar as traduções.',
      ],
      hi: [
        'Intlayer एक अंतर्राष्ट्रीयकरण और सामग्री प्रबंधन समाधान है, जिसे विशेष रूप से डेवलपर्स के लिए डिज़ाइन किया गया है। अपने कोड को बनाए रखने योग्य और स्केलेबल बनाएं। React, Next.js, Vue, Svelte आदि के लिए उपलब्ध।',
        'अपनी टीम के साथ सहयोग करें और एक कम्पोनेंट ओरिएंटेड CMS के माध्यम से कंटेंट एडिटिंग को सरल बनाएं। लेखन को तेज करने और अनुवादों को स्वचालित करने के लिए AI टूल्स का उपयोग करें।',
      ],
      ar: [
        'Intlayer هو حل للتدويل وإدارة المحتوى مصمم خصيصًا للمطورين. اجعل كودك سهل الصيانة وقابلًا للتوسع. متاح لتطبيقات React و Next.js و Vue و Svelte وغيرها.',
        'تعاون مع فريقك وسهّل إدارة المحتوى الخاص بك عبر تصديره باستخدام CMS موجه للمكونات. واستفد من أدوات الذكاء الاصطناعي لتسريع الكتابة وأتمتة الترجمات.',
      ],
      ru: [
        'Intlayer - это решение для интернационализации и управления контентом, специально разработанное для разработчиков. Сделайте ваш код поддерживаемым и масштабируемым. Доступно для React, Next.js, Vue, Svelte и других.',
        'Работайте в команде и упростите редактирование контента, вынеся его в CMS, ориентированную на компоненты. Используйте ИИ-инструменты для ускорения написания и автоматизации переводов.',
      ],
      tr: [
        'Intlayer, özellikle geliştiriciler için tasarlanmış bir uluslararasılaştırma ve içerik yönetim çözümüdür. Kodunuzu sürdürülebilir ve ölçeklenebilir hale getirin. React, Next.js, Vue, Svelte ve daha fazlası için kullanılabilir.',
        'Ekibinizle iş birliği yapın ve bileşen odaklı bir CMS ile içeriğinizi dışsallaştırarak düzenlemeyi basitleştirin. Yazmayı hızlandırmak ve çevirileri otomatikleştirmek için yapay zeka araçlarından yararlanın.',
      ],
    }),
    keyPoints: [
      'TypeScript',
      t({
        en: 'React / Next.js / Vue / Svelte / and more',
        'en-GB': 'React / Next.js / Vue / Svelte / and more',
        fr: 'React / Next.js / Vue / Svelte / et plus encore',
        es: 'React / Next.js / Vue / Svelte / y más',
        de: 'React / Next.js / Vue / Svelte / und mehr',
        ja: 'React / Next.js / Vue / Svelte など対応',
        ko: 'React / Next.js / Vue / Svelte 등 지원',
        zh: '支持 React / Next.js / Vue / Svelte 等',
        it: 'React / Next.js / Vue / Svelte e altro',
        pt: 'React / Next.js / Vue / Svelte e mais',
        hi: 'React / Next.js / Vue / Svelte और अन्य',
        ar: 'React / Next.js / Vue / Svelte والمزيد',
        ru: 'React / Next.js / Vue / Svelte и другие',
        tr: 'React / Next.js / Vue / Svelte ve daha fazlası',
      }),
      t({
        en: 'AI powered Visual Editor / CMS',
        'en-GB': 'AI powered Visual Editor / CMS',
        fr: 'Éditeur visuel / CMS propulsé par l’IA',
        es: 'Editor visual / CMS impulsado por IA',
        de: 'Kostenloser KI-gestützter visueller Editor / CMS',
        ja: '無料のAI搭載ビジュアルエディタ / CMS',
        ko: '무료 AI 기반 비주얼 에디터 / CMS',
        zh: '免费AI驱动的可视化编辑器 / CMS',
        it: 'Editor visivo / CMS basato su IA',
        pt: 'Editor visual / CMS com IA',
        hi: 'फ्री AI संचालित विज़ुअल एडिटर / CMS',
        ar: 'محرر مرئي / CMS مجاني مدعوم بالذكاء الاصطناعي',
        ru: 'Бесплатный визуальный редактор / CMS на базе ИИ',
        tr: 'Ücretsiz AI destekli Görsel Editör / CMS',
      }),
      t({
        en: 'Modern set up and user experience',
        'en-GB': 'Modern set up and user experience',
        fr: 'Installation moderne et expérience utilisateur optimisée',
        es: 'Configuración moderna y experiencia de usuario optimizada',
        de: 'Moderne Einrichtung und optimiertes Benutzererlebnis',
        ja: '最新のセットアップと最適なユーザー体験',
        ko: '현대적인 설정과 최적화된 사용자 경험',
        zh: '现代化设置与优化的用户体验',
        it: 'Configurazione moderna e esperienza utente ottimizzata',
        pt: 'Configuração moderna e experiência do usuário otimizada',
        hi: 'आधुनिक सेटअप और बेहतरीन उपयोगकर्ता अनुभव',
        ar: 'إعداد حديث وتجربة مستخدم محسّنة',
        ru: 'Современная настройка и оптимизированный пользовательский опыт',
        tr: 'Modern kurulum ve optimize edilmiş kullanıcı deneyimi',
      }),
    ],
  },
} satisfies Dictionary;

export default landingSectionContent;
