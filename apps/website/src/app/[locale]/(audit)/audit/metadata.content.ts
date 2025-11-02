import { type Dictionary, t } from 'intlayer';
import type { Metadata } from 'next';

const metadataContent = {
  key: 'audit-metadata',
  content: {
    title: t({
      en: 'i18n Audit Scanner | Intlayer',
      'en-GB': 'i18n Audit Scanner | Intlayer',
      fr: 'Scanner daudit i18n | Intlayer',
      es: 'Escáner de auditoría i18n | Intlayer',
      de: 'i18n Audit-Scanner | Intlayer',
    }),
    description: t({
      en: 'Run a multilingual-focused audit to assess i18n and SEO readiness: locales, hreflang, language tags, alternate links, and missing translations.',
      'en-GB':
        'Run a multilingual-focused audit to assess i18n and SEO readiness: locales, hreflang, language tags, alternate links, and missing translations.',
      fr: "Lancez un audit centré sur l'i18n pour évaluer la préparation SEO : locales, hreflang, balises de langue, liens alternates et traductions manquantes.",
      es: 'Realiza una auditoría centrada en i18n para evaluar el SEO: locales, hreflang, etiquetas de idioma, enlaces alternativos y traducciones faltantes.',
      de: 'Führen Sie ein i18n-zentriertes Audit durch: Locales, hreflang, Sprachtags, Alternativlinks und fehlende Übersetzungen.',
    }),
    keywords: t<string[]>({
      en: [
        'i18n audit',
        'internationalization',
        'localization',
        'SEO',
        'hreflang',
        'language tags',
        'alternate links',
        'multilingual',
        'accessibility',
      ],
      'en-GB': [
        'i18n audit',
        'internationalisation',
        'localisation',
        'SEO',
        'hreflang',
        'language tags',
        'alternate links',
        'multilingual',
        'accessibility',
      ],
      fr: [
        'audit i18n',
        'internationalisation',
        'localisation',
        'SEO',
        'hreflang',
        'balises de langue',
        'liens alternates',
        'multilingue',
      ],
      es: [
        'auditoría i18n',
        'internacionalización',
        'localización',
        'SEO',
        'hreflang',
        'etiquetas de idioma',
        'enlaces alternativos',
        'multilingüe',
      ],
      de: [
        'i18n Audit',
        'Internationalisierung',
        'Lokalisierung',
        'SEO',
        'hreflang',
        'Sprachtags',
        'Alternativlinks',
        'mehrsprachig',
      ],
    }),
  },
  title: 'Audit scanner page metadata',
  description:
    'Metadata for the multilingual i18n audit scanner page: concise title, SEO-friendly description, and relevant keywords for discoverability.',
  tags: ['page metadata', 'audit', 'i18n', 'seo'],
} satisfies Dictionary<Metadata>;

export default metadataContent;
