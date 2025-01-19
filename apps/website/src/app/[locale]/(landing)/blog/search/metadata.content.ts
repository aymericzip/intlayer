import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'blog-search-metadata',
  content: {
    title: t({
      en: 'Search in blog | Intlayer',
      'en-GB': 'Search in blog | Intlayer',
      fr: 'Rechercher dans le blog | Intlayer',
      es: 'Buscar en el blog | Intlayer',
      de: 'Im Blog suchen | Intlayer',
      ja: 'ブログで検索 | Intlayer',
      ko: '블로그에서 검색 | Intlayer',
      zh: '在博客中搜索 | Intlayer',
      it: 'Cerca nel blog | Intlayer',
      pt: 'Pesquisar no blog | Intlayer',
      hi: 'ब्लॉग में खोजें | इंटलेयर',
      ar: 'البحث في المدونة | إنتلير',
      ru: 'Поиск в блоге | Интлайер',
    }),
    description: t({
      en: 'Search blog',
      'en-GB': 'Search blog',
      fr: 'Rechercher la blog',
      es: 'Buscar blogumentación',
      de: 'Dokumentation durchsuchen',
      ja: 'ドキュメントを検索',
      ko: '문서 검색',
      zh: '搜索文档',
      it: 'Cerca nella blogumentazione',
      pt: 'Pesquisar blogumentação',
      hi: 'दस्तावेज़ खोजें',
      ar: 'البحث في الوثائق',
      ru: 'Поиск документации',
    }),

    keywords: t<string[]>({
      en: ['search', 'blog', 'intlayer'],
      'en-GB': ['search', 'blog', 'intlayer'],
      fr: ['rechercher', 'blog', 'intlayer'],
      es: ['buscar', 'blogumentación', 'intlayer'],
      de: ['suchen', 'dokumentation', 'intlayer'],
      ja: ['検索', 'ドキュメント', 'intlayer'],
      ko: ['검색', '문서', 'intlayer'],
      zh: ['搜索', '文档', 'intlayer'],
      it: ['cerca', 'blogumentazione', 'intlayer'],
      pt: ['pesquisar', 'blogumentação', 'intlayer'],
      hi: ['खोज', 'दस्तावेज़', 'intlayer'],
      ar: ['بحث', 'وثيقة', 'intlayer'],
      ru: ['поиск', 'документация', 'intlayer'],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default metadataContent;
