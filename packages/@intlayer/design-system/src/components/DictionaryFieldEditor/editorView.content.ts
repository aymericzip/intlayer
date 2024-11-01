import { t, type DeclarationContent } from 'intlayer';

export const editorViewContent = {
  key: 'editor-view',
  content: {
    titleInput: {
      label: t({
        en: 'Node key',
        fr: 'Clé du nœud',
        es: 'Clave del nodo',
      }),
      placeholder: t({
        en: 'Enter the key of your node',
        fr: 'Entrez la clé de votre nœud',
        es: 'Ingrese la clave de su nodo',
      }),
    },
    nodeTypeSelector: {
      label: t({
        en: 'Node type',
        fr: 'Type de nœud',
        es: 'Tipo de nodo',
      }),
    },
    deleteButton: {
      text: t({
        en: 'Delete node',
        fr: 'Supprimer le nœud',
        es: 'Eliminar el nodo',
      }),
      label: t({
        en: 'Remove node from section',
        fr: 'Supprimer le nœud de la section',
        es: 'Eliminar el nodo de la sección',
      }),
    },
  },
} satisfies DeclarationContent;
