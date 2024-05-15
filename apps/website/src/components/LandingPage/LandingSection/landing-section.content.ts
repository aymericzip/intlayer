import { t, type DeclarationContent } from 'intlayer';

const landingSectionContent: DeclarationContent = {
  id: 'landing-section',
  title: t({
    en: 'A clother way to transltate your website',
    fr: 'Traduisez votre site web plus efficacement',
    es: 'Traduzca su sitio web de manera más eficiente',
  }),
  description: t({
    en: 'Intlayer is an innovative Content Management System (CMS) designed specifically for JavaScript developers. It converts declaration of multilingual JavaScript content into structured dictionaries, making integration into your codebase straightforward and efficient.',
    fr: 'Intlayer est un système de gestion de contenu (CMS) innovant conçu spécifiquement pour les développeurs JavaScript. Il convertit la déclaration de contenu JavaScript multilingue en dictionnaires structurés, facilitant l’intégration dans votre base de code de manière simple et efficace.',
    es: 'Intlayer es un innovador Sistema de Gestión de Contenidos (CMS) diseñado específicamente para desarrolladores de JavaScript. Convierte la declaración de contenido JavaScript multilingüe en diccionarios estructurados, lo que facilita la integración en su base de código de manera sencilla y eficiente.',
  }),
};

export default landingSectionContent;
