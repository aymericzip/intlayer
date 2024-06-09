import { t, type DeclarationContent } from 'intlayer';

const whyToChoseIntlayerContent: DeclarationContent = {
  id: 'why-to-chose-intlayer-section',
  title: t({
    en: 'Why to chose Inlyayer?',
    fr: 'Pourquoi choisir Intlayer ?',
    es: '¿Por qué elegir Intlayer?',
  }),
  content: [
    {
      title: t({
        en: 'JavaScript-Powered Content Management',
        es: 'Gestión de Contenido Impulsada por JavaScript',
        fr: 'Gestion de Contenu Propulsée par JavaScript',
      }),
      descrition: t({
        en: 'Harness the flexibility of JavaScript to define and manage your content efficiently.',
        es: 'Aprovecha la flexibilidad de JavaScript para definir y gestionar tu contenido eficientemente.',
        fr: 'Exploitez la flexibilité de JavaScript pour définir et gérer votre contenu efficacement.',
      }),
    },
    {
      title: t({
        en: 'Type-Safe Environment',
        es: 'Entorno Type-Safe',
        fr: 'Environnement de Type-Safe',
      }),
      descrition: t({
        en: 'Leverage TypeScript to ensure all your content definitions are precise and error-free.',
        es: 'Utiliza TypeScript para asegurar que todas tus definiciones de contenido sean precisas y sin errores.',
        fr: "Utilisez TypeScript pour garantir que toutes vos définitions de contenu soient précises et exemptes d'erreurs.",
      }),
    },
    {
      title: t({
        en: 'Declaration at the component level',
        es: 'Declaración a nivel de componente',
        fr: 'Declaration au niveau du component',
      }),
      descrition: t({
        en: 'Keep your translations close to their respective components, enhancing maintainability and clarity.',
        es: 'Mantén tus traducciones cerca de sus respectivos componentes, mejorando la mantenibilidad y claridad.',
        fr: 'Gardez vos traductions proches de leurs composants respectifs, améliorant la maintenabilité et la clarté.',
      }),
    },
    {
      title: t({
        en: 'Simplified Setup',
        es: 'Configuración Simplificada',
        fr: 'Configuration Simplifiée',
      }),
      descrition: t({
        en: 'Get up and running quickly with minimal configuration, especially optimized for Next.js projects.',
        es: 'Ponte en marcha rápidamente con una configuración mínima, especialmente optimizado para proyectos Next.js.',
        fr: 'Mettez-vous en route rapidement avec une configuration minimale, spécialement optimisée pour les projets Next.js.',
      }),
    },
  ],
};

export default whyToChoseIntlayerContent;
