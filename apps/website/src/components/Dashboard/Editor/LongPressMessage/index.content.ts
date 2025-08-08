import { insert, t, type Dictionary } from 'intlayer';

const longPressMessageContent = {
  key: 'long-press-message',
  content: {
    message: insert(
      t({
        en: 'Long press to edit the "{{dictionaryKey}}" dictionary',
        fr: 'Long press pour éditer le dictionnaire "{{dictionaryKey}}"',
        es: 'Presiona largo para editar el diccionario "{{dictionaryKey}}"',
        de: 'Lang press für Bearbeitung des Wörterbuchs "{{dictionaryKey}}"',
        it: 'Premi a lungo per modificare il dizionario "{{dictionaryKey}}"',
        pt: 'Pressione longa para editar o dicionário "{{dictionaryKey}}"',
        ru: 'Длительное нажатие для редактирования словаря "{{dictionaryKey}}"',
        ja: '長押しして編集 "{{dictionaryKey}}" 辞書',
        ko: '길게 눌러 편집 "{{dictionaryKey}}" 사전',
        zh: '长按编辑 "{{dictionaryKey}}" 字典',
        'en-GB': 'Long press to edit the "{{dictionaryKey}}" dictionary',
        ar: 'اضغط طويلاً للتعديل "{{dictionaryKey}}"',
        hi: 'लंग प्रेस करें टू एडिट "{{dictionaryKey}}"',
      })
    ),
  },
} satisfies Dictionary;

export default longPressMessageContent;
