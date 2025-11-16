import { type DeclarationContent, t } from 'intlayer';

const addPasskeyModalContent = {
  key: 'add-passkey-modal',
  content: {
    modalTitle: t({
      en: 'Add New Passkey',
      fr: 'Ajouter une nouvelle clé',
      es: 'Agregar nueva llave',
    }),
    modalDescription: t({
      en: 'Create a new passkey for secure, passwordless authentication.',
      fr: 'Créez une nouvelle clé de sécurité pour une authentification sécurisée sans mot de passe.',
      es: 'Cree una nueva llave de acceso para una autenticación segura sin contraseña.',
    }),
    nameInput: {
      label: t({
        en: 'Name',
        fr: 'Nom',
        es: 'Nombre',
      }),
      placeholder: t({
        en: 'Enter passkey name',
        fr: 'Entrez le nom de la clé',
        es: 'Ingrese el nombre de la llave',
      }),
    },
    submitButton: {
      text: t({
        en: 'Add Passkey',
        fr: 'Ajouter',
        es: 'Agregar',
      }),
      ariaLabel: t({
        en: 'Add new passkey',
        fr: 'Ajouter une nouvelle clé',
        es: 'Agregar nueva llave',
      }),
    },
    cancelButton: {
      text: t({
        en: 'Cancel',
        fr: 'Annuler',
        es: 'Cancelar',
      }),
      ariaLabel: t({
        en: 'Cancel adding passkey',
        fr: "Annuler l'ajout de la clé",
        es: 'Cancelar agregar llave',
      }),
    },
  },
} satisfies DeclarationContent;

export default addPasskeyModalContent;
