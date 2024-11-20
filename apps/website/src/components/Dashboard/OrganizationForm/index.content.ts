import { t, type DeclarationContent } from 'intlayer';

const organizationFormContent = {
  key: 'organization-form',
  content: {
    title: t({
      en: 'Organization details',
      fr: 'Détails de l’organisation',
      es: 'Detalles de la organización',
    }),
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

    selectButton: {
      text: t({
        en: 'Select',
        fr: 'Sélectionner',
        es: 'Seleccionar',
      }),
      ariaLabel: t({
        en: 'Click to select',
        fr: 'Cliquez pour sélectionner',
        es: 'Haga clic para seleccionar',
      }),
      selected: t({
        en: 'Selected',
        fr: 'Sélectionné',
        es: 'Seleccionado',
      }),
      unselected: t({
        en: 'Select',
        fr: 'Sélectionner',
        es: 'Seleccionar',
      }),
    },
  },
} satisfies DeclarationContent;

export default organizationFormContent;
