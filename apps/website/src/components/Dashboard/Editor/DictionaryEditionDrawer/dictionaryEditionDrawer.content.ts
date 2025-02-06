import { t, type Dictionary } from 'intlayer';

const dictionaryEditionDrawerContent = {
  key: 'dictionary-edition-drawer',
  content: {
    backButtonText: t({
      en: 'Dictionary list',
      fr: 'Liste des dictionnaires',
      es: 'Lista de diccionarios',
      de: 'Wörterbuchliste',
      ja: '辞書リスト',
      ko: '사전 목록',
      zh: '词典列表',
      it: 'Elenco di dizionari',
      pt: 'Lista de dicionários',
      hi: 'शब्दकोश सूची',
      ar: 'قائمة القوامل',
      ru: 'Список словарей',
      'en-GB': 'Dictionary list',
    }),
    modalTitle: t({
      en: 'Edit dictionary',
      fr: 'Modifier le dictionnaire',
      es: 'Editar el diccionario',
      de: 'Wörterbuch bearbeiten',
      ja: '辞書を編集',
      ko: '사전 편집',
      zh: '编辑词典',
      it: 'Modifica dizionario',
      pt: 'Editar dicionário',
      hi: 'शब्दकोश संपादित करें',
      ar: 'تحرير قاموس',
      ru: 'Редактировать словарь',
      'en-GB': 'Edit dictionary',
    }),
    noDictionaryFocused: t({
      en: 'No dictionary focused',
      fr: 'Aucun dictionnaire sélectionné',
      es: 'No hay diccionario enfocado',
      de: 'Kein Wörterbuch ausgewählt',
      ja: 'フォーカスされた辞書がありません',
      ko: '포커스가 있는 사전이 없습니다',
      zh: '没有聚焦的词典',
      it: 'Nessun dizionario selezionato',
      pt: 'Nenhum dicionário focalizado',
      hi: 'कोई फोकस शब्दकोश नहीं है',
      ar: 'لا يوجد قاموس مرتبط',
      ru: 'Нет фокусированного словаря',
      'en-GB': 'No dictionary focused',
    }),
  },
} satisfies Dictionary;

export default dictionaryEditionDrawerContent;
