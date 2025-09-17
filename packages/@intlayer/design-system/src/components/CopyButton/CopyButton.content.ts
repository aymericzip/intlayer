import { t, type Dictionary } from 'intlayer';

export const copyContentContent = {
  key: 'copy-button',
  autoFill: './{{key}}.content.json',
  content: {
    label: t({
      en: 'Copy content',
      fr: 'Copier le contenu',
      es: 'Copiar contenido',
      'en-GB': 'Copy content',
      de: 'Inhalt kopieren',
      ja: 'コンテンツをコピー',
      ko: '콘텐츠 복사',
      zh: '复制内容',
      it: 'Copia contenuto',
      pt: 'Copiar conteúdo',
      hi: 'सामग्री कॉपी करें',
      ar: 'نسخ المحتوى',
      ru: 'Копировать содержимое',
      tr: 'İçeriği kopyala',
    }),
  },
} satisfies Dictionary;

export default copyContentContent;
