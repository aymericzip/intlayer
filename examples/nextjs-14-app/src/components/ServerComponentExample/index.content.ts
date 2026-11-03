import { type Dictionary, t } from 'intlayer';

const serverComponentExampleContent = {
  key: 'server-component-example',
  content: {
    content: t({
      en: 'This is the content of a server component example',
      es: 'Este es el contenido de un ejemplo de componente servidor',
      fr: "Ceci est le contenu d'un exemple de composant server",
    }),
    title: t({
      en: 'Server Component Example',
      es: 'Ejemplo de componente servidor',
      fr: 'Exemple de composant serveur',
    }),
  },
} satisfies Dictionary;

export default serverComponentExampleContent;
