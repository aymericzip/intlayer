import { t, type Dictionary } from 'intlayer';

const searchTriggerContent: DeclarationContent = {
  key: 'doc-search-trigger',
  content: {
    searchButton: {
      text: t({
        en: 'Search Documentation',
        'en-GB': 'Search Documentation',
        fr: 'Rechercher une doc',
        es: 'Buscar documentación',
        de: 'Dokumentation durchsuchen',
        ja: 'ドキュメントを検索',
        ko: '문서 검색',
        zh: '搜索文档',
        it: 'Cerca documentazione',
        pt: 'Pesquisar documentação',
        hi: 'दस्तावेज़ खोजें',
        ar: 'بحث في الوثيقة',
        ru: 'Поиск документации',
      }),
      label: t({
        en: 'Click to search documentation',
        'en-GB': 'Click to search documentation',
        fr: 'Cliquez pour rechercher la documentation',
        es: 'Haga clic para buscar la documentación',
        de: 'Klicken Sie, um die Dokumentation zu durchsuchen',
        ja: 'ドキュメントを検索するにはクリックしてください',
        ko: '문서를 검색하려면 클릭하세요',
        zh: '点击搜索文档',
        it: 'Clicca per cercare la documentazione',
        pt: 'Clique para pesquisar documentação',
        hi: 'दस्तावेज़ खोजने के लिए क्लिक करें',
        ar: 'انقر للبحث في الوثيقة',
        ru: 'Нажмите, чтобы искать документацию',
      }),
    },
  },
};

export default searchTriggerContent;
