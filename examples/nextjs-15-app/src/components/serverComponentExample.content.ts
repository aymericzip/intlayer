import { type Dictionary, t } from 'intlayer';

const serverComponentExample = {
  key: 'server-component-example',
  content: {
    description: t({
      en: 'This server component reads its content without a page-level provider.',
      es: 'Este componente servidor lee su contenido sin un proveedor a nivel de página.',
      fr: 'Ce composant serveur lit son contenu sans provider au niveau de la page.',
    }),
    title: t({
      en: 'Server Component Example',
      es: 'Ejemplo de componente servidor',
      fr: 'Exemple de composant serveur',
    }),
  },
} satisfies Dictionary;

export default serverComponentExample;
