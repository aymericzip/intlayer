import { type Dictionary, t } from 'intlayer';

const multilingualSectionContent = {
  key: 'multilingual-section',
  content: {
    inputLabel: t({
      en: 'Autogerated content in ',
      'en-GB': 'Autogerated content in ',
      fr: 'Contenu autogénéré dans ',
      es: 'Contenido autogenerado en ',
      de: 'Automatisch generierter Inhalt in ',
      it: 'Contenuto generato automaticamente in ',
      pt: 'Conteúdo gerado automaticamente em ',
      ru: 'Автоматически генерируемый контент в ',
      zh: '自动生成的内容位于 ',
      ja: '自動生成されたコンテンツが ',
      ar: 'المحتوى المولد تلقائيًا في ',
      hi: 'स्वचालित सामग्री में एक्सटेंड किया गया है ',
      ko: '자동 생성된 콘텐츠가 ',
      tr: 'Otomatik Oluşturulmuş içerik ',
    }),
  },
} satisfies Dictionary;

export default multilingualSectionContent;
