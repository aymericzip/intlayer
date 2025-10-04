import { type Dictionary, t } from 'intlayer';
import type { Metadata } from 'next';

const pageContent = {
  key: 'blog-search-page',
  content: {
    title: t({
      en: 'Search in blog',
      'en-GB': 'Search in blog',
      fr: 'Rechercher dans le blog',
      es: 'Buscar en el blog',
      de: 'Im Blog suchen',
      ja: 'ブログで検索',
      ko: '블로그에서 검색',
      zh: '在博客中搜索',
      it: 'Cerca nel blog',
      pt: 'Pesquisar no blog',
      hi: 'ब्लॉग में खोजें',
      ar: 'البحث في المدونة',
      ru: 'Поиск в блоге',
      tr: 'Blogda ara',
    }),
  },
} satisfies Dictionary<Metadata>;

export default pageContent;
