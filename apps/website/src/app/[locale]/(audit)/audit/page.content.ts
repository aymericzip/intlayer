import { type Dictionary, t } from 'intlayer';

const auditPageContent = {
  key: 'audit-page',
  content: {
    title: t({
      en: 'i18n Audit Scanner',
      'en-GB': 'i18n Audit Scanner',
      fr: "Scanner d'audit i18n",
      es: 'Escáner de auditoría i18n',
      de: 'i18n Audit-Scanner',
    }),
    description: t({
      en: 'Scan your site for internationalization best practices and i18n-driven SEO health: locales, hreflang, language tags, alternate links, and missing translations.',
      'en-GB':
        'Scan your site for internationalisation best practices and i18n SEO health: locales, hreflang, language tags, alternate links, and missing translations.',
      fr: "Analysez votre site pour les bonnes pratiques d'internationalisation et le SEO i18n : locales, hreflang, balises de langue, liens alternates et traductions manquantes.",
      es: 'Analiza tu sitio para comprobar buenas prácticas de i18n y SEO: locales, hreflang, etiquetas de idioma, enlaces alternativos y traducciones faltantes.',
      de: 'Prüfen Sie Ihre Website auf i18n-Best Practices und SEO: Locales, hreflang, Sprachtags, Alternativlinks und fehlende Übersetzungen.',
    }),
  },
  title: 'Audit scanner page',
  description:
    'Page content for the i18n audit scanner with title and explanatory description used in the UI.',
  tags: ['audit', 'i18n', 'scanner', 'page content'],
} satisfies Dictionary;

export default auditPageContent;
