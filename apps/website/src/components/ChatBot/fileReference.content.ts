import { t, type Dictionary } from 'intlayer';

const chatFormSectionContent = {
  key: 'chat-form-related-files',
  content: {
    relatedFilesLabel: t({
      en: 'Related files:',
      'en-GB': 'Related files:',
      fr: 'Fichiers associés:',
      es: 'Archivos relacionados:',
      de: 'Verwandte Dateien:',
      ja: '関連ファイル:',
      ko: '관련 파일:',
      zh: '相关文件：',
      it: 'File correlati:',
      pt: 'Arquivos relacionados:',
      hi: 'संबंधित फ़ाइलें:',
      ar: 'ملفات ذات صلة:',
      ru: 'Связанные файлы:',
    }),
  },
} satisfies Dictionary;

export default chatFormSectionContent;
