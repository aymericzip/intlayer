import { type Dictionary, t } from 'intlayer';

export const copyContentContent = {
  key: 'copy-button',
  content: {
    label: t({
      en: 'Copy content',
      ar: 'نسخ المحتوى',
      de: 'Inhalt kopieren',
      'en-GB': 'Copy content',
      es: 'Copiar contenido',
      fr: 'Copier le contenu',
      'he-IL': 'העתקת התוכן',
      hi: 'सामग्री कॉपी करें',
      id: 'Salin konten',
      it: 'Copia contenuto',
      ja: 'コンテンツをコピー',
      ko: '콘텐츠 복사',
      pl: 'Kopiuj zawartość',
      pt: 'Copiar conteúdo',
      ru: 'Копировать содержимое',
      tr: 'İçeriği kopyala',
      uk: 'Копіювати вміст',
      vi: 'Sao chép nội dung',
      zh: '复制内容',
    }),
  },
  title: 'Copy button label',
  description:
    'Content declaration for the copy button label used to trigger the copy to clipboard action in the design system.',
  tags: ['button component', 'design system'],
} satisfies Dictionary;

export default copyContentContent;
