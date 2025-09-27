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
      }),
    },
    buttonLabel: {
      label: insert(
        t({
          en: 'Open dictionary editor {{dictionaryLocalId}}',
          'en-GB': 'Open dictionary editor {{dictionaryLocalId}}',
          fr: "Ouvrir le dictionnaire dans l'éditeur {{dictionaryLocalId}}",
          es: 'Abrir el diccionario en el editor {{dictionaryLocalId}}',
          de: 'Wörterbuch-Editor öffnen {{dictionaryLocalId}}',
          it: 'Apri editor dizionario {{dictionaryLocalId}}',
          pt: 'Abrir editor de dicionário {{dictionaryLocalId}}',
          ru: 'Открыть редактор словаря {{dictionaryLocalId}}',
          ja: '辞書エディタを開く {{dictionaryLocalId}}',
          ko: '사전 편집기 열기 {{dictionaryLocalId}}',
          zh: '打开字典编辑器 {{dictionaryLocalId}}',
          ar: 'فتح محرر القاموس {{dictionaryLocalId}}',
          hi: 'शब्दकोश संपादक खोलें {{dictionaryLocalId}}',
          tr: 'Sözlük düzenleyiciyi aç {{dictionaryLocalId}}',
        })
      ),
    },
  },
} satisfies Dictionary;

export default dictionaryListDrawerContent;
