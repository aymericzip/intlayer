import { t, type DeclarationContent } from 'intlayer';

const profileFormContent: DeclarationContent = {
  id: 'profile-form',

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

export default profileFormContent;
