import { t, type Dictionary } from 'intlayer';

export const dictionariesSelectorContent = {
  key: 'dictionaries-selector',
  content: {
    noDictionaryMessage: t({
      en: 'No dictionary',
      'en-GB': 'No dictionary',
      fr: 'Aucun dictionnaire',
      es: 'Sin diccionario',
      de: 'Kein Wörterbuch',
      ja: '辞書がありません',
      ko: '사전이 없습니다',
      zh: '没有字典',
      it: 'Nessun dizionario',
      pt: 'Sem dicionário',
      hi: 'कोई शब्दकोश नहीं',
      ar: 'لا يوجد قاموس',
      ru: 'Нет словаря',
    }),
    dictionaryNotFoundMessage: t({
      en: 'Dictionary not found',
      'en-GB': 'Dictionary not found',
      fr: 'Dictionnaire non trouvé',
      es: 'Diccionario no encontrado',
      de: 'Wörterbuch nicht gefunden',
      ja: '辞書が見つかりません',
      ko: '사전을 찾을 수 없습니다',
      zh: '找不到字典',
      it: 'Dizionario non trovato',
      pt: 'Dicionário não encontrado',
      hi: 'शब्दकोश नहीं मिला',
      ar: 'القاموس غير موجود',
      ru: 'Словарь не найден',
    }),
  },
} satisfies Dictionary;
