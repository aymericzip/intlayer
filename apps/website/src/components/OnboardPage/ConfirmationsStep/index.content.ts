import { type DeclarationContent, t } from 'intlayer';

export const confirmationStepContent = {
  key: 'confirmation-step',
  content: {
    confirmation: {
      title: t({
        en: 'Confirmation',
        fr: 'Confirmation',
        es: 'Confirmación',
      }),
      hiText: t({
        en: 'Hi {name}!',
        fr: 'Bonjour {name}!',
        es: 'Hola {name}!',
      }),
      description: t({
        en: 'You are now ready to start using Intlayer.',
        fr: 'Vous êtes maintenant prêt à utiliser Intlayer.',
        es: 'Ahora estás listo para comenzar a usar Intlayer.',
      }),
    },
    goToDashboardButton: {
      label: t({
        en: 'Go to dashboard',
        fr: 'Aller au tableau de bord',
        es: 'Ir al tablero de mando',
      }),
      text: t({
        en: 'Go to dashboard',
        fr: 'Aller au tableau de bord',
        es: 'Ir al tablero de mando',
      }),
    },
  },
} satisfies DeclarationContent;

export default confirmationStepContent;
