import { type Dictionary, t } from 'intlayer';

const metadataContent = {
  key: 'doc-search-page-metadata',
  content: {
    title: t({
      ar: 'البحث في وثائق Intlayer | Intlayer',
      de: 'Intlayer-Dokumentation durchsuchen | Intlayer',
      en: 'Search the Intlayer Documentation | Intlayer',
      'en-GB': 'Search the Intlayer Documentation | Intlayer',
      es: 'Buscar en la documentación de Intlayer | Intlayer',
      fr: 'Rechercher dans la documentation Intlayer | Intlayer',
      hi: 'Intlayer दस्तावेज़ में खोजें | Intlayer',
      it: 'Cerca nella documentazione Intlayer | Intlayer',
      ja: 'Intlayer ドキュメントを検索 | Intlayer',
      ko: 'Intlayer 문서 검색 | Intlayer',
      pt: 'Pesquisar na documentação do Intlayer | Intlayer',
      ru: 'Поиск по документации Intlayer | Intlayer',
      tr: 'Intlayer dokümantasyonunda ara | Intlayer',
      zh: '搜索 Intlayer 文档 | Intlayer',
      pl: 'Szukaj w dokumentacji Intlayer | Intlayer',
      id: 'Cari di dokumentasi Intlayer | Intlayer',
      vi: 'Tìm kiếm trong tài liệu Intlayer | Intlayer',
      uk: 'Пошук у документації Intlayer | Intlayer',
    }),

    description: t({
      ar: 'ابحث في وثائق Intlayer عن الأدلة ومراجع الـ API وأمثلة التكامل مع React وNext.js وVue وSvelte.',
      de: 'Durchsuchen Sie die Intlayer-Dokumentation nach Guides, API-Referenzen und Integrationsbeispielen für React, Next.js, Vue und Svelte.',
      en: 'Search the Intlayer documentation for guides, API references and integration examples for React, Next.js, Vue and Svelte.',
      'en-GB':
        'Search the Intlayer documentation for guides, API references and integration examples for React, Next.js, Vue and Svelte.',
      es: 'Busca en la documentación de Intlayer guías, referencias de API y ejemplos de integración para React, Next.js, Vue y Svelte.',
      fr: "Recherchez dans la documentation Intlayer des guides, des références d'API et des exemples d'intégration pour React, Next.js, Vue et Svelte.",
      hi: 'React, Next.js, Vue और Svelte के लिए गाइड, API संदर्भ और एकीकरण उदाहरण Intlayer दस्तावेज़ में खोजें।',
      it: 'Cerca nella documentazione Intlayer guide, riferimenti API ed esempi di integrazione per React, Next.js, Vue e Svelte.',
      ja: 'React、Next.js、Vue、Svelte 向けのガイド、API リファレンス、統合例を Intlayer ドキュメントから検索できます。',
      ko: 'React, Next.js, Vue, Svelte용 가이드와 API 레퍼런스, 통합 예제를 Intlayer 문서에서 검색하세요.',
      pt: 'Pesquise na documentação do Intlayer por guias, referências de API e exemplos de integração para React, Next.js, Vue e Svelte.',
      ru: 'Ищите в документации Intlayer руководства, справочники API и примеры интеграции для React, Next.js, Vue и Svelte.',
      tr: 'React, Next.js, Vue ve Svelte için rehberleri, API referanslarını ve entegrasyon örneklerini Intlayer dokümantasyonunda arayın.',
      zh: '在 Intlayer 文档中搜索 React、Next.js、Vue 和 Svelte 的指南、API 参考和集成示例。',
      pl: 'Przeszukaj dokumentację Intlayer w poszukiwaniu poradników, referencji API i przykładów integracji dla React, Next.js, Vue i Svelte.',
      id: 'Cari panduan, referensi API, dan contoh integrasi untuk React, Next.js, Vue, dan Svelte di dokumentasi Intlayer.',
      vi: 'Tìm kiếm hướng dẫn, tài liệu API và ví dụ tích hợp cho React, Next.js, Vue và Svelte trong tài liệu Intlayer.',
      uk: 'Шукайте в документації Intlayer посібники, довідники API та приклади інтеграції для React, Next.js, Vue і Svelte.',
    }),
  },
  title: 'Documentation search page metadata',
  description:
    'Metadata for the documentation search page: title and description used for SEO and social sharing.',
  tags: ['page metadata', 'documentation', 'search page'],
} satisfies Dictionary;

export default metadataContent;
