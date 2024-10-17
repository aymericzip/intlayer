import { t, type DeclarationContent } from 'intlayer';

const profileFormContent = {
  key: 'profile-form',
  content: {
    nameInput: {
      label: t({
        en: 'Name',
        fr: 'Nom',
        es: 'Nombre',
      }),
      placeholder: t({
        en: 'Enter your name',
        fr: 'Entrez votre nom',
        es: 'Ingrese su nombre',
      }),
    },

    editButton: {
      text: t({
        en: 'Edit profile',
        fr: 'Modifier le profil',
        es: 'Editar el perfil',
      }),
      ariaLabel: t({
        en: 'Click to edit',
        fr: 'Cliquez pour modifier',
        es: 'Haga clic para editar',
      }),
    },

    updateProfileToasts: {
      profileUpdated: {
        title: t({
          en: 'Profile updated',
          fr: 'Profil mis à jour',
          es: 'Perfil actualizado',
        }),
        description: t({
          en: 'Your profile has been updated successfully',
          fr: 'Votre profil a été mis à jour avec succès',
          es: 'Su perfil se ha actualizado con éxito',
        }),
      },
      profileUpdateFailed: {
        title: t({
          en: 'Profile update failed',
          fr: 'La mise à jour du profil a échoué',
          es: 'La actualización del perfil ha fallado',
        }),
      },
    },
  },
} satisfies DeclarationContent;

export default profileFormContent;
