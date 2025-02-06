import { t, type Dictionary } from 'intlayer';

const tagListContent = {
  key: 'tags-dictionaries-list',
  content: {
    dictionaryLinkLabel: t({
      en: 'Manage dictionary',
      fr: 'Gérer le dictionnaire',
      es: 'Gestionar el diccionario',
      'en-GB': 'Manage dictionary',
      de: 'Wörterbuch verwalten',
      ja: '辞書を管理',
      ko: '사전 관리',
      zh: '管理字典',
      it: 'Gestisci il dizionario',
      pt: 'Gerenciar dicionário',
      hi: 'डिक्शन्स को प्रबंधित करें',
      ar: 'إدارة قاموس',
      ru: 'Управление словарем',
    }),

    noDictionaryView: {
      title: t({
        en: 'No dictionary',
        fr: 'Aucun dictionnaire',
        es: 'Sin diccionario',
        'en-GB': 'No dictionary',
        de: 'Kein Wörterbuch',
        ja: '辞書なし',
        ko: '사전 없음',
        zh: '没有字典',
        it: 'Nessun dizionario',
        pt: 'Nenhum dicionário',
        hi: 'कोई डिक्शन नहीं',
        ar: 'لا يوجد قاموس',
        ru: 'Нет словаря',
      }),
      description: t({
        en: 'There are no dictionaries associated with this tag',
        fr: 'Il n’y a pas de dictionnaire associé à ce tag',
        es: 'No hay diccionarios asociados con este tag',
        'en-GB': 'There are no dictionaries associated with this tag',
        de: 'Es sind keine Wörterbücher mit diesem Tag verbunden',
        ja: 'このタグに関連付けられた辞書はありません',
        ko: '이 태그와 관련된 사전이 없습니다',
        zh: '没有与此标签相关的字典',
        it: 'Non ci sono dizionari associati a questo tag',
        pt: 'Não há dicionários associados a este tag',
        hi: 'इस टैग के साथ संबंधित डिक्शन्स नहीं हैं',
        ar: 'لا توجد قاموس مرتبطة بهذا الوسم',
        ru: 'Словари, связанные с этим тегом нет',
      }),
    },
  },
} satisfies Dictionary;

export default tagListContent;
