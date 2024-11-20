import { t, type DeclarationContent } from 'intlayer';

const accessKeyFormContent = {
  key: 'access-key-form',

  content: {
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
    rights: {
      title: t({
        en: 'Rights',
        fr: 'Droits',
        es: 'Derechos',
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
      organization: t({
        en: 'Organization: ',
        fr: 'Organisation : ',
        es: 'Organización: ',
      }),
      project: t({
        en: 'Project: ',
        fr: 'Projet : ',
        es: 'Proyecto: ',
      }),
      dictionary: t({
        en: 'Dictionary: ',
        fr: 'Dictionnaire : ',
        es: 'Diccionario: ',
      }),
    },
    labels: {
      clientId: t({
        en: 'clientId:',
        fr: 'clientId :',
        es: 'clientId:',
      }),
      clientSecret: t({
        en: 'clientSecret:',
        fr: 'clientSecret :',
        es: 'clientSecret:',
      }),
      addedOn: t({
        en: 'Added on:',
        fr: 'Ajouté le :',
        es: 'Añadido el:',
      }),
      expireOn: t({
        en: 'Expire on:',
        fr: 'Expire le :',
        es: 'Expira el:',
      }),
      deleteButtonText: t({
        en: 'Delete',
        fr: 'Supprimer',
        es: 'Eliminar',
      }),
      deleteButtonLabel: t({
        en: 'Delete the access key',
        fr: "Supprimer la clé d'accès",
        es: 'Eliminar la clave de acceso',
      }),
      refreshButtonText: t({
        en: 'Refresh',
        fr: 'Actualiser',
        es: 'Actualizar',
      }),
      refreshButtonLabel: t({
        en: 'Refresh the access key secret key',
        fr: "Actualiser la clé secrète de la clé d'accès",
        es: 'Actualizar la clave secreta de la clave de acceso',
      }),
    },
    modal: {
      deleteTitle: t({
        en: 'Are you sure you want to delete this access key?',
        fr: "Êtes-vous sûr de vouloir supprimer cette clé d'accès ?",
        es: '¿Está seguro de que desea eliminar esta clave de acceso?',
      }),
      updateTitle: t({
        en: 'Are you sure you want to update this access key?',
        fr: "Êtes-vous sûr de vouloir mettre à jour cette clé d'accès ?",
        es: '¿Está seguro de que desea actualizar esta clave de acceso?',
      }),
      deleteMessage: t({
        en: 'This action CANNOT be undone. This will permanently delete the access key and if you’d like to use it in the future, you will need to create it again.',
        fr: "Cette action est IRRÉVERSIBLE. Cela supprimera définitivement la clé d'accès et si vous souhaitez l'utiliser à l'avenir, vous devrez la créer à nouveau.",
        es: 'Esta acción NO SE PUEDE deshacer. Esto eliminará permanentemente la clave de acceso y si desea usarla en el futuro, deberá crearla nuevamente.',
      }),
      updateMessage: t({
        en: 'This action will generate a new client secret. The old secret will no longer be valid. Please make sure to update your configurations accordingly.',
        fr: "Cette action générera un nouveau secret client. L'ancien secret ne sera plus valide. Veuillez vous assurer de mettre à jour vos configurations en conséquence.",
        es: 'Esta acción generará un nuevo secreto de cliente. El secreto anterior ya no será válido. Asegúrese de actualizar sus configuraciones en consecuencia.',
      }),
      deleteButtonLabel: t({
        en: 'Delete the access key',
        fr: "Supprimer la clé d'accès",
        es: 'Eliminar la clave de acceso',
      }),
      updateButtonLabel: t({
        en: 'Update the access key',
        fr: "Mettre à jour la clé d'accès",
        es: 'Actualizar la clave de acceso',
      }),
      deleteConfirmText: t({
        en: 'I understand, delete the access key',
        fr: "Je comprends, supprimez la clé d'accès",
        es: 'Entiendo, eliminar la clave de acceso',
      }),
      updateConfirmText: t({
        en: 'I understand, update the access key',
        fr: "Je comprends, mettez à jour la clé d'accès",
        es: 'Entiendo, actualizar la clave de acceso',
      }),
    },

    tuto: [
      t({
        en: '1 - Create an access key',
        fr: "1 - Créez une clé d'accès",
        es: '1 - Cree una clave de acceso',
      }),
      t({
        en: '2 - Copy the access key into your intlayer config file',
        fr: "2 - Copiez la clé d'accès dans votre fichier de configuration intlayer",
        es: '2 - Copie la clave de acceso en su archivo de configuración intlayer',
      }),
    ],
    warningMessage: t({
      en: 'Access keys are personal and should not be shared with others. Be careful to store these access keys securely, such as environment variables.',
      fr: "Les clés d'accès sont personnelles et ne doivent pas être partagées avec d'autres personnes. Attention à stocker ces clés d'accès en sécurité, comme en tant que variables d'environnement.",
      es: 'Las claves de acceso son personales y no deben compartirse con otras personas. Tenga cuidado para almacenar estas claves de acceso de forma segura, como variables de entorno.',
    }),
  },
} satisfies DeclarationContent;

export default accessKeyFormContent;
