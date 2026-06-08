import { type Dictionary, t } from 'intlayer';
import type { Metadata } from 'next';

const pageContent = {
  key: 'blog-search-page',
  content: {
    title: t({
      ar: 'البحث في المدونة',
      de: 'Im Blog suchen',
      en: 'Search in blog',
      'en-GB': 'Search in blog',
      es: 'Buscar en el blog',
      fr: 'Rechercher dans le blog',
      hi: 'ब्लॉग में खोजें',
      it: 'Cerca nel blog',
      ja: 'ブログで検索',
      ko: '블로그에서 검색',
      pt: 'Pesquisar no blog',
      ru: 'Поиск в блоге',
      tr: 'Blogda ara',
      zh: '在博客中搜索',
      pl: 'Szukaj na blogu',
      id: 'Cari di blog',
      vi: 'Tìm kiếm trong blog',
      uk: 'Пошук у блозі',
    }),
  },
  title: 'Undefined content declaration',
  description:
    'This content declaration currently lacks a clear identifier or structure. It may require definition or completion to properly associate multilingual content with a specific page or component.',
  tags: [],
} satisfies Dictionary<Metadata>;

export default pageContent;
