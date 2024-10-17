import { t, type DeclarationContent } from 'intlayer';

const accessKeyFormContent = {
  key: 'access-key-creation-form',
  content: {
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

    createAccessKeyToasts: {
      accessKeyCreated: {
        title: t({
          en: 'Access key created',
          fr: "Clé d'accès créée",
          es: 'Clave de acceso creada',
        }),
        description: t({
          en: 'Your access key has been created successfully',
          fr: "Votre clé d'accès a été créée avec succès",
          es: 'Su clave de acceso se ha creado con éxito',
        }),
      },
    },
  },
} satisfies DeclarationContent;

export default accessKeyFormContent;
