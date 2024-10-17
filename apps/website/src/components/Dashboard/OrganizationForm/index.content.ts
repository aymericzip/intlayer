import { t, type DeclarationContent } from 'intlayer';

const organizationFormContent = {
  key: 'organization-form',
  content: {
    nameInput: {
      label: t({
        en: 'Name',
        fr: 'Nom',
        es: 'Nombre',
      }),
      placeholder: t({
        en: 'Enter the name of your organization',
        fr: 'Entrez le nom de votre organisation',
        es: 'Ingrese el nombre de su organización',
      }),
    },

    createOrganizationTitle: t({
      en: 'No organization',
      fr: 'Aucune organisation',
      es: 'Sin organización',
    }),

    createOrganizationDescription: t({
      en: 'Create your first organization to start using Intlayer',
      fr: 'Créez votre première organisation pour commencer à utiliser Intlayer',
      es: 'Cree su primera organización para comenzar a usar Intlayer',
    }),

    createOrganizationButton: {
      text: t({
        en: 'Create organization',
        fr: 'Créer une organisation',
        es: 'Crear una organización',
      }),
      ariaLabel: t({
        en: 'Click to create organization',
        fr: 'Cliquez pour créer une organisation',
        es: 'Haga clic para crear una organización',
      }),
    },

    createOrganizationToasts: {
      organizationCreated: {
        title: t({
          en: 'Organization created',
          fr: 'Organisation créée',
          es: 'Organización creada',
        }),
        description: t({
          en: 'Your organization has been created successfully',
          fr: 'Votre organisation a été créée avec succès',
          es: 'Su organización se ha creado con éxito',
        }),
      },
      organizationCreationFailed: {
        title: t({
          en: 'Organization creation failed',
          fr: "La création de l'organisation a échoué",
          es: 'La creación de la organización ha fallado',
        }),
      },
    },
    selectOrganizationToasts: {
      organizationSelected: {
        title: t({
          en: 'Organization selected',
          fr: 'Organisation sélectionnée',
          es: 'Organización seleccionada',
        }),
        description: t({
          en: 'Your organization has been joint',
          fr: 'Votre organisation a été jointe',
          es: 'Su organización se ha unido',
        }),
      },

      organizationSelectionFailed: {
        title: t({
          en: 'Organization selection failed',
          fr: "La sélection de l'organisation a échoué",
          es: 'La selección de la organización ha fallado',
        }),
      },
    },
    updateOrganizationToasts: {
      organizationUpdated: {
        title: t({
          en: 'Organization updated',
          fr: 'Organisation mise à jour',
          es: '',
        }),
        description: t({
          en: 'Your organization has been updated successfully',
          fr: 'Votre organisation a été mise à jour avec succès',
          es: '',
        }),
      },
      organizationUpdateFailed: {
        title: t({
          en: 'Organization update failed',
          fr: "La mise à jour de l'organisation a échoué",
          es: '',
        }),
      },
    },

    editButton: {
      text: t({
        en: 'Edit organization',
        fr: "Modifier l'organisation",
        es: 'Editar la organización',
      }),
      ariaLabel: t({
        en: 'Click to edit',
        fr: 'Cliquez pour modifier',
        es: 'Haga clic para editar',
      }),
    },
  },
} satisfies DeclarationContent;

export default organizationFormContent;
