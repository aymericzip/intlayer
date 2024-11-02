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
        fr: 'Publier les dictionnaires',
        es: 'Publicar diccionario',
      }),
      label: t({
        en: 'Click to publish dictionary',
        fr: 'Cliquez pour publier les dictionnaires',
        es: 'Haga clic para publicar el diccionario',
      }),
    },
    updateOrganizationToasts: {
      updated: {
        title: t({
          en: 'Organization updated',
          fr: 'Organisation mise à jour',
          es: 'Organización actualizada',
        }),
        description: t({
          en: 'Your organization has been updated successfully',
          fr: 'Votre organisation a été mise à jour avec succès',
          es: 'Su organización se ha actualizado con éxito',
        }),
      },
      failed: {
        title: t({
          en: 'Organization update failed',
          fr: "La mise à jour de l'organisation a échoué",
          es: 'La actualización de la organización ha fallado',
        }),
      },
    },
  },
} satisfies DeclarationContent;
