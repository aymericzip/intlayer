import { type Dictionary, insert, t } from 'intlayer';

const appContent = {
  key: 'app',
  content: {
    pageTitle: 'Intlayer + htmx',

    heading: t({
      en: 'A cart rendered on the server, swapped by htmx',
      fr: 'Un panier rendu sur le serveur, remplacé par htmx',
      es: 'Un carrito renderizado en el servidor, intercambiado por htmx',
      ar: 'سلة تُعرض على الخادم ويستبدلها htmx',
    }),

    localeLabel: t({
      en: 'Language',
      fr: 'Langue',
      es: 'Idioma',
      ar: 'اللغة',
    }),

    greeting: insert(
      t({
        en: 'Welcome back, {{name}}.',
        fr: 'Bon retour, {{name}}.',
        es: 'Bienvenido de nuevo, {{name}}.',
        ar: 'مرحبًا بعودتك يا {{name}}.',
      })
    ),

    cartSummary: insert(
      t({
        en: 'Items in your cart: {{count}}',
        fr: 'Articles dans votre panier : {{count}}',
        es: 'Artículos en tu carrito: {{count}}',
        ar: 'المنتجات في سلتك: {{count}}',
      })
    ),

    totalLabel: t({
      en: 'Total',
      fr: 'Total',
      es: 'Total',
      ar: 'الإجمالي',
    }),

    addItem: t({
      en: 'Add an item',
      fr: 'Ajouter un article',
      es: 'Añadir un artículo',
      ar: 'أضف منتجًا',
    }),

    emptyCart: t({
      en: 'Empty the cart',
      fr: 'Vider le panier',
      es: 'Vaciar el carrito',
      ar: 'أفرغ السلة',
    }),
  },
} satisfies Dictionary;

export default appContent;
