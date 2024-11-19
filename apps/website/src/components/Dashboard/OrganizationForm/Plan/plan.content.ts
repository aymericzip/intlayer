import { type DeclarationContent, t } from 'intlayer';

const planContent = {
  key: 'organization-plan',
  content: {
    title: t({
      en: 'Plan',
      fr: 'Plan',
      es: 'Plan',
    }),

    upgradeButton: {
      text: t({
        en: 'Upgrade',
        fr: 'Mettre à niveau',
        es: 'Mejorar',
      }),
      label: t({
        en: 'Click to upgrade',
        fr: 'Cliquez pour mettre à niveau',
        es: 'Haz clic para mejorar',
      }),
    },
  },
} satisfies DeclarationContent;

export default planContent;
