import { type Dictionary, t } from 'intlayer';

const serverComponentExample = {
  key: 'server-component-example',
  content: {
    title: t({
      en: 'Server Component Example',
      fr: 'Exemple de composant serveur',
      es: 'Ejemplo de componente servidor',
    }),
    description: t({
      en: 'This server component reads its content without a page-level provider.',
      fr: 'Ce composant serveur lit son contenu sans provider au niveau de la page.',
      es: 'Este componente servidor lee su contenido sin un proveedor a nivel de página.',
    }),
  },
} satisfies Dictionary;

export default serverComponentExample;
