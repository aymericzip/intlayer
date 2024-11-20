import { t, type DeclarationContent } from 'intlayer';

const dashboardNavbarContent = {
  key: 'dashboard-navbar',
  content: {
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
    },
  },
} satisfies DeclarationContent;

export default dashboardNavbarContent;
