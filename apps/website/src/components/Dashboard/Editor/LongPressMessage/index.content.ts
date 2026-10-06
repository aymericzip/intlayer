import { type Dictionary, insert, t } from 'intlayer';

const longPressMessageContent = {
  key: 'long-press-message',
  content: {
    message: insert(
      t({
        ar: '{{longPress}} / {{modifierClick}} لتعديل القاموس {{dictionaryKey}}',
        de: '{{longPress}} / {{modifierClick}}, um das Wörterbuch {{dictionaryKey}} zu bearbeiten',
        en: '{{longPress}} / {{modifierClick}} to edit the {{dictionaryKey}} dictionary',
        'en-GB':
          '{{longPress}} / {{modifierClick}} to edit the {{dictionaryKey}} dictionary',
        es: '{{longPress}} / {{modifierClick}} para editar el diccionario {{dictionaryKey}}',
        fr: '{{longPress}} / {{modifierClick}} pour modifier le dictionnaire {{dictionaryKey}}',
        hi: '{{dictionaryKey}} डिक्शनरी संपादित करने के लिए {{longPress}} / {{modifierClick}}',
        id: '{{longPress}} / {{modifierClick}} untuk mengedit kamus {{dictionaryKey}}',
        it: '{{longPress}} / {{modifierClick}} per modificare il dizionario {{dictionaryKey}}',
        ja: '{{longPress}} / {{modifierClick}} で {{dictionaryKey}} 辞書を編集',
        ko: '{{longPress}} / {{modifierClick}}: {{dictionaryKey}} 사전 편집',
        pl: '{{longPress}} / {{modifierClick}}, aby edytować słownik {{dictionaryKey}}',
        pt: '{{longPress}} / {{modifierClick}} para editar o dicionário {{dictionaryKey}}',
        ru: '{{longPress}} / {{modifierClick}}, чтобы редактировать словарь {{dictionaryKey}}',
        tr: '{{dictionaryKey}} sözlüğünü düzenlemek için {{longPress}} / {{modifierClick}}',
        uk: '{{longPress}} / {{modifierClick}}, щоб редагувати словник {{dictionaryKey}}',
        vi: '{{longPress}} / {{modifierClick}} để chỉnh sửa từ điển {{dictionaryKey}}',
        zh: '{{longPress}} / {{modifierClick}} 以编辑 {{dictionaryKey}} 字典',
      })
    ),
    longPress: t({
      ar: 'ضغط مطوّل',
      de: 'Lange drücken',
      en: 'Long press',
      'en-GB': 'Long press',
      es: 'Pulsación larga',
      fr: 'Appui long',
      hi: 'देर तक दबाएँ',
      id: 'Tekan lama',
      it: 'Pressione prolungata',
      ja: '長押し',
      ko: '길게 누르기',
      pl: 'Długie naciśnięcie',
      pt: 'Pressão longa',
      ru: 'Долгое нажатие',
      tr: 'Uzun basma',
      uk: 'Довге натискання',
      vi: 'Nhấn giữ',
      zh: '长按',
    }),
    modifierClick: insert(
      t({
        ar: '{{modifierKey}} + نقرة',
        de: '{{modifierKey}} + Klick',
        en: '{{modifierKey}} + click',
        'en-GB': '{{modifierKey}} + click',
        es: '{{modifierKey}} + clic',
        fr: '{{modifierKey}} + clic',
        hi: '{{modifierKey}} + क्लिक',
        id: '{{modifierKey}} + klik',
        it: '{{modifierKey}} + clic',
        ja: '{{modifierKey}} + クリック',
        ko: '{{modifierKey}} + 클릭',
        pl: '{{modifierKey}} + klik',
        pt: '{{modifierKey}} + clique',
        ru: '{{modifierKey}} + клик',
        tr: '{{modifierKey}} + tıklama',
        uk: '{{modifierKey}} + клік',
        vi: '{{modifierKey}} + nhấp',
        zh: '{{modifierKey}} + 点击',
      })
    ),
  },
  title: 'Content selection hint',
  description:
    'Hint shown while hovering editable content: how to select it to edit its dictionary.',
  tags: ['dashboard', 'editor', 'interaction message'],
} satisfies Dictionary;

export default longPressMessageContent;
