import { type Dictionary, t } from 'intlayer';

const pageContent = {
  key: 'doc-search-page',
  content: {
    title: t({
      en: 'Search in doc',
      ar: 'البحث في المستند',
      de: 'In der Dokumentation suchen',
      'en-GB': 'Search in doc',
      es: 'Buscar en la doc',
      fr: 'Rechercher dans la doc',
      'he-IL': 'חיפוש בתיעוד',
      hi: 'दस्तावेज़ में खोजें',
      id: 'Cari di dokumentasi',
      it: 'Cerca nella doc',
      ja: 'ドキュメントで検索',
      ko: '문서에서 검색',
      pl: 'Szukaj w dokumentacji',
      pt: 'Pesquisar na doc',
      ru: 'Поиск в документации',
      tr: 'Dokümanda ara',
      uk: 'Пошук у документації',
      vi: 'Tìm kiếm trong tài liệu',
      zh: '在文档中搜索',
    }),
  },
  title: 'Documentation search page',
  description:
    'Content declaration for the documentation search page, defining the page title and supporting multilingual display.',
  tags: ['documentation', 'search page'],
} satisfies Dictionary;

export default pageContent;
