import { type Dictionary, t } from 'intlayer';

const copyMarkdownMessageContent = {
  key: 'copy-markdown-message',
  content: {
    title: t({
      ar: 'نسخ',
      de: 'Kopieren',
      en: 'Copy',
      'en-GB': 'Copy',
      es: 'Copiar',
      fr: 'Copier',
      hi: 'Copy',
      it: 'Copia',
      ja: 'コピー',
      ko: '복사',
      pt: 'Copiar',
      ru: 'Копировать',
      tr: 'Kopyala',
      zh: 'Copy',
      pl: 'Kopiuj',
      id: 'Salin',
      vi: 'Sao chép',
      uk: 'Копіювати',
    }),
    description: t({
      ar: 'نسخ الـ Markdown من المستند إلى الحافظة',
      de: 'Markdown des Dokuments in die Zwischenablage kopieren',
      en: 'Copy doc Markdown to clipboard',
      'en-GB': 'Copy doc Markdown to clipboard',
      es: 'Copiar el Markdown del documento a la portapapeles',
      fr: 'Copier le Markdown du doc dans le presse-papiers',
      hi: 'दस्तावेज़ का Markdown को क्लिपबोर्ड पर कॉपी करें',
      it: 'Copia il Markdown del documento nella porta-documenti',
      ja: 'ドキュメントのMarkdownをクリップボードにコピー',
      ko: '문서의 Markdown을 클립보드에 복사',
      pt: 'Copiar o Markdown do documento para a área de transferência',
      ru: 'Копировать Markdown документа в буфер обмена',
      tr: "Belge Markdown'ını panoya kopyala",
      zh: '复制文档 Markdown 到剪贴板',
      pl: 'Kopiuj dokument Markdown do schowka',
      id: 'Salin Markdown dokumentasi ke clipboard',
      vi: 'Sao chép Markdown của tài liệu vào bộ nhớ tạm',
      uk: 'Скопіювати документацію у форматі Markdown в буфер обміну',
    }),
  },
  title: 'Copy Markdown message',
  description:
    'Message displayed to copy documentation content in Markdown format to the clipboard.',
  tags: ['documentation', 'user interaction', 'copy action'],
} satisfies Dictionary;

export default copyMarkdownMessageContent;
