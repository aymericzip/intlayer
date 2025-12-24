import { type Dictionary, t } from 'intlayer';

const dictionaryFormContent = {
  key: 'dictionary-list',
  content: {
    searchPlaceholder: t({
      ar: 'قاموس 검색',
      de: 'Wörterbuch suchen',
      en: 'Search for a dictionary',
      'en-GB': 'Search for a dictionary',
      es: 'Buscar un diccionario',
      fr: 'Rechercher un dictionnaire',
      hi: 'शब्दकोश खोजें',
      it: 'Cerca un dizionario',
      ja: '辞書を検索',
      ko: '사전 검색',
      pt: 'Pesquisar um dicionário',
      ru: 'Найти словарь',
      tr: 'Sözlük arama',
      zh: '搜索字典',
      pl: 'Wyszukaj słownik',
      id: 'Cari kamus',
      vi: 'Tìm kiếm từ điển',
    }),

    selectDictionaryButton: {
      label: t({
        en: 'Click to select a dictionary',
        fr: 'Cliquez pour sélectionner un dictionnaire',
        es: 'Haga clic para seleccionar un diccionario',
        'en-GB': 'Click to select a dictionary',
        de: 'Klicken Sie, um ein Wörterbuch auszuwählen',
        ja: '辞書を選択するにはクリックしてください',
        ko: '사전을 선택하려면 클릭하세요',
        zh: '单击以选择字典',
        it: 'Clicca per selezionare un dizionario',
        pt: 'Clique para selecionar um dicionário',
        hi: 'शब्दकोश का चयन करने के लिए क्लिक करें',
        ar: 'اضغط لتحديد قاموس',
        ru: 'Нажмите, чтобы выбрать словарь',
        tr: 'Bir sözlük seçmek için tıklayın',
        pl: 'Kliknij, aby wybrać słownik',
        id: 'Klik untuk memilih kamus',
        vi: 'Nhấp để chọn một từ điển',
      }),
    },

    noDictionaries: t({
      en: 'No dictionaries found',
      fr: 'Aucun dictionnaire trouvé',
      es: 'No se encontraron diccionarios',
      'en-GB': 'No dictionaries found',
      de: 'Keine Wörterbücher gefunden',
      ja: '辞書が見つかりませんでした',
      ko: '사전을 찾을 수 없습니다',
      zh: '未找到字典',
      it: 'Nessun dizionario trovato',
      pt: 'Nenhum dicionário encontrado',
      hi: 'कोई शब्दकोश नहीं मिला',
      ar: 'لم يتم العثور على قواميس',
      ru: 'Словари не найдены',
      tr: 'Sözlük bulunamadı',
      pl: 'Nie znaleziono słowników',
      id: 'Tidak ada kamus yang ditemukan',
      vi: 'Không tìm thấy từ điển',
    }),
  },
  title: 'Dictionary list dashboard',
  description:
    'UI content for the dashboard section listing available dictionaries. Includes search placeholder and dictionary selection button.',
  tags: ['dashboard', 'dictionary'],
} satisfies Dictionary;

export default dictionaryFormContent;
