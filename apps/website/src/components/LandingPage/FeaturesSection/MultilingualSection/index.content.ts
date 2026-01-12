import { type Dictionary, t } from 'intlayer';

const multilingualSectionContent = {
  key: 'multilingual-section',
  content: {
    inputLabel: t({
      ar: 'المحتوى المولد تلقائيًا في ',
      de: 'Automatisch generierter Inhalt in ',
      en: 'Autogerated content in ',
      'en-GB': 'Autogerated content in ',
      es: 'Contenido autogenerado en ',
      fr: 'Contenu autogénéré dans ',
      hi: 'स्वचालित सामग्री में एक्सटेंड किया गया है ',
      it: 'Contenuto generato automaticamente in ',
      ja: '自動生成されたコンテンツが ',
      ko: '자동 생성된 콘텐츠가 ',
      pt: 'Conteúdo gerado automaticamente em ',
      ru: 'Автоматически генерируемый контент в ',
      tr: 'Otomatik Oluşturulmuş içerik ',
      zh: '自动生成的内容位于 ',
      pl: 'Autogenerowana zawartość w ',
      id: 'Konten yang dibuat secara otomatis di ',
      vi: 'Nội dung được tạo tự động bằng ',
      uk: 'Автоматично згенерований вміст у ',
    }),
  },
  title: 'Multilingual section',
  description:
    'Dictionary for the multilingual section of the landing page, used to define localized labels or content related to language-specific features.',
  tags: ['landing page', 'feature section', 'multilingual support'],
} satisfies Dictionary;

export default multilingualSectionContent;
