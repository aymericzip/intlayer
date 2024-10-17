import { t, type DeclarationContent } from 'intlayer';

const landingSectionContent = {
  key: 'landing-section',
  content: {
    title: t({
      en: 'A clother way to transltate your website',
      fr: 'Traduisez votre site web plus efficacement',
      es: 'Traduzca su sitio web de manera más eficiente',
    }),
    description: t({
      en: 'Intlayer is an internationalization library designed specifically for JavaScript developers. It allow the declaration of your content everywhere in your code. It converts declaration of multilingual content into structured dictionaries to integrate easily in your code. Using TypeScript, Intlayer make your development stronger and more efficient.',
      fr: "Intlayer est une librarie d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu à n'importe quel endroit dans votre code. Elle convertit la déclaration de votre contenu multilingue en dictionnaires structurés pour faciliter l'intégration dans votre codebase. En utilisant TypeScript, Intlayer rend votre developpement plus fort et efficace.",
      es: 'Intlayer es una librería de internationalization diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de su contenido en cualquier lugar en su código. Convierte la declaración de su contenido multilingüe en diccionarios estructurados para facilitar la integración en su base de código. Utilizando TypeScript, Intlayer hace que el desarrollo sea más fuerte y eficiente.',
    }),
  },
} satisfies DeclarationContent;

export default landingSectionContent;
