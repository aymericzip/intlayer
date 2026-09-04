import { type Dictionary, t } from 'intlayer';

export default {
  key: 'markdown-software-structured-data',
  content: {
    description: t({
      en: 'The Intlayer Markdown engine is a dependency-free Markdown and MDX renderer for React, Next.js, Vue, Svelte, Solid, Preact and Angular. It parses on the server into a serialisable AST, exposes typed frontmatter metadata, accepts global and per-node component overrides, and is purged from the bundle when unused.',
      'en-GB':
        'The Intlayer Markdown engine is a dependency-free Markdown and MDX renderer for React, Next.js, Vue, Svelte, Solid, Preact and Angular. It parses on the server into a serialisable AST, exposes typed frontmatter metadata, accepts global and per-node component overrides, and is purged from the bundle when unused.',
      fr: "Le moteur Markdown d'Intlayer est un moteur de rendu Markdown et MDX sans dépendance pour React, Next.js, Vue, Svelte, Solid, Preact et Angular. Il analyse côté serveur en un AST sérialisable, expose des métadonnées de frontmatter typées, accepte des surcharges de composants globales ou par nœud, et est purgé du bundle s'il n'est pas utilisé.",
      es: 'El motor Markdown de Intlayer es un renderizador Markdown y MDX sin dependencias para React, Next.js, Vue, Svelte, Solid, Preact y Angular. Analiza en el servidor hacia un AST serializable, expone metadatos de frontmatter tipados, acepta sobrescrituras de componentes globales o por nodo y se elimina del bundle si no se usa.',
      de: 'Die Markdown-Engine von Intlayer ist ein abhängigkeitsfreier Markdown- und MDX-Renderer für React, Next.js, Vue, Svelte, Solid, Preact und Angular. Sie parst auf dem Server in einen serialisierbaren AST, stellt typisierte Frontmatter-Metadaten bereit, erlaubt globale und Node-bezogene Komponenten-Overrides und wird bei Nichtnutzung aus dem Bundle entfernt.',
      ja: 'Intlayer の Markdown エンジンは、React、Next.js、Vue、Svelte、Solid、Preact、Angular 向けの依存関係のない Markdown / MDX レンダラーです。サーバー側でシリアライズ可能な AST に解析し、型付きのフロントマターを公開し、全体およびノード単位のコンポーネント上書きに対応し、未使用ならバンドルから削除されます。',
      ko: 'Intlayer의 Markdown 엔진은 React, Next.js, Vue, Svelte, Solid, Preact, Angular를 위한 의존성 없는 Markdown 및 MDX 렌더러입니다. 서버에서 직렬화 가능한 AST로 파싱하고, 타입이 지정된 프론트매터 메타데이터를 노출하며, 전역 및 노드별 컴포넌트 오버라이드를 지원하고, 사용하지 않으면 번들에서 제거됩니다.',
      zh: 'Intlayer 的 Markdown 引擎是面向 React、Next.js、Vue、Svelte、Solid、Preact 和 Angular 的零依赖 Markdown 与 MDX 渲染器。它在服务端解析为可序列化的 AST，暴露带类型的 frontmatter 元数据，支持全局与按节点的组件覆盖，未使用时会从打包结果中移除。',
      it: 'Il motore Markdown di Intlayer è un renderer Markdown e MDX senza dipendenze per React, Next.js, Vue, Svelte, Solid, Preact e Angular. Analizza sul server in un AST serializzabile, espone metadati frontmatter tipizzati, accetta override di componenti globali o per nodo e viene rimosso dal bundle se inutilizzato.',
      pt: 'O motor Markdown do Intlayer é um renderizador Markdown e MDX sem dependências para React, Next.js, Vue, Svelte, Solid, Preact e Angular. Ele analisa no servidor para um AST serializável, expõe metadados de frontmatter tipados, aceita sobrescritas de componentes globais ou por nó e é removido do bundle quando não usado.',
      hi: 'Intlayer का Markdown इंजन React, Next.js, Vue, Svelte, Solid, Preact और Angular के लिए बिना निर्भरता वाला Markdown व MDX रेंडरर है। यह सर्वर पर सीरियलाइज़ेबल AST में पार्स करता है, टाइप्ड frontmatter मेटाडेटा देता है, वैश्विक व नोड-वार कंपोनेंट ओवरराइड स्वीकारता है, और अप्रयुक्त होने पर बंडल से हटा दिया जाता है।',
      ar: 'محرك Markdown من Intlayer هو محرك عرض لـ Markdown و MDX بلا تبعيات، لـ React و Next.js و Vue و Svelte و Solid و Preact و Angular. يحلل على الخادم إلى شجرة AST قابلة للتسلسل، ويتيح بيانات frontmatter مُنمَّطة، ويقبل تجاوزات مكوّنات عامة ولكل عقدة، ويُزال من الحزمة عند عدم استخدامه.',
      ru: 'Движок Markdown в Intlayer — это рендерер Markdown и MDX без зависимостей для React, Next.js, Vue, Svelte, Solid, Preact и Angular. Он разбирает документ на сервере в сериализуемый AST, предоставляет типизированные метаданные frontmatter, поддерживает глобальные и поузловые переопределения компонентов и удаляется из бандла, если не используется.',
      tr: "Intlayer'ın Markdown motoru; React, Next.js, Vue, Svelte, Solid, Preact ve Angular için bağımlılıksız bir Markdown ve MDX rendererıdır. Sunucuda serileştirilebilir bir AST'ye ayrıştırır, tipli frontmatter meta verileri sunar, küresel ve düğüm bazlı bileşen geçersiz kılmalarını kabul eder ve kullanılmadığında paketten kaldırılır.",
      pl: 'Silnik Markdown w Intlayerze to renderer Markdown i MDX bez zależności dla React, Next.js, Vue, Svelte, Solid, Preact i Angular. Parsuje na serwerze do serializowalnego AST, udostępnia typowane metadane frontmatter, przyjmuje globalne i węzłowe nadpisania komponentów oraz jest usuwany z bundla, gdy nie jest używany.',
      id: 'Mesin Markdown Intlayer adalah renderer Markdown dan MDX tanpa dependensi untuk React, Next.js, Vue, Svelte, Solid, Preact, dan Angular. Ia mengurai di server menjadi AST yang dapat diserialisasi, menyediakan metadata frontmatter bertipe, menerima override komponen global maupun per node, dan dihapus dari bundel bila tidak dipakai.',
      vi: 'Bộ máy Markdown của Intlayer là trình kết xuất Markdown và MDX không phụ thuộc, dành cho React, Next.js, Vue, Svelte, Solid, Preact và Angular. Nó phân tích trên máy chủ thành AST tuần tự hóa được, cung cấp siêu dữ liệu frontmatter có kiểu, chấp nhận ghi đè thành phần toàn cục và theo node, và bị loại khỏi bundle khi không dùng.',
      uk: 'Рушій Markdown в Intlayer — це рендерер Markdown і MDX без залежностей для React, Next.js, Vue, Svelte, Solid, Preact та Angular. Він розбирає документ на сервері в серіалізовний AST, надає типізовані метадані frontmatter, приймає глобальні та повузлові перевизначення компонентів і вилучається з бандла, якщо не використовується.',
    }),
  },
  title: 'Markdown Software Application structured data',
  description: 'Structured data for the Intlayer Markdown engine.',
  tags: ['structured data', 'markdown', 'SEO'],
} satisfies Dictionary;
