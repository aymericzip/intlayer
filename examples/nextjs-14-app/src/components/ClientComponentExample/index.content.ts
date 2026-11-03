import { type Dictionary, t } from 'intlayer';

const clientComponentExampleContent = {
  key: 'client-component-example',
  content: {
    content: t({
      en: 'This is the content of a client component example',
      es: 'Este es el contenido de un ejemplo de componente cliente',
      fr: "Ceci est le contenu d'un exemple de composant client",
    }),
    title: t({
      en: 'Client Component Example',
      es: 'Ejemplo de componente cliente',
      fr: 'Exemple de composant client',
    }),
  },
} satisfies Dictionary;

export default clientComponentExampleContent;
