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
    cancelButton: {
      text: t({
        en: 'Cancel plan',
        fr: 'Annuler le plan',
        es: 'Cancelar plan',
      }),
      label: t({
        en: 'Click to cancel plan',
        fr: 'Cliquez pour annuler le plan',
        es: 'Haz clic para cancelar el plan',
      }),
    },

    cancelModal: {
      title: t({
        en: 'Are you sure you want to cancel your subscription?',
        fr: 'Êtes-vous sûr de vouloir annuler votre abonnement ?',
        es: '¿Está seguro de que desea cancelar su suscripción?',
      }),

      message: t({
        en: 'This action CANNOT be undone. This will permanently cancel your subscription. Your other organization members will also loose access to the organization and access to premium features will be disabled. If you’d like to use it in the future, you will need to create it again.',
        fr: "Cette action est IRRÉVERSIBLE. Cela annulera votre abonnement. Les autres membres de votre organisation seront également perdus de l'accès à l'organisation et à toutes les fonctionnalités premium. Si vous souhaitez l'utiliser à l'avenir, vous devrez la créer à nouveau.",
        es: 'Esta acción NO SE PUEDE deshacer. Esto cancelará permanentemente su suscripción. Los otros miembros de su organización también perderán el acceso a la organización y las funcionalidades premium de acceso se desactivarán. Si desea usarla en el futuro, deberá crearla nuevamente.',
      }),

      buttonLabel: t({
        en: 'Cancel my subscription',
        fr: 'Annuler mon abonnement',
        es: 'Cancelar mi suscripción',
      }),

      confirmText: t({
        en: 'I understand, cancel my subscription',
        fr: 'Je comprends, annuler mon abonnement',
        es: 'Entiendo, cancelar mi suscripción',
      }),
    },
  },
} satisfies DeclarationContent;

export default planContent;
