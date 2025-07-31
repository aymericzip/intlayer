import { t, type Dictionary } from 'intlayer';

const copyMarkdownMessageContent = {
  key: 'copy-markdown-message',
  content: {
    title: t({
      en: 'Copy',
      fr: 'Copier',
      ar: 'نسخ',
      de: 'Kopieren',
      es: 'Copiar',
      it: 'Copia',
      ja: 'コピー',
      ko: '복사',
      pt: 'Copiar',
      ru: 'Копировать',
      'en-GB': 'Copy',
      hi: 'Copy',
      zh: 'Copy',
    }),
    description: t({
      en: 'Copy doc Markdown to clipboard',
      fr: 'Copier le Markdown du doc dans le presse-papiers',
      ar: 'نسخ الـ Markdown من المستند إلى الحافظة',
      de: 'Markdown des Dokuments in die Zwischenablage kopieren',
      es: 'Copiar el Markdown del documento a la portapapeles',
      it: 'Copia il Markdown del documento nella porta-documenti',
      ja: 'ドキュメントのMarkdownをクリップボードにコピー',
      ko: '문서의 Markdown을 클립보드에 복사',
      pt: 'Copiar o Markdown do documento para a área de transferência',
      ru: 'Копировать Markdown документа в буфер обмена',
      'en-GB': 'Copy doc Markdown to clipboard',
      hi: 'दस्तावेज़ का Markdown को क्लिपबोर्ड पर कॉपी करें',
      zh: '复制文档 Markdown 到剪贴板',
    }),
  },
} satisfies Dictionary;

export default copyMarkdownMessageContent;
