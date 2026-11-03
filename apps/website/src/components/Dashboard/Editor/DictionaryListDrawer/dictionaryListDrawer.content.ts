import { type Dictionary, insert, t } from 'intlayer';

const dictionaryListDrawerContent = {
  key: 'dictionary-list-drawer',
  content: {
    buttonLabel: {
      label: insert(
        t({
          en: 'Open dictionary editor {{dictionaryLocalId}}',
          ar: 'فتح محرر القاموس {{dictionaryLocalId}}',
          de: 'Wörterbuch-Editor öffnen {{dictionaryLocalId}}',
          'en-GB': 'Open dictionary editor {{dictionaryLocalId}}',
          es: 'Abrir el diccionario en el editor {{dictionaryLocalId}}',
          fr: "Ouvrir le dictionnaire dans l'éditeur {{dictionaryLocalId}}",
          'he-IL': 'פתיחת עורך המילון {{dictionaryLocalId}}',
          hi: 'शब्दकोश संपादक खोलें {{dictionaryLocalId}}',
          id: 'Buka editor kamus {{dictionaryLocalId}}',
          it: 'Apri editor dizionario {{dictionaryLocalId}}',
          ja: '辞書エディタを開く {{dictionaryLocalId}}',
          ko: '사전 편집기 열기 {{dictionaryLocalId}}',
          pl: 'Otwórz edytor słownika {{dictionaryLocalId}}',
          pt: 'Abrir editor de dicionário {{dictionaryLocalId}}',
          ru: 'Открыть редактор словаря {{dictionaryLocalId}}',
          tr: 'Sözlük düzenleyiciyi aç {{dictionaryLocalId}}',
          uk: 'Відкрити редактор словника {{dictionaryLocalId}}',
          vi: 'Mở trình chỉnh sửa từ điển {{dictionaryLocalId}}',
          zh: '打开字典编辑器 {{dictionaryLocalId}}',
        })
      ),
    },
    drawerTitle: {
      label: t({
        en: 'Dictionary list',
        ar: 'قائمة القواميس',
        de: 'Wörterbuchliste',
        'en-GB': 'Dictionary list',
        es: 'Lista de diccionarios',
        fr: 'Liste des dictionnaires',
        'he-IL': 'רשימת מילונים',
        hi: 'शब्दकोश सूची',
        id: 'Daftar kamus',
        it: 'Lista dei dizionari',
        ja: '辞書リスト',
        ko: '사전 목록',
        pl: 'Lista słowników',
        pt: 'Lista de dicionários',
        ru: 'Список словарей',
        tr: 'Sözlük listesi',
        uk: 'Список словників',
        vi: 'Danh sách từ điển',
        zh: '字典列表',
      }),
    },
  },
  title: 'Dictionary list drawer',
  description:
    'Content declaration for the dictionary list drawer component in the dashboard editor. It includes UI labels such as the drawer title and the button for opening the dictionary editor.',
  tags: ['dashboard', 'editor', 'dictionary', 'ui component'],
} satisfies Dictionary;

export default dictionaryListDrawerContent;
