import { type DeclarationContent, t } from 'intlayer';

export const setUpOrganizationStepContent = {
  key: 'set-up-organization-step',
  content: {
    title: t({
      en: 'Set up your organization',
      fr: 'Configurez votre organisation',
      es: 'Configura tu organización',
    }),
    successToast: {
      title: t({
        en: 'Organization selected successfully',
        fr: 'Organisation sélectionnée avec succès',
        es: 'Organización seleccionada con éxito',
      }),
      description: t({
        en: 'You can now sign in to your organization.',
        fr: 'Vous pouvez maintenant vous connecter à votre organisation.',
        es: 'Ahora puedes iniciar sesión en tu organización.',
      }),
    },
  },
} satisfies DeclarationContent;

export default setUpOrganizationStepContent;
