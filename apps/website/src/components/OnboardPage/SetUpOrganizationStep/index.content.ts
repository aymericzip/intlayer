import { type DeclarationContent, t } from 'intlayer';

export const setUpOrganizationStepContent = {
  key: 'set-up-organization-step',
  content: {
    title: t({
      en: 'Set up your organization',
      fr: 'Configurez votre organisation',
      es: 'Configura tu organización',
    }),
  },
} satisfies DeclarationContent;

export default setUpOrganizationStepContent;
