import { cond, type Dictionary, t } from 'intlayer';

const expandCollapseContent = {
  key: 'expand-collapse',
  content: {
    expandCollapseContent: cond({
      true: t({
        en: 'Show all',
        ar: 'عرض الكل',
        de: 'Mehr anzeigen',
        'en-GB': 'Show all',
        es: 'Mostrar todo',
        fr: 'Afficher tout',
        'he-IL': 'הצג הכל',
        hi: 'सभी दिखाएँ',
        id: 'Tampilkan semua',
        it: 'Mostra tutto',
        ja: 'すべて表示',
        ko: '모두 보기',
        pl: 'Pokaż wszystko',
        pt: 'Mostrar tudo',
        ru: 'Показать все',
        tr: 'Hepsini göster',
        uk: 'Показати все',
        vi: 'Hiển thị tất cả',
        zh: '显示全部',
      }),
      false: t({
        en: 'Show less',
        ar: 'عرض أقل',
        de: 'Weniger anzeigen',
        'en-GB': 'Show less',
        es: 'Mostrar menos',
        fr: 'Afficher moins',
        'he-IL': 'הצג פחות',
        hi: 'कम दिखाएँ',
        id: 'Tampilkan lebih sedikit',
        it: 'Mostra meno',
        ja: '表示を減らす',
        ko: '간략히 보기',
        pl: 'Pokaż mniej',
        pt: 'Mostrar menos',
        ru: 'Показать меньше',
        tr: 'Daha az göster',
        uk: 'Показати менше',
        vi: 'Thu gọn',
        zh: '显示较少',
      }),
    }),
  },
  title: 'Expand collapse toggle',
  description:
    'Content declaration for the expand/collapse toggle component, defining the labels shown when content is expanded or collapsed.',
  tags: ['ui component', 'toggle', 'expand collapse'],
} satisfies Dictionary;

export default expandCollapseContent;
