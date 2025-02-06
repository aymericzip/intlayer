import { t, type Dictionary } from 'intlayer';

const clientComponentExampleContent = {
  key: 'client-component-example',
  content: {
    title: t({
      en: 'Client Component Example',
      fr: 'Exemple de composant client',
      es: 'Ejemplo de componente cliente',
    }),
    content: t({
      en: 'This is the content of a client component example',
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: 'Este es el contenido de un ejemplo de componente cliente',
    }),
  },
} satisfies Dictionary;

export default clientComponentExampleContent;
