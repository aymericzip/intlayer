import { type Dictionary, t } from 'intlayer';

const chatFormSectionContent = {
  key: 'chat-form-related-files',
  content: {
    relatedFilesLabel: t({
      en: 'Related files:',
      ar: 'ملفات ذات صلة:',
      de: 'Verwandte Dateien:',
      'en-GB': 'Related files:',
      es: 'Archivos relacionados:',
      fr: 'Fichiers associés:',
      'he-IL': 'קבצים קשורים:',
      hi: 'संबंधित फ़ाइलें:',
      id: 'File terkait:',
      it: 'File correlati:',
      ja: '関連ファイル：',
      ko: '관련 파일:',
      pl: 'Powiązane pliki:',
      pt: 'Arquivos relacionados:',
      ru: 'Связанные файлы:',
      tr: 'İlgili dosyalar:',
      uk: "Пов'язані файли:",
      vi: 'Các tệp liên quan:',
      zh: '相关文件：',
    }),
  },
  title: 'Chat form related files',
  description:
    'Content declaration for the label displaying related files in the chat form component. Useful for identifying and managing file references within the chatbot interaction.',
  tags: ['chatbot', 'form', 'file reference'],
} satisfies Dictionary;

export default chatFormSectionContent;
