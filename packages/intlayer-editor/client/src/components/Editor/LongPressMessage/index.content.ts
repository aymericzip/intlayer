import { type Dictionary, insert, t } from 'intlayer';

const longPressMessageContent = {
  key: 'long-press-message',
  content: {
    message: insert(
      t({
        en: '{{longPress}} / {{modifierClick}} to edit the {{dictionaryKey}} dictionary',
        fr: '{{longPress}} / {{modifierClick}} pour modifier le dictionnaire {{dictionaryKey}}',
        es: '{{longPress}} / {{modifierClick}} para editar el diccionario {{dictionaryKey}}',
        de: '{{longPress}} / {{modifierClick}}, um das Wörterbuch {{dictionaryKey}} zu bearbeiten',
        it: '{{longPress}} / {{modifierClick}} per modificare il dizionario {{dictionaryKey}}',
        pt: '{{longPress}} / {{modifierClick}} para editar o dicionário {{dictionaryKey}}',
        ru: '{{longPress}} / {{modifierClick}}, чтобы редактировать словарь {{dictionaryKey}}',
        ja: '{{longPress}} / {{modifierClick}} で {{dictionaryKey}} 辞書を編集',
        ko: '{{longPress}} / {{modifierClick}}: {{dictionaryKey}} 사전 편집',
        zh: '{{longPress}} / {{modifierClick}} 以编辑 {{dictionaryKey}} 字典',
        'en-GB':
          '{{longPress}} / {{modifierClick}} to edit the {{dictionaryKey}} dictionary',
        ar: '{{longPress}} / {{modifierClick}} لتعديل القاموس {{dictionaryKey}}',
        hi: '{{dictionaryKey}} डिक्शनरी संपादित करने के लिए {{longPress}} / {{modifierClick}}',
      })
    ),
    longPress: t({
      en: 'Long press',
      fr: 'Appui long',
      es: 'Pulsación larga',
      de: 'Lange drücken',
      it: 'Pressione prolungata',
      pt: 'Pressão longa',
      ru: 'Долгое нажатие',
      ja: '長押し',
      ko: '길게 누르기',
      zh: '长按',
      'en-GB': 'Long press',
      ar: 'ضغط مطوّل',
      hi: 'देर तक दबाएँ',
    }),
    modifierClick: insert(
      t({
        en: '{{modifierKey}} + click',
        fr: '{{modifierKey}} + clic',
        es: '{{modifierKey}} + clic',
        de: '{{modifierKey}} + Klick',
        it: '{{modifierKey}} + clic',
        pt: '{{modifierKey}} + clique',
        ru: '{{modifierKey}} + клик',
        ja: '{{modifierKey}} + クリック',
        ko: '{{modifierKey}} + 클릭',
        zh: '{{modifierKey}} + 点击',
        'en-GB': '{{modifierKey}} + click',
        ar: '{{modifierKey}} + نقرة',
        hi: '{{modifierKey}} + क्लिक',
      })
    ),
  },
} satisfies Dictionary;

export default longPressMessageContent;
