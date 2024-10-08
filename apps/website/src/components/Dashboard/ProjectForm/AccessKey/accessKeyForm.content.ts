import { t, type DeclarationContent } from 'intlayer';

const accessKeyFormContent: DeclarationContent = {
  id: 'access-key-form',

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
    en: 'Access keys are personal and should not be shared with others. Be careful to store these access keys securely, such as as environment variables.',
    fr: "Les clés d'authentification sont personnelles et ne doivent pas être partagées avec d'autres personnes. Attention à stocker ces clés d'accès en sécurité, comme en tant que variables d'environnement.",
    es: 'Las claves de acceso son personales y no deben compartirse con otras personas. Tenga cuidado para almacenar estas claves de acceso de forma segura, como variables de entorno.',
  }),
};

export default accessKeyFormContent;
