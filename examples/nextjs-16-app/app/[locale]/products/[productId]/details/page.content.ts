import { type Dictionary, t } from 'intlayer';

const productIdPageContent = {
  key: 'product-id-page',
  content: {
    productPage: t({
      en: 'Product Page',
      fr: 'Page de produit',
      es: 'Página de producto',
    }),
    productIdSlug: t({
      en: 'Product ID (slug):',
      fr: 'ID du produit (slug):',
      es: 'ID del producto (slug):',
    }),
    thisPageTestsTheDynamic: t({
      en: 'This page tests the dynamic route parameter (slug) from the URL.',
      fr: "Cette page teste le paramètre de route dynamique (slug) de l'URL.",
      es: 'Esta página prueba el parámetro de ruta dinámica (slug) de la URL.',
    }),
  },
} satisfies Dictionary;

export default productIdPageContent;
