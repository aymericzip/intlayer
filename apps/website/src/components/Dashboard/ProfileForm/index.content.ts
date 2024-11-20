import { t, type DeclarationContent } from 'intlayer';

const profileFormContent = {
  key: 'profile-form',
  content: {
    title: t({
      en: 'Profile details',
      es: 'Detalles del perfil',
      fr: 'Détails du profil',
    }),
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

    emailInput: {
      label: t({
        en: 'Email',
        fr: 'E-mail',
        es: 'Correo electrónico',
      }),
      placeholder: t({
        en: 'Enter your email address',
        fr: 'Entrez votre adresse e-mail',
        es: 'Ingrese su dirección de correo electrónico',
      }),
    },

    editButton: {
      text: t({
        en: 'Edit profile',
        fr: 'Modifier le profil',
        es: 'Editar el perfil',
      }),
      ariaLabel: t({
        en: 'Click to edit',
        fr: 'Cliquez pour modifier',
        es: 'Haga clic para editar',
      }),
    },
  },
} satisfies DeclarationContent;

export default profileFormContent;
