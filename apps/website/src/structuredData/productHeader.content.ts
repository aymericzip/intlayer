import { type DeclarationContent, t } from 'intlayer';

export default {
  key: 'product-header-structured-data',
  content: {
    description: t({
      en: 'Intlayer CMS is a flexible content management system for developers and content managers.',
      fr: 'Intlayer CMS est un système de gestion de contenu flexible pour les développeurs et les responsables de contenu.',
      es: 'Intlayer CMS es un sistema de gestión de contenido flexible para desarrolladores y gestores de contenido.',
    }),
  },
} satisfies DeclarationContent;
