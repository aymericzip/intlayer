import { t, type DeclarationContent } from 'intlayer';

const projectFormContent: DeclarationContent = {
  id: 'project-form',

  nameInput: {
    label: t({
      en: 'Name',
      fr: 'Nom',
      es: 'Nombre',
    }),
    placeholder: t({
      en: 'Enter the name of your project',
      fr: 'Entrez le nom de votre projet',
      es: 'Ingrese el nombre de su proyecto',
    }),
  },

  createProjectTitle: t({
    en: 'No project',
    fr: 'Aucune organisation',
    es: 'Sin organización',
  }),

  createProjectDescription: t({
    en: 'Create your first project to start using Intlayer',
    fr: 'Créez votre première organisation pour commencer à utiliser Intlayer',
    es: 'Cree su primera organización para comenzar a usar Intlayer',
  }),

  createProjectButton: {
    text: t({
      en: 'Create project',
      fr: 'Créer une organisation',
      es: 'Crear una organización',
    }),
    ariaLabel: t({
      en: 'Click to create project',
      fr: 'Cliquez pour créer une organisation',
      es: 'Haga clic para crear una organización',
    }),
  },

  createProjectToasts: {
    projectCreated: {
      title: t({
        en: 'Project created',
        fr: 'Organisation créée',
        es: 'Organización creada',
      }),
      description: t({
        en: 'Your project has been created successfully',
        fr: 'Votre organisation a été créée avec succès',
        es: 'Su organización se ha creado con éxito',
      }),
    },
    projectCreationFailed: {
      title: t({
        en: 'Project creation failed',
        fr: "La création de l'organisation a échoué",
        es: 'La creación de la organización ha fallado',
      }),
    },
  },
  selectProjectToasts: {
    projectSelected: {
      title: t({
        en: 'Project selected',
        fr: 'Organisation sélectionnée',
        es: 'Organización seleccionada',
      }),
      description: t({
        en: 'Your project has been joint',
        fr: 'Votre organisation a été jointe',
        es: 'Su organización se ha unido',
      }),
    },

    projectSelectionFailed: {
      title: t({
        en: 'Project selection failed',
        fr: "La sélection de l'organisation a échoué",
        es: 'La selección de la organización ha fallado',
      }),
    },
  },
  updateProjectToasts: {
    projectUpdated: {
      title: t({
        en: 'Project updated',
        fr: 'Organisation mise à jour',
        es: '',
      }),
      description: t({
        en: 'Your project has been updated successfully',
        fr: 'Votre organisation a été mise à jour avec succès',
        es: '',
      }),
    },
    projectUpdateFailed: {
      title: t({
        en: 'Project update failed',
        fr: "La mise à jour de l'organisation a échoué",
        es: '',
      }),
    },
  },

  editButton: {
    text: t({
      en: 'Edit project',
      fr: 'Modifier le projet',
      es: 'Editar el proyecto',
    }),
    ariaLabel: t({
      en: 'Click to edit',
      fr: 'Cliquez pour modifier',
      es: 'Haga clic para editar',
    }),
  },
};

export default projectFormContent;
