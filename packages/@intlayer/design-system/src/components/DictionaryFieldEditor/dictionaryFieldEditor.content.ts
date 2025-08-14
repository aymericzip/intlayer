import { t, type Dictionary } from 'intlayer';

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
        ko: '사전 목록으로 돌아가기',
        zh: '返回字典列表',
        it: "Torna all'elenco dei dizionari",
        pt: 'Voltar à lista de dicionários',
        hi: 'शब्दकोश सूची में वापस जाएं',
        ar: 'العودة إلى قائمة المعاجم',
        ru: 'Вернуться к списку словарей',
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
      }),
    },
  },
} satisfies Dictionary;

export default dictionaryFieldEditorContent;
