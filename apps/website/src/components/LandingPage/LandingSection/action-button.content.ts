import { t, type DeclarationContent } from 'intlayer';

const actionButtonContent: DeclarationContent = {
  id: 'landing-section-action-button',
  primaryBtn: {
    label: t({
      en: 'Go to getting started documentation',
      fr: 'Accéder à la documentation de démarrage',
      es: 'Ir a la documentación de inicio',
    }),
    content: t({
      en: 'Get Started',
      fr: 'Commencer',
      es: 'Empezar',
    }),
  },
  secondaryBtn: {
    label: t({
      en: 'Go to the interest of intlayer documentation',
      fr: "Accéder à la documentation sur l'intérêt d'intlayer",
      es: 'Ir a la documentación del interés de intlayer',
    }),
    content: t({
      en: 'Why Intlayer?',
      fr: 'Pourquoi Intlayer?',
      es: '¿Por qué Intlayer?',
    }),
  },
};

export default actionButtonContent;
