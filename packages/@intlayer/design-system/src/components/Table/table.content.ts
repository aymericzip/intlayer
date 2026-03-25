import { type Dictionary, t } from 'intlayer';

const tableContent = {
  key: 'table',
  content: {
    modal: {
      title: t({
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
      description: t({
        en: 'Open the table in a modal to view all data content clearly',
        fr: 'Ouvrir le tableau dans une fenêtre modale pour voir tout le contenu clairement',
        es: 'Abrir la tabla en una ventana flotante para ver todo el contenido claramente',
        'en-GB': 'Open the table in a modal to view all data content clearly',
        de: 'Tabelle in einem Modal öffnen, um alle Daten übersichtlich anzuzeigen',
        ja: 'テーブルをモーダルで開き、すべてのデータを明確に表示',
        ko: '테이블을 모달로 열어 모든 데이터를 명확하게 확인',
        zh: '在弹窗中打开表格以清晰地查看所有数据',
        it: 'Apri la tabella in una finestra modale per visualizzare tutti i dati in modo chiaro',
        pt: 'Abrir a tabela em um modal para ver todo o conteúdo claramente',
        hi: 'सभी डेटा सामग्री को स्पष्ट रूप से देखने के लिए तालिका को मोडल में खोलें',
        ar: 'افتح الجدول في نافذة منبثقة لعرض جميع محتويات البيانات بوضوح',
        ru: 'Открыть таблицу в модальном окне для четкого просмотра всех данных',
        tr: 'Tüm veri içeriğini net bir şekilde görmek için tabloyu modalde açın',
        pl: 'Otwórz tabelę w oknie modalnym, aby wyraźnie zobaczyć całą zawartość',
        id: 'Buka tabel dalam modal untuk melihat semua isi data dengan jelas',
        vi: 'Mở bảng trong một cửa sổ bật lên để xem toàn bộ nội dung dữ liệu một cách rõ ràng',
        uk: 'Відкрийте таблицю в модальному вікні, щоб чітко переглянути всі дані',
      }),
    },
  },
  title: 'Table component content',
  description:
    'Content declaration related to the Table component, specifically for UI message to display all table content.',
  tags: ['table', 'component content', 'design system'],
} satisfies Dictionary;

export default tableContent;
