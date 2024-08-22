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
        en: 'Free and Open Source',
        es: 'Gratis y de Código Abierto',
        fr: 'Gratuit et Open Source',
      }),
      descrition: t({
        en: 'Intlayer is free and open source, allowing you to use it for free and contribute to suit your needs.',
        es: 'Intlayer es gratuito y de código abierto, lo que le permite usarlo gratuitamente y contribuir a adaptarse a sus necesidades.',
        fr: "Intlayer est gratuit et open source, vous permettant de l'utiliser gratuitement et de contribuer à son bon fonctionnement.",
      }),
    },
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
        es: 'Type-Safe Entorno',
        fr: 'Type-Safe Environnement',
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
    {
      title: t({
        en: 'Integrated CMS',
        es: 'CMS Integrado',
        fr: 'CMS Intégré',
      }),
      descrition: t({
        en: 'Edit your content on your website with an integrated CMS directly on your website. Boost content generation thanks to AI.',
        es: 'Edite sus contenidos con un CMS directamente integrado en su sitio web. Aumente la generación de contenido gracias a la IA.',
        fr: "Editez vos contenus à l'aide un CMS directement intégré à votre site. Boostez la generation de contenu grâce à l'IA.",
      }),
    },
  ],
};

export default whyToChoseIntlayerContent;
