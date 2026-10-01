import { type Dictionary, insert, t } from 'intlayer';

const localePickerContent = {
  key: 'locale-picker',

  content: {
    selectLocaleDisplayname: insert(
      t({
        en: 'Select locale: {{displayName}}',
        ru: 'Выберите локаль: {{displayName}}',
        ja: 'ロケールを選択: {{displayName}}',
        fr: 'Sélectionner la langue : {{displayName}}',
        ko: '로케일 선택: {{displayName}}',
        zh: '选择语言: {{displayName}}',
        es: 'Seleccionar configuración regional: {{displayName}}',
        de: 'Sprache auswählen: {{displayName}}',
        ar: 'اختر الإعدادات المحلية: {{displayName}}',
        it: 'Seleziona locale: {{displayName}}',
        'en-GB': 'Select locale: {{displayName}}',
        pt: 'Selecionar localidade: {{displayName}}',
        hi: 'स्थानीय भाषा चुनें: {{displayName}}',
        tr: 'Yerel ayarı seçin: {{displayName}}',
        pl: 'Wybierz lokalizację: {{displayName}}',
        id: 'Pilih lokal: {{displayName}}',
        vi: 'Chọn ngôn ngữ: {{displayName}}',
        uk: 'Виберіть локаль: {{displayName}}',
      })
    ),

    search: t({
      en: 'Search…',
      ru: 'Поиск…',
      ja: '検索…',
      fr: 'Rechercher…',
      ko: '검색…',
      zh: '搜索…',
      es: 'Buscar…',
      de: 'Suchen…',
      ar: 'بحث…',
      it: 'Cerca…',
      'en-GB': 'Search…',
      pt: 'Pesquisar…',
      hi: 'खोजें…',
      tr: 'Ara…',
      pl: 'Szukaj…',
      id: 'Cari…',
      vi: 'Tìm kiếm…',
      uk: 'Пошук…',
    }),

    localeList: t({
      en: 'Locale list',
      ru: 'Список локалей',
      ja: 'ロケール一覧',
      fr: 'Liste des langues',
      ko: '로케일 목록',
      zh: '语言列表',
      es: 'Lista de configuraciones regionales',
      de: 'Liste der Gebietsschemata',
      ar: 'قائمة الإعدادات المحلية',
      it: 'Elenco delle impostazioni locali',
      'en-GB': 'Locale list',
      pt: 'Lista de localidades',
      hi: 'स्थानीय सूची',
      tr: 'Yerel ayarlar listesi',
      pl: 'Lista lokalizacji',
      id: 'Daftar lokal',
      vi: 'Danh sách ngôn ngữ',
      uk: 'Список локалей',
    }),
  },

  title: 'Locale Picker',
  description:
    'Content declarations for the Locale Picker component, including select locale label, search placeholder and locale list label used for localization and UI rendering.',
  tags: ['component', 'localization', 'locale-picker', 'i18n'],
} satisfies Dictionary;

export default localePickerContent;
