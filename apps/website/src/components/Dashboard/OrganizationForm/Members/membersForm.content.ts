import { t, type DeclarationContent } from 'intlayer';

const organizationMembersFormContent = {
  key: 'organization-members-form',

  content: {
    title: t({ en: 'Members', es: 'Miembros', fr: 'Membres' }),
    description: t({
      en: 'Manage the members that have access and can edit your organization.',
      es: 'Administra los miembros que tienen acceso y pueden editar tu organización.',
      fr: 'Gérez les membres qui ont accès et peuvent modifier votre organisation.',
    }),
    deleteMemberButton: {
      label: t({
        en: 'Delete',
        es: 'Eliminar',
        fr: 'Supprimer',
      }),
    },
    noMembers: t({
      en: 'No members',
      es: 'Sin miembros',
      fr: 'Aucun membre',
    }),

    newMemberEmailInput: {
      label: t({
        en: 'Add a member',
        es: 'Agregar miembro',
        fr: 'Ajouter un membre',
      }),
      placeholder: t({
        en: 'Enter an email address',
        es: 'Ingrese una dirección de correo electrónico',
        fr: 'Entrez une adresse e-mail',
      }),

      description: t({
        en: 'Add members to your organization by entering their email addresses.',
        es: 'Agrega miembros a tu organización ingresando sus direcciones de correo electrónico.',
        fr: 'Ajoutez des membres à votre organisation en saisissant leurs adresses e-mail.',
      }),
    },

    newMemberSubmitButton: {
      label: t({
        en: 'Add member',
        es: 'Agregar miembro',
        fr: 'Ajouter the membre',
      }),
      text: t({
        en: 'Add',
        es: 'Agregar',
        fr: 'Ajouter',
      }),
      placeholder: t({
        en: 'Add a member',
        es: 'Agregar miembro',
        fr: 'Ajouter the membre',
      }),
    },

    adminsSelect: {
      label: t({
        en: 'Select admins',
        es: 'Seleccionar administradores',
        fr: 'Sélectionner des administrateurs',
      }),
      placeholder: t({
        en: 'Select admins',
        es: 'Seleccionar administradores',
        fr: 'Sélectionner des administrateurs',
      }),
      description: t({
        en: 'Admins can edit members and organization settings.',
        es: 'Los administradores pueden editar miembros y configuraciones del organización.',
        fr: 'Les admins peuvent modifier les membres et les paramètres du organisation.',
      }),
    },
    addMembersButton: {
      text: t({
        en: 'Update Members',
        es: 'Actualizar Miembros',
        fr: 'Mettre à jour des Membres',
      }),
      label: t({
        en: 'Update Members',
        es: 'Actualizar Miembros',
        fr: 'Mettre à jour des Membres',
      }),
    },

    updateOrganizationMembersToasts: {
      updated: {
        title: t({
          en: 'Organization members updated',
          fr: 'Membres du organisation mis à jour',
          es: 'Miembros del organización actualizados',
        }),
        description: t({
          en: 'Your organization has been updated successfully',
          fr: 'Votre organisation a été mis à jour avec succès',
          es: 'Tu organización ha sido actualizado con éxito',
        }),
      },
      failed: {
        title: t({
          en: 'Organization update failed',
          fr: 'La mise à jour du organisation a échoué',
          es: 'Error al actualizar el organización',
        }),
      },
    },
  },
} satisfies DeclarationContent;

export default organizationMembersFormContent;
