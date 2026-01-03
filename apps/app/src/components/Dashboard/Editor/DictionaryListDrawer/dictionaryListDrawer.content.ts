import { type Dictionary, insert, t } from 'intlayer';

const dictionaryListDrawerContent = {
  key: 'dictionary-list-drawer',
  content: {
    drawerTitle: {
      label: t({
        en: 'Dictionary list',
        'en-GB': 'Dictionary list',
        fr: 'Liste des dictionnaires',
        es: 'Lista de diccionarios',
        de: 'Wörterbuchliste',
        it: 'Lista dei dizionari',
        pt: 'Lista de dicionários',
        ru: 'Список словарей',
        ja: '辞書リスト',
        ko: '사전 목록',
        zh: '字典列表',
        ar: 'قائمة القواميس',
        hi: 'शब्दकोश सूची',
        tr: 'Sözlük listesi',
        pl: 'Lista słowników',
        id: 'Daftar kamus',
        vi: 'Danh sách từ điển',
      }),
    },
    buttonLabel: {
      label: insert(
        t({
          ar: 'فتح محرر القاموس {{dictionaryLocalId}}',
          de: 'Wörterbuch-Editor öffnen {{dictionaryLocalId}}',
          en: 'Open dictionary editor {{dictionaryLocalId}}',
          'en-GB': 'Open dictionary editor {{dictionaryLocalId}}',
          es: 'Abrir el diccionario en el editor {{dictionaryLocalId}}',
          fr: "Ouvrir le dictionnaire dans l'éditeur {{dictionaryLocalId}}",
          hi: 'शब्दकोश संपादक खोलें {{dictionaryLocalId}}',
          id: 'Buka editor kamus {{dictionaryLocalId}}',
          it: 'Apri editor dizionario {{dictionaryLocalId}}',
          ja: '辞書エディタを開く {{dictionaryLocalId}}',
          ko: '사전 편집기 열기 {{dictionaryLocalId}}',
          pl: 'Otwórz edytor słownika {{dictionaryLocalId}}',
          pt: 'Abrir editor de dicionário {{dictionaryLocalId}}',
          ru: 'Открыть редактор словаря {{dictionaryLocalId}}',
          tr: 'Sözlük düzenleyiciyi aç {{dictionaryLocalId}}',
          vi: 'Mở trình chỉnh sửa từ điển {{dictionaryLocalId}}',
          zh: '打开字典编辑器 {{dictionaryLocalId}}',
        })
      ),
    },
  },
  title: 'Dictionary list drawer',
  description:
    'Content declaration for the dictionary list drawer component in the dashboard editor. It includes UI labels such as the drawer title and the button for opening the dictionary editor.',
  tags: ['dashboard', 'editor', 'dictionary', 'ui component'],
} satisfies Dictionary;

export default dictionaryListDrawerContent;
