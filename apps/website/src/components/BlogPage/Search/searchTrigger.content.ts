import { t, type Dictionary } from 'intlayer';

const searchTriggerContent: Dictionary = {
  key: 'blog-search-trigger',
  content: {
    searchButton: {
      text: t({
        en: 'Search Blog',
        'en-GB': 'Search Blog',
        fr: 'Rechercher une blog',
        es: 'Buscar blogación',
        de: 'Dokumentation durchsuchen',
        ja: 'ドキュメントを検索',
        ko: '문서 검색',
        zh: '搜索文档',
        it: 'Cerca blogazione',
        pt: 'Pesquisar blogação',
        hi: 'दस्तावेज़ खोजें',
        ar: 'بحث في الوثيقة',
        ru: 'Поиск документации',
      }),
      label: t({
        en: 'Click to search blog',
        'en-GB': 'Click to search blog',
        fr: 'Cliquez pour rechercher la blog',
        es: 'Haga clic para buscar la blogación',
        de: 'Klicken Sie, um die Dokumentation zu durchsuchen',
        ja: 'ドキュメントを検索するにはクリックしてください',
        ko: '문서를 검색하려면 클릭하세요',
        zh: '点击搜索文档',
        it: 'Clicca per cercare la blogazione',
        pt: 'Clique para pesquisar blogação',
        hi: 'दस्तावेज़ खोजने के लिए क्लिक करें',
        ar: 'انقر للبحث في الوثيقة',
        ru: 'Нажмите, чтобы искать документацию',
      }),
    },
  },
};

export default searchTriggerContent;
