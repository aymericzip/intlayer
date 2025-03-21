import { t, type Dictionary } from 'intlayer';

const NestedServerComponent = {
  key: 'nested-server-component-example',
  content: {
    title: t({
      en: 'Server Component wrapped inside a client component example',
      fr: 'Exemple de composant serveur enveloppé dans un composant client',
      es: 'Ejemplo de componente servidor envuelto en un componente cliente',
    }),
    content: t({
      en: 'This is the content of a server component example wrapped inside a client component example',
      fr: "Ceci est le contenu d'un exemple de composant server enveloppé dans un composant client",
      es: 'Este es el contenido de un ejemplo de componente servidor envuelto en un componente cliente',
    }),
  },
} satisfies Dictionary;

export default NestedServerComponent;
