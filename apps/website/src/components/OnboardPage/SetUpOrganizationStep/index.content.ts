import { type DeclarationContent, t } from 'intlayer';

export const setUpOrganizationStepContent = {
  key: 'set-up-organization-step',
  content: {
    title: t({
      en: 'Select your organization',
      fr: 'Sélectionnez votre organisation',
      es: 'Selecciona tu organización',
    }),
  },
} satisfies DeclarationContent;

export default setUpOrganizationStepContent;
