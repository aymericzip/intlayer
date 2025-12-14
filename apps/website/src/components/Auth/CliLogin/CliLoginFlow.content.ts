import { type DeclarationContent, t } from 'intlayer';

const cliLoginFlowContent = {
  key: 'cli-login-flow',
  content: {
    loginTitle: t({
      en: 'Login to CLI',
      es: 'Iniciar sesión en CLI',
      fr: 'Connexion au CLI',
    }),
    selectOrganization: t({
      en: 'Select Organization',
      es: 'Seleccionar organización',
      fr: 'Sélectionner une organisation',
    }),
    selectProject: t({
      en: 'Select Project',
      es: 'Seleccionar proyecto',
      fr: 'Sélectionner un projet',
    }),
    selectAccessKey: t({
      en: 'Select Access Key',
      es: 'Seleccionar clave de acceso',
      fr: "Sélectionner une clé d'accès",
    }),
    success: {
      title: t({
        en: 'Success!',
        es: '¡Éxito!',
        fr: 'Succès !',
      }),
      message: t({
        en: 'You can close this tab and return to your terminal.',
        es: 'Puedes cerrar esta pestaña y volver a tu terminal.',
        fr: 'Vous pouvez fermer cet onglet et retourner à votre terminal.',
      }),
    },
  },
} satisfies DeclarationContent;

export default cliLoginFlowContent;
