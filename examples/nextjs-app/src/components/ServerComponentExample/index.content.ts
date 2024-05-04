import { t, type DeclarationContent } from 'intlayer';

const serverComponentExampleContent: DeclarationContent = {
  id: 'server-component-example',
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
};

export default serverComponentExampleContent;
