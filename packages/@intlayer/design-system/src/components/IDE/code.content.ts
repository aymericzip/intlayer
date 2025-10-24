import { type Dictionary, t } from 'intlayer';

const codeContent = {
  key: 'code',
  fill: './{{key}}.content.json',
  content: {
    title: t({
      en: 'Copy code',
      es: 'Copiar código',
      pt: 'Copiar código',
      fr: 'Copier le code',
      de: 'Code kopieren',
      it: 'Copiare il codice',
      ja: 'コードをコピー',
      ko: '코드 복사',
      zh: '复制代码',
      hi: 'कोड कॉपी करें',
      'en-GB': 'Copy code',
      ru: 'Копировать код',
      ar: 'نسخ الكود',
      tr: 'Kodu kopyala',
      pl: 'Kopiuj kod',
    }),
    description: t({
      en: 'Copy the code to the clipboard',
      es: 'Copiar el código al portapapeles',
      pt: 'Copiar o código para a área de transferência',
      fr: 'Copier le code dans le presse-papiers',
      de: 'Kopieren Sie den Code in die Zwischenablage',
      it: 'Copiare il codice nella clipboard',
      ja: 'コードをクリップボードにコピー',
      ko: '코드를 클립보드에 복사',
      zh: '复制代码到剪贴板',
      hi: 'कोड को क्लिपबोर्ड पर कॉपी करें',
      'en-GB': 'Copy the code to the clipboard',
      ru: 'Копировать код в буфер обмена',
      ar: 'نسخ الكود إلى الحافظة',
      tr: 'Kodu panoya kopyala',
      pl: 'Skopiuj kod do schowka',
    }),
  },
  title: 'Code block actions',
  description:
    'Content declaration for code block interactions, allowing users to copy code snippets to the clipboard.',
  tags: ['code block', 'copy action', 'design system'],
} satisfies Dictionary;

export default codeContent;
