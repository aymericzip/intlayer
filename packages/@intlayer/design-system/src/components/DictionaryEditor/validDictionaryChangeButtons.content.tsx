import { t, type DeclarationContent } from 'intlayer';

export const validDictionaryChangeButtonsContent = {
  key: 'valid-dictionary-change-buttons',
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
        fr: 'Publier le dictionnaire',
        es: 'Publicar diccionario',
      }),
      label: t({
        en: 'Click to publish dictionary',
        fr: 'Cliquez pour publier le dictionnaire',
        es: 'Haga clic para publicar el diccionario',
      }),
    },
    updateDictionaryToasts: {
      updated: {
        title: t({
          en: 'Dictionary updated',
          fr: 'Dictionnaire mis à jour',
          es: 'Diccionario actualizado',
        }),
        description: t({
          en: 'Your dictionary has been updated successfully',
          fr: 'Votre dictionnaire a été mis à jour avec succès',
          es: 'Su diccionario se ha actualizado con éxito',
        }),
      },
      failed: {
        title: t({
          en: 'Dictionary update failed',
          fr: 'La mise à jour du dictionnaire a échoué',
          es: 'La actualización del diccionario ha fallado',
        }),
      },
    },
  },
} satisfies DeclarationContent;
