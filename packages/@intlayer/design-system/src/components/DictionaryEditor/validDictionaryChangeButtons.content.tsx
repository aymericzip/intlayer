import { t, type DeclarationContent } from 'intlayer';

export const validDictionaryChangeButtonsContent = {
  key: 'valid-dictionary-change-buttons',
  content: {
    resetButton: {
      text: t({
        en: 'Reset all changes',
        fr: 'Réinitialiser toutes les modifications',
        es: 'Restablecer todas las modificaciones',
      }),
      label: t({
        en: 'Click to reset all the changes',
        fr: 'Cliquez pour réinitialiser toutes les modifications',
        es: 'Haga clic para restablecer todas las modificaciones',
      }),
    },
    saveButton: {
      text: t({
        en: 'Save changes',
        fr: 'Enregistrer les modifications',
        es: 'Guardar cambios',
      }),
      label: t({
        en: 'Click to save changes',
        fr: 'Cliquez pour enregistrer les modifications',
        es: 'Haga clic para guardar los cambios',
      }),
    },
    publishButton: {
      text: t({
        en: 'Publish dictionary',
        fr: 'Publier le dictionnaire',
        es: 'Publicar diccionario',
      }),
      label: t({
        en: 'Click to publish dictionary',
        fr: 'Cliquez pour publier le dictionnaire',
        es: 'Haga clic para publicar el diccionario',
      }),
    },
  },
} satisfies DeclarationContent;
