import { type Dictionary, t } from 'intlayer';
import type { Metadata } from 'next';

const metadataContent = {
  key: 'blog-search-metadata',
  content: {
    title: t({
      ar: 'البحث في المدونة | إنتلير',
      de: 'Im Blog suchen | Intlayer',
      en: 'Search in blog | Intlayer',
      'en-GB': 'Search in blog | Intlayer',
      es: 'Buscar en el blog | Intlayer',
      fr: 'Rechercher dans le blog | Intlayer',
      hi: 'ब्लॉग में खोजें | इंटलेयर',
      it: 'Cerca nel blog | Intlayer',
      ja: 'ブログで検索 | Intlayer',
      ko: '블로그에서 검색 | Intlayer',
      pt: 'Pesquisar no blog | Intlayer',
      ru: 'Поиск в блоге | Интлайер',
      tr: 'Blogda ara | Intlayer',
      zh: '在博客中搜索 | Intlayer',
      pl: 'Szukaj w blogu | Intlayer',
    }),
    description: t({
      ar: 'البحث في الوثائق',
      de: 'Dokumentation durchsuchen',
      en: 'Search blog',
      'en-GB': 'Search blog',
      es: 'Buscar blogumentación',
      fr: 'Rechercher la blog',
      hi: 'दस्तावेज़ खोजें',
      it: 'Cerca nella blogumentazione',
      ja: 'ドキュメントを検索',
      ko: '문서 검색',
      pt: 'Pesquisar blogumentação',
      ru: 'Поиск документации',
      tr: 'Belgelerde ara',
      zh: '搜索文档',
      pl: 'Szukaj w blogu',
    }),

    keywords: t({
      ar: ['بحث', 'وثيقة', 'intlayer'],
      de: ['suchen', 'dokumentation', 'intlayer'],
      en: ['search', 'blog', 'intlayer'],
      'en-GB': ['search', 'blog', 'intlayer'],
      es: ['buscar', 'blogumentación', 'intlayer'],
      fr: ['rechercher', 'blog', 'intlayer'],
      hi: ['खोज', 'दस्तावेज़', 'intlayer'],
      it: ['cerca', 'blogumentazione', 'intlayer'],
      ja: ['検索', 'ドキュメント', 'intlayer'],
      ko: ['검색', '문서', 'intlayer'],
      pt: ['pesquisar', 'blogumentação', 'intlayer'],
      ru: ['поиск', 'документация', 'intlayer'],
      tr: ['ara', 'belgeler', 'intlayer'],
      zh: ['搜索', '文档', 'intlayer'],
      pl: ['wyszukiwanie', 'blog', 'intlayer'],
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
