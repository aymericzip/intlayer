import { type Dictionary, t } from 'intlayer';

const tableContent = {
  key: 'table',
  content: {
    show: t({
      en: 'Show all table content',
      fr: 'Afficher tout le contenu du tableau',
      es: 'Mostrar todo el contenido de la tabla',
      'en-GB': 'Show all table content',
      de: 'Alle Tabellendaten anzeigen',
      ja: 'テーブルのすべての内容を表示',
      ko: '테이블의 모든 내용 표시',
      zh: '显示表格的所有内容',
      it: 'Mostra tutto il contenuto della tabella',
      pt: 'Mostrar todo o conteúdo da tabela',
      hi: 'सभी तालिका सामग्री दिखाएं',
      ar: 'اظهار جميع محتويات الجدول',
      ru: 'Показать все данные таблицы',
      tr: 'Tüm tablo içeriğini göster',
      pl: 'Pokaż całą zawartość tabeli',
      id: 'Tampilkan semua isi tabel',
      vi: 'Hiển thị tất cả nội dung bảng',
      uk: 'Показати весь вміст таблиці',
    }),
  },
  title: 'Table component content',
  description:
    'Content declaration related to the Table component, specifically for UI message to display all table content.',
  tags: ['table', 'component content', 'design system'],
} satisfies Dictionary;

export default tableContent;
