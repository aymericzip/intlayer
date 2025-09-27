import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const pageContent = {
  key: 'doc-search-page',
  content: {
    title: t({
      en: 'Search in doc',
      'en-GB': 'Search in doc',
      fr: 'Rechercher dans la doc',
      es: 'Buscar en la doc',
      de: 'In der Dokumentation suchen',
      ja: 'ドキュメントで検索',
      ko: '문서에서 검색',
      zh: '在文档中搜索',
      it: 'Cerca nella doc',
      pt: 'Pesquisar na doc',
      hi: 'दस्तावेज़ में खोजें',
      ar: 'البحث في المستند',
      ru: 'Поиск в документации',
      tr: 'Dokümanda ara',
    }),
  },
} satisfies Dictionary<Metadata>;

export default pageContent;
