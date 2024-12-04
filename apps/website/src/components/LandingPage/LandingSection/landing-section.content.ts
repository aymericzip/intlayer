import { t, type DeclarationContent } from 'intlayer';

const landingSectionContent = {
  key: 'landing-section',
  content: {
    title: t({
      en: 'Internationalize (i18n) your website react and nextjs easily',
      fr: 'Internationalisez (i18n) votre site web react et nextjs facilement',
      es: 'Internacionalice (i18n) su sitio web react y nextjs fácilmente',
    }),
    description: t({
      en: 'Intlayer is an internationalization library designed specifically for JavaScript developers. It allows the declaration of your content throughout your code. It converts multilingual content declarations into structured dictionaries, making integration easy. Using TypeScript, Intlayer strengthens your development and enhances efficiency.',
      fr: "Intlayer est une librarie d'internationalisation conçue spécifiquement pour les développeurs JavaScript. Elle permet la déclaration de votre contenu à n'importe quel endroit dans votre code. Elle convertit la déclaration de votre contenu multilingue en dictionnaires structurés pour faciliter l'intégration dans votre codebase. En utilisant TypeScript, Intlayer rend votre developpement plus fort et efficace.",
      es: 'Intlayer es una librería de internacionalización diseñada específicamente para desarrolladores de JavaScript. Permite la declaración de su contenido en cualquier parte de su código. Convierte la declaración de contenido multilingüe en diccionarios estructurados para facilitar la integración en su base de código. Al utilizar TypeScript, Intlayer fortalece su desarrollo y lo hace más eficiente.',
    }),
  },
} satisfies DeclarationContent;

export default landingSectionContent;
