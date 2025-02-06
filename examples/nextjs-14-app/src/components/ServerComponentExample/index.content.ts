import { t, type Dictionary } from 'intlayer';

const serverComponentExampleContent: DeclarationContent = {
  key: 'server-component-example',
  content: {
    title: t({
      en: 'Server Component Example',
      fr: 'Exemple de composant serveur',
      es: 'Ejemplo de componente servidor',
    }),
    content: t({
      en: 'This is the content of a server component example',
      fr: "Ceci est le contenu d'un exemple de composant server",
      es: 'Este es el contenido de un ejemplo de componente servidor',
    }),
  },
} satisfies Dictionary;

export default serverComponentExampleContent;
