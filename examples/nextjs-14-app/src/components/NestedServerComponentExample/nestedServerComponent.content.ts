import { type Dictionary, t } from 'intlayer';

const NestedServerComponent = {
  key: 'nested-server-component-example',
  content: {
    content: t({
      en: 'This is the content of a server component example wrapped inside a client component example',
      es: 'Este es el contenido de un ejemplo de componente servidor envuelto en un componente cliente',
      fr: "Ceci est le contenu d'un exemple de composant server enveloppé dans un composant client",
    }),
    title: t({
      en: 'Server Component wrapped inside a client component example',
      es: 'Ejemplo de componente servidor envuelto en un componente cliente',
      fr: 'Exemple de composant serveur enveloppé dans un composant client',
    }),
  },
} satisfies Dictionary;

export default NestedServerComponent;
