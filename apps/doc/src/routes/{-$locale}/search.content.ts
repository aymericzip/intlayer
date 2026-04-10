import { type Dictionary, t } from 'intlayer';

const pageContent = {
  key: 'doc-search-page',
  content: {
    title: t({
      ar: 'البحث في المستند',
      de: 'In der Dokumentation suchen',
      en: 'Search in doc',
      'en-GB': 'Search in doc',
      es: 'Buscar en la doc',
      fr: 'Rechercher dans la doc',
      hi: 'दस्तावेज़ में खोजें',
      it: 'Cerca nella doc',
      ja: 'ドキュメントで検索',
      ko: '문서에서 검색',
      pt: 'Pesquisar na doc',
      ru: 'Поиск в документации',
      tr: 'Dokümanda ara',
      zh: '在文档中搜索',
      pl: 'Szukaj w dokumentacji',
      id: 'Cari di dokumentasi',
      vi: 'Tìm kiếm trong tài liệu',
      uk: 'Пошук у документації',
    }),
    description: t({
      ar: 'ابحث في وثائقنا الشاملة للعثور بسرعة على الأدلة والمراجع والنصائح التي تحتاجها.',
      de: 'Durchsuchen Sie unsere umfassende Dokumentation, um schnell die benötigten Anleitungen, Referenzen und Tipps zu finden.',
      en: 'Search through our comprehensive documentation to quickly find the guides, references, and tips you need.',
      'en-GB':
        'Search through our comprehensive documentation to quickly find the guides, references, and tips you need.',
      es: 'Busca en nuestra completa documentación para encontrar rápidamente las guías, referencias y consejos que necesitas.',
      fr: 'Recherchez dans notre documentation complète pour trouver rapidement les guides, références et conseils dont vous avez besoin.',
      hi: 'अपनी ज़रूरत के गाइड, संदर्भ और सुझाव तुरंत खोजने के लिए हमारे व्यापक दस्तावेज़ीकरण के माध्यम से खोजें।',
      it: 'Cerca nella nostra documentazione completa per trovare rapidamente le guide, i riferimenti e i suggerimenti di cui hai bisogno.',
      ja: '当社の包括的なドキュメントを検索して、必要なガイド、リファレンス、ヒントをすばやく見つけてください。',
      ko: '필요한 가이드, 참조 및 팁을 빠르게 찾으려면 당사의 포괄적인 문서를 검색하십시오.',
      pt: 'Pesquise em nossa documentação abrangente para encontrar rapidamente os guias, referências e dicas de que você precisa.',
      ru: 'Ищите в нашей обширной документации, чтобы быстро найти нужные руководства, справочники и советы.',
      tr: 'İhtiyacınız olan kılavuzları, referansları ve ipuçlarını hızlıca bulmak için kapsamlı dokümantasyonumuzda arama yapın.',
      zh: '搜索我们的全面文档，快速找到您需要的指南、参考和提示。',
      pl: 'Przeszukuj naszą obszerną dokumentację, aby szybko znaleźć potrzebne przewodniki, odniesienia i wskazówki.',
      id: 'Cari melalui dokumentasi lengkap kami untuk menemukan panduan, referensi, dan tips yang Anda butuhkan dengan cepat.',
      vi: 'Tìm kiếm trong tài liệu toàn diện của chúng tôi để nhanh chóng tìm thấy các hướng dẫn, tài liệu tham khảo và mẹo bạn cần.',
      uk: 'Шукайте в нашій всеосяжній документації, щоб швидко знайти потрібні посібники, довідники та поради.',
    }),
  },
  title: 'Documentation search page',
  description:
    'Content declaration for the documentation search page, defining the page title and supporting multilingual display.',
  tags: ['documentation', 'search page'],
} satisfies Dictionary;

export default pageContent;
