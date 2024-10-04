import { t, type DeclarationContent } from 'intlayer';

const dashboardNavbarContent: DeclarationContent = {
  id: 'dashboard-navbar',
  organizationTrigger: {
    label: t({
      en: 'Click to select an organization',
      fr: 'Cliquez pour sélectionner une organisation',
      es: 'Haga clic para seleccionar una organización',
    }),
  },
  selectOrganizationInstruction: t({
    en: 'Select organization',
    fr: 'Sélectionner une organisation',
    es: 'Seleccionar una organización',
  }),
  selectOrganizationAction: {
    toast: {
      success: {
        title: t({
          en: 'You are now logged in to organization',
          fr: "Vous êtes maintenant connecté à l'organisation",
          es: 'Ahora estás conectado a la organización',
        }),
        description: t({
          en: 'You can now log out from organization',
          fr: "Vous pouvez maintenant vous déconnecter de l'organisation",
          es: 'Ahora puedes cerrar sesión de la organización',
        }),
      },
      error: {
        title: t({
          en: 'An error occurred while logging in to organization',
          fr: "Une erreur s'est produite lors de la connexion à l'organisation",
          es: 'Se produjo un error al iniciar sesión en la organización',
        }),
        description: t({
          en: 'Please try again later',
          fr: 'Veuillez réessayer plus tard',
          es: 'Por favor, inténtalo de nuevo más tarde',
        }),
      },
    },
  },
  noOtherOrganizations: t({
    en: 'No other organizations',
    fr: 'Aucune autre organisation',
    es: 'Sin otras organizaciones',
  }),
  organizationLogout: {
    text: t({
      en: 'Log out from organization',
      fr: "Se déconnecter de l'organisation",
      es: 'Cerrar sesión de la organización',
    }),
    label: t({
      en: 'Click to log out from organization',
      fr: "Cliquez pour se déconnecter de l'organisation",
      es: 'Haga clic para cerrar sesión de la organización',
    }),
    toast: {
      success: {
        title: t({
          en: 'You are now logged out from organization',
          fr: "Vous êtes maintenant déconnecté de l'organisation",
          es: 'Ahora estás desconectado de la organización',
        }),
        description: t({
          en: 'You can now log in to another organization',
          fr: 'Vous pouvez maintenant vous connecter à une autre organisation',
          es: 'Ahora puedes iniciar sesión en otra organización',
        }),
      },
      error: {
        title: t({
          en: 'An error occurred while logging out from organization',
          fr: "Une erreur s'est produite lors de la déconnexion de l'organisation",
          es: 'Se produjo un error al cerrar sesión de la organización',
        }),
        description: t({
          en: 'Please try again later',
          fr: 'Veuillez réessayer plus tard',
          es: 'Por favor, inténtalo de nuevo más tarde',
        }),
      },
    },
  },
  createNewOrganization: {
    text: t({
      en: 'Create new organization',
      fr: 'Créer une nouvelle organisation',
      es: 'Crear una nueva organización',
    }),
    label: t({
      en: 'Click to create a new organization',
      fr: 'Cliquez pour créer une nouvelle organisation',
      es: 'Haga clic para crear una nueva organización',
    }),
    toast: {
      success: {
        title: t({
          en: 'You are now logged out from organization',
          fr: "Vous êtes maintenant déconnecté de l'organisation",
          es: 'Ahora estás desconectado de la organización',
        }),
        description: t({
          en: 'You can now log in to another organization',
          fr: 'Vous pouvez maintenant vous connecter à une autre organisation',
          es: 'Ahora puedes iniciar sesión en otra organización',
        }),
      },
      error: {
        title: t({
          en: 'An error occurred while logging out from organization',
          fr: "Une erreur s'est produite lors de la déconnexion de l'organisation",
          es: 'Se produjo un error al cerrar sesión de la organización',
        }),
        description: t({
          en: 'Please try again later',
          fr: 'Veuillez réessayer plus tard',
          es: 'Por favor, inténtalo de nuevo más tarde',
        }),
      },
    },
  },

  projectTrigger: {
    label: t({
      en: 'Click to select a project',
      fr: 'Cliquez pour sélectionner un projet',
      es: 'Haga clic para seleccionar un proyecto',
    }),
  },
  selectProjectInstruction: t({
    en: 'Select project',
    fr: 'Sélectionner un projet',
    es: 'Seleccionar un proyecto',
  }),
  selectProjectAction: {
    toast: {
      success: {
        title: t({
          en: 'You are now logged in to project',
          fr: 'Vous êtes maintenant connecté au projet',
          es: 'Ahora estás conectado al proyecto',
        }),
        description: t({
          en: 'You can now log out from project',
          fr: 'Vous pouvez maintenant vous déconnecter du projet',
          es: 'Ahora puedes cerrar sesión del proyecto',
        }),
      },
      error: {
        title: t({
          en: 'An error occurred while logging in to project',
          fr: "Une erreur s'est produite lors de la connexion au projet",
          es: 'Se produjo un error al iniciar sesión en el proyecto',
        }),
        description: t({
          en: 'Please try again later',
          fr: 'Veuillez réessayer plus tard',
          es: 'Por favor, inténtalo de nuevo más tarde',
        }),
      },
    },
  },
  noOtherProjects: t({
    en: 'No other projects',
    fr: 'Aucun autre projet',
    es: 'Sin otros proyectos',
  }),
  projectLogout: {
    text: t({
      en: 'Log out from project',
      fr: 'Se déconnecter du projet',
      es: 'Cerrar sesión del proyecto',
    }),
    label: t({
      en: 'Click to log out from project',
      fr: 'Cliquez pour se déconnecter du projet',
      es: 'Haga clic para cerrar sesión del proyecto',
    }),
    toast: {
      success: {
        title: t({
          en: 'You are now logged out from project',
          fr: 'Vous êtes maintenant déconnecté du projet',
          es: 'Ahora estás desconectado del proyecto',
        }),
        description: t({
          en: 'You can now log in to another project',
          fr: 'Vous pouvez maintenant vous connecter à un autre projet',
          es: 'Ahora puedes iniciar sesión en otro proyecto',
        }),
      },
      error: {
        title: t({
          en: 'An error occurred while logging out from project',
          fr: "Une erreur s'est produite lors de la déconnexion du projet",
          es: 'Se produjo un error al cerrar sesión del proyecto',
        }),
        description: t({
          en: 'Please try again later',
          fr: 'Veuillez réessayer plus tard',
          es: 'Por favor, inténtalo de nuevo más tarde',
        }),
      },
    },
  },
  createNewProject: {
    text: t({
      en: 'Create new project',
      fr: 'Créer un nouveau projet',
      es: 'Crear un nuevo proyecto',
    }),
    label: t({
      en: 'Click to create a new project',
      fr: 'Cliquez pour créer un nouveau projet',
      es: 'Haga clic para crear un nuevo proyecto',
    }),
    toast: {
      success: {
        title: t({
          en: 'You are now logged out from project',
          fr: 'Vous êtes maintenant déconnecté du projet',
          es: 'Ahora estás desconectado del proyecto',
        }),
        description: t({
          en: 'You can now log in to another project',
          fr: 'Vous pouvez maintenant vous connecter à un autre projet',
          es: 'Ahora puedes iniciar sesión en otro proyecto',
        }),
      },
      error: {
        title: t({
          en: 'An error occurred while logging out from project',
          fr: "Une erreur s'est produite lors de la déconnexion du projet",
          es: 'Se produjo un error al cerrar sesión del proyecto',
        }),
        description: t({
          en: 'Please try again later',
          fr: 'Veuillez réessayer plus tard',
          es: 'Por favor, inténtalo de nuevo más tarde',
        }),
      },
    },
  },
};

export default dashboardNavbarContent;
