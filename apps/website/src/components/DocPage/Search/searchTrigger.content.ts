import { type Dictionary, t } from 'intlayer';

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
        pl: 'Szukaj',
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
        pl: 'Kliknij, aby wyszukać',
      }),
    },
  },
  title: 'Documentation search trigger',
  description:
    'Content declaration for the search button in the documentation page. Includes button text and accessible label for triggering the search functionality.',
  tags: ['documentation', 'search', 'component'],
};

export default searchTriggerContent;
