import { t, type DeclarationContent } from 'intlayer';

const organizationFormContent: DeclarationContent = {
  id: 'organization-form',

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
      en: 'Edit',
      fr: 'Modifier',
      es: 'Editar',
    }),
    ariaLabel: t({
      en: 'Click to edit',
      fr: 'Cliquez pour modifier',
      es: 'Haga clic para editar',
    }),
  },
};

export default organizationFormContent;
