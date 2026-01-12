import { type Dictionary, t } from 'intlayer';

export const dictionaryFieldEditorContent = {
  key: 'dictionary-field-editor',
  content: {
    returnToDictionaryList: {
      label: t({
        en: 'Return to dictionary list',
        'en-GB': 'Return to dictionary list',
        fr: 'Retourner à la liste des dictionnaires',
        es: 'Volver a la lista de diccionarios',
        de: 'Zurück zur Wörterbuchliste',
        ja: '辞書リストに戻る',
        it: 'Torna alla lista dei dizionari',
        pt: 'Retornar à lista de dicionários',
        hi: 'शब्दकोश सूची पर वापस जाएं',
        ar: 'العودة إلى قائمة القوامل',
        ko: '사전 목록으로 돌아가기',
        zh: '返回字典列表',
        ru: 'Вернуться к списку словарей',
        tr: 'Sözlük listesine dön',
        pl: 'Powrót do listy słowników',
        id: 'Kembali ke daftar kamus',
        vi: 'Quay lại danh sách từ điển',
        uk: 'Повернутися до списку словників',
      }),
      text: t({
        en: 'Dictionary list',
        'en-GB': 'Dictionary list',
        fr: 'Liste des dictionnaires',
        es: 'Lista de diccionarios',
        de: 'Wörterbuchliste',
        ja: '辞書リスト',
        ko: '사전 목록',
        zh: '字典列表',
        it: 'Elenco dei dizionari',
        pt: 'Lista de dicionários',
        hi: 'शब्दकोश सूची',
        ar: 'قائمة المعاجم',
        ru: 'Список словарей',
        tr: 'Sözlük listesi',
        pl: 'Lista słowników',
        id: 'Daftar kamus',
        vi: 'Danh sách từ điển',
        uk: 'Список словників',
      }),
    },
  },
  title: 'Dictionary field editor',
  description:
    'Content declaration for the dictionary field editor component, including labels and texts used for navigation to the dictionary list.',
  tags: ['component', 'dictionary', 'design system'],
} satisfies Dictionary;

export default dictionaryFieldEditorContent;
