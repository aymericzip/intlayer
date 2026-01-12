import { type Dictionary, insert, t } from 'intlayer';

const longPressMessageContent = {
  key: 'long-press-message',
  content: {
    message: insert(
      t({
        ar: 'اضغط طويلاً للتعديل "{{dictionaryKey}}"',
        de: 'Lang press für Bearbeitung des Wörterbuchs "{{dictionaryKey}}"',
        en: 'Long press to edit the "{{dictionaryKey}}" dictionary',
        'en-GB': 'Long press to edit the "{{dictionaryKey}}" dictionary',
        es: 'Presiona largo para editar el diccionario "{{dictionaryKey}}"',
        fr: 'Long press pour éditer le dictionnaire "{{dictionaryKey}}"',
        hi: 'लंग प्रेस करें टू एडिट "{{dictionaryKey}}"',
        id: 'Tekan lama untuk mengedit dictionary "{{dictionaryKey}}"',
        it: 'Premi a lungo per modificare il dizionario "{{dictionaryKey}}"',
        ja: '長押しして編集 "{{dictionaryKey}}" 辞書',
        ko: '길게 눌러 편집 "{{dictionaryKey}}" 사전',
        pl: 'Przytrzymaj, aby edytować słownik "{{dictionaryKey}}"',
        pt: 'Pressione longa para editar o dicionário "{{dictionaryKey}}"',
        ru: 'Длительное нажатие для редактирования словаря "{{dictionaryKey}}"',
        tr: '"{{dictionaryKey}}" sözlüğünü düzenlemek için uzun basın',
        uk: 'Натисніть і утримуйте, щоб редагувати словник «{{dictionaryKey}}»',
        vi: 'Nhấn và giữ để chỉnh sửa từ điển "{{dictionaryKey}}"',
        zh: '长按编辑 "{{dictionaryKey}}" 字典',
      })
    ),
  },
  title: 'Long press edit message',
  description:
    'Message displayed when a user long-presses to edit a dictionary entry in the dashboard editor.',
  tags: ['dashboard', 'editor', 'interaction message'],
} satisfies Dictionary;

export default longPressMessageContent;
