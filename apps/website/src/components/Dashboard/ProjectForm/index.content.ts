import { t, type DeclarationContent } from 'intlayer';

const projectFormContent = {
  key: 'project-form',
  content: {
    title: t({
      en: 'Project details',
      fr: 'Détails du projet',
      es: 'Detalles del proyecto',
    }),
    noAdminMessage: t({
      en: 'You are not an admin of this project. Contact your administrator if you want to to edit the project.',
      es: 'No eres un administrador de este proyecto. Contacta a tu administrador si deseas editar el proyecto.',
      fr: "Vous n'êtes pas un administrateur de ce projet. Veuillez contacter votre administrateur si vous souhaitez modifier le projet.",
    }),
    nameInput: {
      label: t({
        en: 'Name of the project',
        fr: 'Nom du projet',
        es: 'Nombre del proyecto',
      }),
      placeholder: t({
        en: 'Enter the name of the project',
        fr: 'Entrez le nom du projet',
        es: 'Ingrese el nombre del proyecto',
      }),
    },

    createProjectTitle: t({
      en: 'No project',
      fr: 'Aucun projet',
      es: 'Sin proyecto',
    }),

    createProjectDescription: t({
      en: 'Create your first project to start using Intlayer',
      fr: 'Créez votre premier projet pour commencer à utiliser Intlayer',
      es: 'Cree su primer proyecto para comenzar a usar Intlayer',
    }),

    createProjectButton: {
      text: t({
        en: 'Create project',
        fr: 'Créer un projet',
        es: 'Crear un proyecto',
      }),
      ariaLabel: t({
        en: 'Click to create project',
        fr: 'Cliquez pour créer un projet',
        es: 'Haga clic para crear un proyecto',
      }),
    },

    createProjectToasts: {
      projectCreated: {
        title: t({
          en: 'Project created',
          fr: 'Projet créé',
          es: 'Proyecto creado',
        }),
        description: t({
          en: 'Your project has been created successfully',
          fr: 'Votre projet a été créé avec succès',
          es: 'Su proyecto se ha creado con éxito',
        }),
      },
      projectCreationFailed: {
        title: t({
          en: 'Project creation failed',
          fr: 'La création de votre projet a échoué',
          es: 'La creación de su proyecto ha fallado',
        }),
      },
    },
    selectProjectToasts: {
      projectSelected: {
        title: t({
          en: 'Project selected',
          fr: 'Projet sélectionné',
          es: 'Proyecto seleccionado',
        }),
        description: t({
          en: 'Your project has been joint',
          fr: 'Votre projet a été sélectionné',
          es: 'Su proyecto se ha unido',
        }),
      },

      projectSelectionFailed: {
        title: t({
          en: 'Project selection failed',
          fr: 'La sélection de votre projet a échoué',
          es: 'La selección de su proyecto ha fallado',
        }),
      },
    },
    updateProjectToasts: {
      projectUpdated: {
        title: t({
          en: 'Project updated',
          fr: 'Projet mis à jour',
          es: 'Proyecto actualizado',
        }),
        description: t({
          en: 'Your project has been updated successfully',
          fr: 'Votre projet a été mis à jour avec succès',
          es: 'Tu proyecto ha sido actualizado con éxito',
        }),
      },
      projectUpdateFailed: {
        title: t({
          en: 'Project update failed',
          fr: 'La mise à jour du project a échoué',
          es: 'Error al actualizar el proyecto',
        }),
        description: t({
          en: 'Your project update has failed',
          fr: 'La mise à jour de votre projet a échoué',
          es: 'La actualización de tu proyecto ha fallado',
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

    accessKeys: {
      title: t({
        en: 'Access keys',
        fr: "Clés d'accès",
        es: 'Claves de acceso',
      }),
      description: t({
        en: 'Access keys are used to authenticate your project.',
        fr: "Les clés d'accès sont utilisées pour authentifier votre projet.",
        es: 'Las claves de acceso se utilizan para autenticar su proyecto',
      }),
      noAccessKeys: t({
        en: 'No access keys',
        fr: "Aucune clé d'accès",
        es: 'Sin claves de acceso',
      }),
      createAccessKey: {
        text: t({
          en: 'Create access key',
          fr: "Créer une clé d'accès",
          es: 'Crear una clave de acceso',
        }),
        label: t({
          en: 'Click to create access key',
          fr: "Cliquez pour créer une clé d'accès",
          es: 'Haga clic para crear una clave de acceso',
        }),
      },
    },
  },
} satisfies DeclarationContent;

export default projectFormContent;
