import { t, type Dictionary } from 'intlayer';

const searchTriggerContent: Dictionary = {
  key: 'doc-search-trigger',
  content: {
    searchButton: {
      text: t({
        en: 'Search',
        'en-GB': 'Search',
        fr: 'Rechercher',
        es: 'Buscar',
        de: 'Durchsuchen',
        ja: '検索',
        ko: '검색',
        zh: '搜索',
        it: 'Cerca',
        pt: 'Pesquisar',
        hi: 'खोजें',
        ar: 'بحث',
        ru: 'Поиск',
        tr: 'Ara',
      }),
      label: t({
        en: 'Click to search',
        'en-GB': 'Click to search',
        fr: 'Cliquez pour rechercher',
        es: 'Haga clic para buscar',
        de: 'Klicken Sie, um zu durchsuchen',
        ja: 'クリックして検索',
        ko: '클릭하여 검색',
        zh: '点击搜索',
        it: 'Clicca per cercare',
        pt: 'Clique para pesquisar',
        hi: 'खोजें',
        ar: 'انقر للبحث',
        ru: 'Нажмите, чтобы искать',
        tr: 'Aramak için tıklayın',
      }),
    },
  },
};

export default searchTriggerContent;
