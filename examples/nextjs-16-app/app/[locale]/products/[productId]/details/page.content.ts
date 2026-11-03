import { type Dictionary, t } from 'intlayer';

const productIdPageContent = {
  key: 'product-id-page',
  content: {
    productIdSlug: t({
      en: 'Product ID (slug):',
      es: 'ID del producto (slug):',
      fr: 'ID du produit (slug):',
    }),
    productPage: t({
      en: 'Product Page',
      es: 'Página de producto',
      fr: 'Page de produit',
    }),
    thisPageTestsTheDynamic: t({
      en: 'This page tests the dynamic route parameter (slug) from the URL.',
      es: 'Esta página prueba el parámetro de ruta dinámica (slug) de la URL.',
      fr: "Cette page teste le paramètre de route dynamique (slug) de l'URL.",
    }),
  },
} satisfies Dictionary;

export default productIdPageContent;
