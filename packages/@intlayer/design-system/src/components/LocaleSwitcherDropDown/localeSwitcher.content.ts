import { t, type Dictionary } from 'intlayer';

const localeSwitcherContent = {
  key: 'locale-switcher',
  content: {
    localeSwitcherLabel: t({
      en: 'Language switcher',
      'en-GB': 'Language switcher',
      fr: 'Changer de langue',
      es: 'Cambiar idioma',
      de: 'Sprachwechsler',
      ja: '言語スイッチャー',
      ko: '언어 스위치',
      zh: '语言切换器',
      it: 'Cambia lingua',
      pt: 'Mudar idioma',
      hi: 'भाषा स्विचर',
      ar: 'مبدل اللغة',
      ru: 'Переключатель языка',
    }),
    languageListLabel: t({
      en: 'Language list',
      'en-GB': 'Language list',
      fr: 'Liste des langues',
      es: 'Lista de idiomas',
      de: 'Sprachliste',
      ja: '言語リスト',
      ko: '언어 목록',
      zh: '语言列表',
      it: 'Elenco lingue',
      pt: 'Lista de idiomas',
      hi: 'भाषा सूची',
      ar: 'قائمة اللغات',
      ru: 'Список языков',
    }),
    switchTo: t({
      en: 'Switch to',
      fr: 'Passer à',
      es: 'Cambiar a',
      'en-GB': 'Switch to',
      de: 'Wechseln Sie zu',
      ja: 'に切り替える',
      ko: '전환',
      zh: '切换到',
      it: 'Passa a',
      pt: 'Mudar para',
      hi: 'स्विच करें',
      ar: 'التبديل إلى',
      ru: 'Переключиться на',
    }),
    searchInput: {
      text: t({
        en: 'Search Locale',
        'en-GB': 'Search Locale',
        fr: 'Rechercher la locale',
        es: 'Buscar idioma',
        de: 'Sprache durchsuchen',
        ja: 'ロケールを検索',
        ko: '언어 검색',
        zh: '搜索语言',
        it: 'Cerca lingua',
        pt: 'Pesquisar idioma',
        hi: 'भाषा खोजें',
        ar: 'بحث اللغة',
        ru: 'Поиск языка',
      }),
      placeholder: t({
        en: 'Search a locale',
        'en-GB': 'Search a locale',
        fr: 'Rechercher une locale',
        es: 'Buscar un idioma',
        de: 'Sprache suchen',
        ja: 'ロケールを検索',
        ko: '언어 검색',
        zh: '搜索语言',
        it: 'Cerca una lingua',
        pt: 'Pesquisar um idioma',
        hi: 'भाषा खोजें',
        ar: 'بحث اللغة',
        ru: 'Поиск языка',
      }),
      ariaLabel: t({
        en: 'Language search',
        'en-GB': 'Language search',
        fr: 'Recherche de langue',
        es: 'Búsqueda de idioma',
        de: 'Sprachsuche',
        ja: '言語検索',
        ko: '언어 검색',
        zh: '语言搜索',
        it: 'Ricerca lingua',
        pt: 'Pesquisa de idioma',
        hi: 'भाषा खोजें',
        ar: 'بحث اللغة',
        ru: 'Поиск языка',
      }),
    },
  },
} satisfies Dictionary;

export default localeSwitcherContent;
