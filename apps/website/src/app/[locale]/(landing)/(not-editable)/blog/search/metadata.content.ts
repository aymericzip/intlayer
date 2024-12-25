import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const metadataContent = {
  key: 'blog-search-metadata',
  content: {
    title: t({
      en: 'Search in blog | Intlayer',
      'en-GB': 'Search in blog | Intlayer',
      fr: 'Rechercher dans la blog | Intlayer',
      es: 'Buscar en la blogumentación | Intlayer',
      de: 'In der Dokumentation suchen | Intlayer',
      ja: 'ドキュメントを検索 | Intlayer',
      ko: '문서 검색 | Intlayer',
      zh: '在文档中搜索 | Intlayer',
      it: 'Cerca nella blogumentazione | Intlayer',
      pt: 'Pesquisar na blogumentação | Intlayer',
      hi: 'दस्तावेज़ में खोजें | Intlayer',
      ar: 'البحث في الوثائق | Intlayer',
      ru: 'Поиск в документации | Intlayer',
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
