import { t, type DeclarationContent } from 'intlayer';

export const editorViewContent = {
  key: 'editor-view',
  content: {
    titleInput: {
      placeholder: t({
        en: 'Enter the key of your dictionary',
        fr: 'Entrez la clé de votre dictionnaire',
        es: 'Ingrese la clave de su diccionario',
      }),
    },
    titleValidationButton: {
      label: t({
        en: 'Rename dictionary',
        fr: 'Renommer le dictionnaire',
        es: 'Renombrar el diccionario',
      }),
    },
  },
} satisfies DeclarationContent;
