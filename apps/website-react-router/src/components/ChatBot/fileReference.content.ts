import { type Dictionary, t } from 'intlayer';

const chatFormSectionContent = {
  key: 'chat-form-related-files',
  content: {
    relatedFilesLabel: t({
      ar: 'ملفات ذات صلة:',
      de: 'Verwandte Dateien:',
      en: 'Related files:',
      'en-GB': 'Related files:',
      es: 'Archivos relacionados:',
      fr: 'Fichiers associés:',
      hi: 'संबंधित फ़ाइलें:',
      it: 'File correlati:',
      ja: '関連ファイル：',
      ko: '관련 파일:',
      pt: 'Arquivos relacionados:',
      ru: 'Связанные файлы:',
      tr: 'İlgili dosyalar:',
      zh: '相关文件：',
      pl: 'Powiązane pliki:',
      id: 'File terkait:',
      vi: 'Các tệp liên quan:',
      uk: "Пов'язані файли:",
    }),
  },
  title: 'Chat form related files',
  description:
    'Content declaration for the label displaying related files in the chat form component. Useful for identifying and managing file references within the chatbot interaction.',
  tags: ['chatbot', 'form', 'file reference'],
} satisfies Dictionary;

export default chatFormSectionContent;
