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
    }),
  },
} satisfies Dictionary<Metadata>;

export default pageContent;
