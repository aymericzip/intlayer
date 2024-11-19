import { t, DeclarationContent } from 'intlayer';

const pricingContent = {
  key: 'step-layout',
  content: {
    nextStepButton: {
      label: t({ en: 'Next', fr: 'Suivant', es: 'Siguiente' }),
      text: t({ en: 'Next', fr: 'Suivant', es: 'Siguiente' }),
    },
    previousStepButton: {
      label: t({ en: 'Previous', fr: 'Précédent', es: 'Anterior' }),
      text: t({ en: 'Previous', fr: 'Précédent', es: 'Anterior' }),
    },
    skipButton: {
      label: t({ en: 'Skip', fr: 'Passer', es: 'Saltar' }),
      text: t({ en: 'Skip', fr: 'Passer', es: 'Saltar' }),
    },
  },
} satisfies DeclarationContent;

export default pricingContent;
