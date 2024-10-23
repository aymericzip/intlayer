import { t, type DeclarationContent } from 'intlayer';

const projectMembersFormContent = {
  key: 'project-members-form',

  content: {
    title: t({ en: 'Members', es: 'Miembros', fr: 'Membres' }),
    description: t({
      en: 'Manage the members that have access and can edit your project.',
      es: 'Administra los miembros que tienen acceso y pueden editar tu proyecto.',
      fr: 'Gérez les membres qui ont accès et peuvent modifier votre projet.',
    }),

    noMembers: t({
      en: 'No members',
      es: 'Sin miembros',
      fr: 'Aucun membre',
    }),

    membersSelect: {
      label: t({
        en: 'Select members',
        es: 'Seleccionar miembros',
        fr: 'Sélectionner des membres',
      }),
      placeholder: t({
        en: 'Select members',
        es: 'Seleccionar miembros',
        fr: 'Sélectionner des membres',
      }),
      description: t({
        en: 'Members can view the project.',
        es: 'Los miembros pueden ver el proyecto.',
        fr: 'Les membres peuvent voir le projet.',
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
        en: 'Admins can edit members and project settings.',
        es: 'Los administradores pueden editar miembros y configuraciones del proyecto.',
        fr: 'Les admins peuvent modifier les membres et les paramètres du projet.',
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

    updateProjectMembersToasts: {
      updated: {
        title: t({
          en: 'Project members updated',
          fr: 'Membres du projet mis à jour',
          es: 'Miembros del proyecto actualizados',
        }),
        description: t({
          en: 'Your project has been updated successfully',
          fr: 'Votre projet a été mis à jour avec succès',
          es: 'Tu proyecto ha sido actualizado con éxito',
        }),
      },
      failed: {
        title: t({
          en: 'Project update failed',
          fr: 'La mise à jour du projet a échoué',
          es: 'Error al actualizar el proyecto',
        }),
      },
    },
  },
} satisfies DeclarationContent;

export default projectMembersFormContent;
