import { t, type Dictionary } from 'intlayer';
import { type Metadata } from 'next';

const pageContent = {
  key: 'doc-search-page',
  content: {
    title: t({
      en: 'Search in doc',
      'en-GB': 'Search in doc',
      fr: 'Rechercher dans le doc',
      es: 'Buscar en el doc',
      de: 'Im Doc suchen',
      ja: 'ドキュメントで検索',
      ko: '문서에서 검색',
      zh: '在文档中搜索',
      it: 'Cerca nel doc',
      pt: 'Pesquisar no doc',
      hi: 'दस्तावेज़ में खोजें',
      ar: 'البحث في المستند',
      ru: '',
    }),
  },
} satisfies Dictionary<Metadata>;

export default pageContent;
