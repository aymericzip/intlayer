import { type Dictionary, insert, t } from 'intlayer';

const localePickerContent = {
  key: 'locale-picker',

  content: {
    localeList: t({
      en: 'Locale list',
      ar: 'قائمة الإعدادات المحلية',
      de: 'Liste der Gebietsschemata',
      'en-GB': 'Locale list',
      es: 'Lista de configuraciones regionales',
      fr: 'Liste des langues',
      'he-IL': 'רשימת שפות',
      hi: 'स्थानीय सूची',
      id: 'Daftar lokal',
      it: 'Elenco delle impostazioni locali',
      ja: 'ロケール一覧',
      ko: '로케일 목록',
      pl: 'Lista lokalizacji',
      pt: 'Lista de localidades',
      ru: 'Список локалей',
      tr: 'Yerel ayarlar listesi',
      uk: 'Список локалей',
      vi: 'Danh sách ngôn ngữ',
      zh: '语言列表',
    }),
    search: t({
      en: 'Search…',
      ar: 'بحث…',
      de: 'Suchen…',
      'en-GB': 'Search…',
      es: 'Buscar…',
      fr: 'Rechercher…',
      'he-IL': 'חיפוש…',
      hi: 'खोजें…',
      id: 'Cari…',
      it: 'Cerca…',
      ja: '検索…',
      ko: '검색…',
      pl: 'Szukaj…',
      pt: 'Pesquisar…',
      ru: 'Поиск…',
      tr: 'Ara…',
      uk: 'Пошук…',
      vi: 'Tìm kiếm…',
      zh: '搜索…',
    }),

    selectLocaleDisplayname: insert(
      t({
        en: 'Select locale: {{displayName}}',
        ar: 'اختر الإعدادات المحلية: {{displayName}}',
        de: 'Sprache auswählen: {{displayName}}',
        'en-GB': 'Select locale: {{displayName}}',
        es: 'Seleccionar configuración regional: {{displayName}}',
        fr: 'Sélectionner la langue : {{displayName}}',
        'he-IL': 'בחירת שפה: {{displayName}}',
        hi: 'स्थानीय भाषा चुनें: {{displayName}}',
        id: 'Pilih lokal: {{displayName}}',
        it: 'Seleziona locale: {{displayName}}',
        ja: 'ロケールを選択: {{displayName}}',
        ko: '로케일 선택: {{displayName}}',
        pl: 'Wybierz lokalizację: {{displayName}}',
        pt: 'Selecionar localidade: {{displayName}}',
        ru: 'Выберите локаль: {{displayName}}',
        tr: 'Yerel ayarı seçin: {{displayName}}',
        uk: 'Виберіть локаль: {{displayName}}',
        vi: 'Chọn ngôn ngữ: {{displayName}}',
        zh: '选择语言: {{displayName}}',
      })
    ),
  },

  title: 'Locale Picker',
  description:
    'Content declarations for the Locale Picker component, including select locale label, search placeholder and locale list label used for localization and UI rendering.',
  tags: ['component', 'localization', 'locale-picker', 'i18n'],
} satisfies Dictionary;

export default localePickerContent;
