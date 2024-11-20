import { t, type DeclarationContent } from 'intlayer';

const accessKeyFormContent = {
  key: 'access-key-creation-form',
  content: {
    title: t({
      en: 'Access key',
      fr: "Clé d'accès",
      es: 'Clave de acceso',
    }),
    nameInput: {
      label: t({
        en: 'Name of your access key',
        fr: "Nom de votre clé d'accès",
        es: 'Nombre de su clave de acceso',
      }),
      placeholder: t({
        en: 'Enter the name of your access key',
        fr: "Entrez le nom de votre clé d'accès",
        es: 'Ingrese el nombre de su clave de acceso',
      }),
    },

    rights: {
      label: t({
        en: 'Rights',
        fr: 'Droits',
        es: 'Derechos',
      }),
      dictionary: t({
        en: 'Dictionary',
        fr: 'Dictionnaire',
        es: 'Diccionario',
      }),
      project: t({
        en: 'Project',
        fr: 'Projet',
        es: 'Proyecto',
      }),
      organization: t({
        en: 'Organization',
        fr: 'Organisation',
        es: 'Organización',
      }),
      read: t({
        en: 'Read ',
        fr: 'Lecture ',
        es: 'Lectura ',
      }),
      write: t({
        en: 'Write ',
        fr: 'Écriture ',
        es: 'Escritura ',
      }),
      admin: 'Admin',
    },

    expiresAtInput: {
      label: t({
        en: 'Expires at',
        fr: 'Expire à',
        es: 'Expira en',
      }),
      placeholder: t({
        en: 'Select the expiration date',
        fr: "Sélectionnez la date d'expiration",
        es: 'Seleccione la fecha de expiración',
      }),
    },

    createAccessKeyButton: {
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
} satisfies DeclarationContent;

export default accessKeyFormContent;
