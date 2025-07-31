import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const metadataContent = {
  key: 'doc-search-metadata',
  content: {
    title: t({
      en: 'Search in documentation | Intlayer',
      'en-GB': 'Search in documentation | Intlayer',
      fr: 'Rechercher dans la documentation | Intlayer',
      es: 'Buscar en la documentación | Intlayer',
      de: 'In der Dokumentation suchen | Intlayer',
      ja: 'ドキュメントを検索 | Intlayer',
      ko: '문서 검색 | Intlayer',
      zh: '在文档中搜索 | Intlayer',
      it: 'Cerca nella documentazione | Intlayer',
      pt: 'Pesquisar na documentação | Intlayer',
      hi: 'दस्तावेज़ में खोजें | Intlayer',
      ar: 'البحث في الوثائق | Intlayer',
      ru: 'Поиск в документации | Intlayer',
    }),
    description: t({
      en: 'Search documentation',
      'en-GB': 'Search documentation',
      fr: 'Rechercher la documentation',
      es: 'Buscar documentación',
      de: 'Dokumentation durchsuchen',
      ja: 'ドキュメントを検索',
      ko: '문서 검색',
      zh: '搜索文档',
      it: 'Cerca nella documentazione',
      pt: 'Pesquisar documentação',
      hi: 'दस्तावेज़ खोजें',
      ar: 'البحث في الوثائق',
      ru: 'Поиск документации',
    }),

    keywords: t<string[]>({
      en: ['search', 'documentation', 'intlayer'],
      'en-GB': ['search', 'documentation', 'intlayer'],
      fr: ['rechercher', 'documentation', 'intlayer'],
      es: ['buscar', 'documentación', 'intlayer'],
      de: ['suchen', 'dokumentation', 'intlayer'],
      ja: ['検索', 'ドキュメント', 'intlayer'],
      ko: ['검색', '문서', 'intlayer'],
      zh: ['搜索', '文档', 'intlayer'],
      it: ['cerca', 'documentazione', 'intlayer'],
      pt: ['pesquisar', 'documentação', 'intlayer'],
      hi: ['खोज', 'दस्तावेज़', 'intlayer'],
      ar: ['بحث', 'وثيقة', 'intlayer'],
      ru: ['поиск', 'документация', 'intlayer'],
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
