import { t, type DeclarationContent } from 'intlayer';

const content = {
  key: 'set-up-organization-schema',
  content: {
    requiredErrorOrganizationId: t({
      en: 'Please select an organization',
      fr: 'Veuillez sélectionner une organisation',
      es: 'Por favor, seleccione una organización',
    }),
  },
} satisfies DeclarationContent;

export default content;
