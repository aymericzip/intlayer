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
    }),
  },
} satisfies Dictionary;

export default chatFormSectionContent;
