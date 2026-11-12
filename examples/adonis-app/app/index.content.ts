import { type Dictionary, t } from 'intlayer';

const indexContent = {
  key: 'index',
  content: {
    description: t({
      en: 'This is an AdonisJS application integrated with Intlayer',
      es: 'Esta es una aplicación AdonisJS integrada con Intlayer',
      fr: "C'est une application AdonisJS intégrée avec Intlayer",
    }),
    exampleOfContent: t({
      en: 'Example of returned content in English',
      'es-ES': 'Ejemplo de contenido devuelto en español (España)',
      'es-MX': 'Ejemplo de contenido devuelto en español (México)',
      fr: 'Exemple de contenu renvoyé en français',
    }),
    functionsDescription: t({
      en: 'You can use t(), getIntlayer(), and getDictionary() to manage your translations.',
      es: 'Puedes usar t(), getIntlayer() y getDictionary() para gestionar tus traducciones.',
      fr: 'Vous pouvez utiliser t(), getIntlayer(), et getDictionary() pour gérer vos traductions.',
    }),
    functionsTitle: t({
      en: 'Available Functions',
      es: 'Funciones Disponibles',
      fr: 'Fonctions Disponibles',
    }),
    welcome: t({
      en: 'Welcome to our application',
      es: 'Bienvenido a nuestra aplicación',
      fr: 'Bienvenue sur notre application',
    }),
  },
} satisfies Dictionary;

export default indexContent;
