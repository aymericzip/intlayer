import { type Dictionary, t } from 'intlayer';

const indexContent = {
  key: 'index',
  content: {
    exampleOfContent: t({
      en: 'Example of returned content in English',
      fr: 'Exemple de contenu renvoyé en français',
      'es-ES': 'Ejemplo de contenido devuelto en español (España)',
      'es-MX': 'Ejemplo de contenido devuelto en español (México)',
    }),
    welcome: t({
      en: 'Welcome to our application',
      fr: 'Bienvenue sur notre application',
      es: 'Bienvenido a nuestra aplicación',
    }),
    description: t({
      en: 'This is an AdonisJS application integrated with Intlayer',
      fr: "C'est une application AdonisJS intégrée avec Intlayer",
      es: 'Esta es una aplicación AdonisJS integrada con Intlayer',
    }),
    functionsTitle: t({
      en: 'Available Functions',
      fr: 'Fonctions Disponibles',
      es: 'Funciones Disponibles',
    }),
    functionsDescription: t({
      en: 'You can use t(), getIntlayer(), and getDictionary() to manage your translations.',
      fr: 'Vous pouvez utiliser t(), getIntlayer(), et getDictionary() pour gérer vos traductions.',
      es: 'Puedes usar t(), getIntlayer() y getDictionary() para gestionar tus traducciones.',
    }),
  },
} satisfies Dictionary;

export default indexContent;
