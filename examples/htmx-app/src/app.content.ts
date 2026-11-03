import { type Dictionary, insert, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    addItem: t({
      en: 'Add an item',
      ar: 'أضف منتجًا',
      es: 'Añadir un artículo',
      fr: 'Ajouter un article',
      'he-IL': 'הוספת פריט',
    }),

    cartSummary: insert(
      t({
        en: 'Items in your cart: {{count}}',
        ar: 'المنتجات في سلتك: {{count}}',
        es: 'Artículos en tu carrito: {{count}}',
        fr: 'Articles dans votre panier : {{count}}',
        'he-IL': 'פריטים בעגלה שלכם: {{count}}',
      })
    ),

    emptyCart: t({
      en: 'Empty the cart',
      ar: 'أفرغ السلة',
      es: 'Vaciar el carrito',
      fr: 'Vider le panier',
      'he-IL': 'ריקון העגלה',
    }),
    greeting: insert(
      t({
        en: 'Welcome back, {{name}}.',
        ar: 'مرحبًا بعودتك يا {{name}}.',
        es: 'Bienvenido de nuevo, {{name}}.',
        fr: 'Bon retour, {{name}}.',
        'he-IL': 'ברוכים השבים, {{name}}.',
      })
    ),

    heading: t({
      en: 'A cart rendered on the server, swapped by htmx',
      ar: 'سلة تُعرض على الخادم ويستبدلها htmx',
      es: 'Un carrito renderizado en el servidor, intercambiado por htmx',
      fr: 'Un panier rendu sur le serveur, remplacé par htmx',
      'he-IL': 'עגלה שמרונדרת בשרת ומוחלפת על ידי htmx',
    }),

    localeLabel: t({
      en: 'Language',
      ar: 'اللغة',
      es: 'Idioma',
      fr: 'Langue',
      'he-IL': 'שפה',
    }),

    pageTitle: 'Intlayer + htmx',

    totalLabel: t({
      en: 'Total',
      ar: 'الإجمالي',
      es: 'Total',
      fr: 'Total',
      'he-IL': 'סה״כ',
    }),
  },
} satisfies Dictionary;

export default appContent;
