import { type Dictionary, t } from 'intlayer';

const heroDefault = {
  key: 'hero',
  variant: 'default',
  content: {
    ctaLabel: t({
      en: 'Get started',
      es: 'Empezar',
      fr: 'Commencer',
    }),
    headline: t({
      en: 'Ship i18n in minutes',
      es: 'Lanza i18n en minutos',
      fr: "Déployez l'i18n en quelques minutes",
    }),
    subheadline: t({
      en: 'Intlayer keeps your content close to your components — no JSON spaghetti.',
      es: 'Intlayer mantiene tu contenido cerca de tus componentes, sin enredos de JSON.',
      fr: 'Intlayer garde votre contenu près de vos composants — sans spaghetti JSON.',
    }),
  },
} satisfies Dictionary;

export default heroDefault;
