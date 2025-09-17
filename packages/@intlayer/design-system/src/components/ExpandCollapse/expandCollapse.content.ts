import { cond, t, type Dictionary } from 'intlayer';

const expandCollapseContent = {
  key: 'expand-collapse',
  autoFill: './{{key}}.content.json',
  content: {
    expandCollapseContent: cond({
      true: t({
        en: 'Show all',
        fr: 'Afficher tout',
        es: 'Mostrar todo',
        'en-GB': 'Show all',
        de: 'Mehr anzeigen',
        ja: 'すべて表示',
        ko: '모두 보기',
        zh: '显示全部',
        it: 'Mostra tutto',
        pt: 'Mostrar tudo',
        hi: 'सभी दिखाएँ',
        ar: 'عرض الكل',
        ru: 'Показать все',
        tr: 'Hepsini göster',
      }),
      false: t({
        en: 'Show less',
        fr: 'Afficher moins',
        es: 'Mostrar menos',
        'en-GB': 'Show less',
        de: 'Weniger anzeigen',
        ja: '表示を減らす',
        ko: '간략히 보기',
        zh: '显示较少',
        it: 'Mostra meno',
        pt: 'Mostrar menos',
        hi: 'कम दिखाएँ',
        ar: 'عرض أقل',
        ru: 'Показать меньше',
        tr: 'Daha az göster',
      }),
    }),
  },
} satisfies Dictionary;

export default expandCollapseContent;
