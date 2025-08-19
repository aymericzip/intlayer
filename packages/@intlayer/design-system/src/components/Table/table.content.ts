import { t, type Dictionary } from 'intlayer';

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
    }),
    hide: t({
      en: 'Hide table content',
      fr: 'Masquer le contenu du tableau',
      es: 'Ocultar el contenido de la tabla',
      'en-GB': 'Hide table content',
      de: 'Tabellendaten ausblenden',
      ja: 'テーブルの内容を非表示',
      ko: '테이블 내용 숨기기',
      zh: '隐藏表格内容',
      it: 'Nasconde tutto il contenuto della tabella',
      pt: 'Ocultar o conteúdo da tabela',
      hi: 'टेबल सामग्री छुपाएं',
      ar: 'اخفاء جميع محتويات الجدول',
      ru: 'Скрыть все данные таблицы',
    }),
    extend: t({
      en: 'Extend table',
      fr: 'Étendre le tableau',
      es: 'Extender la tabla',
      'en-GB': 'Extend table',
      de: 'Tabellendaten erweitern',
      ja: 'テーブルを拡張',
      ko: '테이블 확장',
      zh: '扩展表格',
      it: 'Espandere la tabella',
      pt: 'Expandir a tabela',
      hi: 'टेबल विस्तारित करें',
      ar: 'توسيع الجدول',
      ru: 'Расширить таблицу',
    }),
  },
} satisfies Dictionary;

export default tableContent;
