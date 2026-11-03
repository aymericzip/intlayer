import { type Dictionary, t } from 'intlayer';

const pageContent = {
  key: 'blog-search-page',
  content: {
    title: t({
      en: 'Search in blog',
      ar: 'البحث في المدونة',
      de: 'Im Blog suchen',
      'en-GB': 'Search in blog',
      es: 'Buscar en el blog',
      fr: 'Rechercher dans le blog',
      'he-IL': 'חיפוש בבלוג',
      hi: 'ब्लॉग में खोजें',
      id: 'Cari di blog',
      it: 'Cerca nel blog',
      ja: 'ブログで検索',
      ko: '블로그에서 검색',
      pl: 'Szukaj na blogu',
      pt: 'Pesquisar no blog',
      ru: 'Поиск в блоге',
      tr: 'Blogda ara',
      uk: 'Пошук у блозі',
      vi: 'Tìm kiếm trong blog',
      zh: '在博客中搜索',
    }),
  },
  title: 'Undefined content declaration',
  description:
    'This content declaration currently lacks a clear identifier or structure. It may require definition or completion to properly associate multilingual content with a specific page or component.',
  tags: [],
} satisfies Dictionary;

export default pageContent;
