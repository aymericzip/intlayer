import { t, type DeclarationContent } from 'intlayer';

export const saveDictionaryContent = {
  key: 'save-dictionary-details',
  content: {
    resetButton: {
      text: t({
        en: 'Reset changes',
        fr: 'Réinitialiser les modifications',
        es: 'Restablecer cambios',
      }),
      label: t({
        en: 'Click to reset changes',
        fr: 'Cliquez pour réinitialiser les modifications',
        es: 'Haga clic para restablecer los cambios',
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
        fr: 'Publier dictionnaire',
        es: 'Publicar diccionario',
      }),
      label: t({
        en: 'Click to publish dictionary',
        fr: 'Cliquez pour publier dictionnaire',
        es: 'Haga clic para publicar el diccionario',
      }),
    },
  },
} satisfies DeclarationContent;
