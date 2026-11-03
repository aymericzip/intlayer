import { type Dictionary, t } from 'intlayer';

const tableContent = {
  key: 'table',
  content: {
    modal: {
      description: t({
        en: 'Open the table in a modal to view all data content clearly',
        ar: 'افتح الجدول في نافذة منبثقة لعرض جميع محتويات البيانات بوضوح',
        de: 'Tabelle in einem Modal öffnen, um alle Daten übersichtlich anzuzeigen',
        'en-GB': 'Open the table in a modal to view all data content clearly',
        es: 'Abrir la tabla en una ventana flotante para ver todo el contenido claramente',
        fr: 'Ouvrir le tableau dans une fenêtre modale pour voir tout le contenu clairement',
        'he-IL': 'פתיחת הטבלה בחלון כדי לראות את כל תוכן הנתונים בבירור',
        hi: 'सभी डेटा सामग्री को स्पष्ट रूप से देखने के लिए तालिका को मोडल में खोलें',
        id: 'Buka tabel dalam modal untuk melihat semua isi data dengan jelas',
        it: 'Apri la tabella in una finestra modale per visualizzare tutti i dati in modo chiaro',
        ja: 'テーブルをモーダルで開き、すべてのデータを明確に表示',
        ko: '테이블을 모달로 열어 모든 데이터를 명확하게 확인',
        pl: 'Otwórz tabelę w oknie modalnym, aby wyraźnie zobaczyć całą zawartość',
        pt: 'Abrir a tabela em um modal para ver todo o conteúdo claramente',
        ru: 'Открыть таблицу в модальном окне для четкого просмотра всех данных',
        tr: 'Tüm veri içeriğini net bir şekilde görmek için tabloyu modalde açın',
        uk: 'Відкрийте таблицю в модальному вікні, щоб чітко переглянути всі дані',
        vi: 'Mở bảng trong một cửa sổ bật lên để xem toàn bộ nội dung dữ liệu một cách rõ ràng',
        zh: '在弹窗中打开表格以清晰地查看所有数据',
      }),
      title: t({
        en: 'Show all table content',
        ar: 'اظهار جميع محتويات الجدول',
        de: 'Alle Tabellendaten anzeigen',
        'en-GB': 'Show all table content',
        es: 'Mostrar todo el contenido de la tabla',
        fr: 'Afficher tout le contenu du tableau',
        'he-IL': 'הצגת כל תוכן הטבלה',
        hi: 'सभी तालिका सामग्री दिखाएं',
        id: 'Tampilkan semua isi tabel',
        it: 'Mostra tutto il contenuto della tabella',
        ja: 'テーブルのすべての内容を表示',
        ko: '테이블의 모든 내용 표시',
        pl: 'Pokaż całą zawartość tabeli',
        pt: 'Mostrar todo o conteúdo da tabela',
        ru: 'Показать все данные таблицы',
        tr: 'Tüm tablo içeriğini göster',
        uk: 'Показати весь вміст таблиці',
        vi: 'Hiển thị tất cả nội dung bảng',
        zh: '显示表格的所有内容',
      }),
    },
  },
  title: 'Table component content',
  description:
    'Content declaration related to the Table component, specifically for UI message to display all table content.',
  tags: ['table', 'component content', 'design system'],
} satisfies Dictionary;

export default tableContent;
