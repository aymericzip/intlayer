import { type Dictionary, t } from 'intlayer';

export const copyContentContent = {
  key: 'copy-button',
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
      pl: 'Kopiuj zawartość',
      id: 'Salin konten',
      vi: 'Sao chép nội dung',
      uk: 'Копіювати вміст',
    }),
  },
  title: 'Copy button label',
  description:
    'Content declaration for the copy button label used to trigger the copy to clipboard action in the design system.',
  tags: ['button component', 'design system'],
} satisfies Dictionary;

export default copyContentContent;
