import { t, type Dictionary } from 'intlayer';

const tableContent = {
  key: 'table',
  autoFill: './{{key}}.content.json',
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
    }),
  },
} satisfies Dictionary;

export default tableContent;
