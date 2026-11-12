import { type Dictionary, t } from 'intlayer';

const searchTriggerContent: Dictionary = {
  key: 'doc-search-trigger',
  content: {
    searchButton: {
      label: t({
        en: 'Click to search',
        ar: 'انقر للبحث',
        de: 'Klicken Sie, um zu durchsuchen',
        'en-GB': 'Click to search',
        es: 'Haga clic para buscar',
        fr: 'Cliquez pour rechercher',
        'he-IL': 'לחצו לחיפוש',
        hi: 'खोजें',
        id: 'Klik untuk mencari',
        it: 'Clicca per cercare',
        ja: 'クリックして検索',
        ko: '클릭하여 검색',
        pl: 'Kliknij, aby wyszukać',
        pt: 'Clique para pesquisar',
        ru: 'Нажмите, чтобы искать',
        tr: 'Aramak için tıklayın',
        uk: 'Натисніть, щоб виконати пошук',
        vi: 'Nhấn để tìm kiếm',
        zh: '点击搜索',
      }),
      text: t({
        en: 'Search',
        ar: 'بحث',
        de: 'Durchsuchen',
        'en-GB': 'Search',
        es: 'Buscar',
        fr: 'Rechercher',
        'he-IL': 'חיפוש',
        hi: 'खोजें',
        id: 'Cari',
        it: 'Cerca',
        ja: '検索',
        ko: '검색',
        pl: 'Szukaj',
        pt: 'Pesquisar',
        ru: 'Поиск',
        tr: 'Ara',
        uk: 'Пошук',
        vi: 'Tìm kiếm',
        zh: '搜索',
      }),
    },
  },
  title: 'Documentation search trigger',
  description:
    'Content declaration for the search button in the documentation page. Includes button text and accessible label for triggering the search functionality.',
  tags: ['documentation', 'search', 'component'],
};

export default searchTriggerContent;
