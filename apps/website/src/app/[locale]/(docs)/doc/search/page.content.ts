import { type Dictionary, t } from 'intlayer';
import type { Metadata } from 'next';

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
    }),
  },
  title: 'Documentation search page',
  description:
    'Content declaration for the documentation search page, defining the page title and supporting multilingual display.',
  tags: ['documentation', 'search page'],
} satisfies Dictionary<Metadata>;

export default pageContent;
