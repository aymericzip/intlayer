import { type Dictionary, t } from 'intlayer';

const organizationListContent = {
  key: 'organization-list',
  content: {
    searchPlaceholder: t({
      en: 'Search for an organization',
      fr: 'Rechercher une organisation',
      es: 'Buscar una organización',
      'en-GB': 'Search for an organization',
      de: 'Organisation suchen',
      ja: '組織を検索',
      ko: '조직 검색',
      zh: '搜索组织',
      it: "Cerca un'organizzazione",
      pt: 'Pesquisar uma organização',
      hi: 'संगठन खोजें',
      ar: 'البحث عن منظمة',
      ru: 'Найти организацию',
      tr: 'Organizasyon ara',
      pl: 'Szukaj organizacji',
    }),
    noOrganizationFound: t({
      en: 'No organization found. Try clearing your filters.',
      fr: 'Aucune organisation trouvée. Essayez de supprimer vos filtres.',
      es: 'No se encontró ninguna organización. Intente borrar sus filtros.',
      'en-GB': 'No organization found. Try clearing your filters.',
      de: 'Keine Organisation gefunden. Versuchen Sie, Ihre Filter zu löschen.',
      ja: '組織が見つかりません。フィルターをクリアしてみてください。',
      ko: '조직을 찾을 수 없습니다. 필터를 지워보세요.',
      zh: '找不到组织。尝试清除筛选条件。',
      it: 'Organizzazione non trovata. Prova a cancellare i filtri.',
      pt: 'Organização não encontrada. Tente limpar seus filtros.',
      hi: 'संगठन नहीं खोजा गया। अपने फ़िल्टर साफ़ करने का प्रयास करें।',
      ar: 'لم يتم العثور على منظمة. حاول مسح عوامل التصفية.',
      ru: 'Организация не найдена. Попробуйте очистить фильтры.',
      tr: 'Organizasyon bulunamadı. Filtrelerinizi temizlemeyi deneyin.',
      pl: 'Nie znaleziono żadnej organizacji. Spróbuj wyczyścić filtry.',
    }),
  },
  title: 'Organization list',
  description:
    'Contains content related to listing organizations within the dashboard, including search functionality and empty state messaging.',
  tags: ['dashboard', 'organization', 'list'],
} satisfies Dictionary;

export default organizationListContent;
