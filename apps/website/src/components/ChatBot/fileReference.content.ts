import { t, type Dictionary } from 'intlayer';

const chatFormSectionContent = {
  key: 'chat-form-related-files',
  content: {
    relatedFilesLabel: t({
      pt: 'Arquivos relacionados:',
      it: 'File correlati:',
      de: 'Verwandte Dateien:',
      zh: '相关文件：',
      ko: '관련 파일:',
      ja: '関連ファイル：',
      en: 'Related files:',
      'en-GB': 'Related files:',
      fr: 'Fichiers associés:',
      es: 'Archivos relacionados:',
      hi: 'संबंधित फ़ाइलें:',
      ar: 'ملفات ذات صلة:',
      ru: 'Связанные файлы:',
      tr: 'İlgili dosyalar:',
    }),
  },
} satisfies Dictionary;

export default chatFormSectionContent;
