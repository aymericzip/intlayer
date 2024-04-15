import { t, type ContentModule } from 'intlayer';

const clientComponentExampleContent: ContentModule = {
  id: 'client-component-example',
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
};

export default clientComponentExampleContent;
