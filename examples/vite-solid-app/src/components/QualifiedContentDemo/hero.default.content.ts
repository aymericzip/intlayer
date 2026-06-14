import { type Dictionary, t } from 'intlayer';

const heroDefault = {
  key: 'hero',
  variant: 'default',
  content: {
    headline: t({
      en: 'Ship i18n in minutes',
      fr: "Déployez l'i18n en quelques minutes",
      es: 'Lanza i18n en minutos',
    }),
    subheadline: t({
      en: 'Intlayer keeps your content close to your components — no JSON spaghetti.',
      fr: 'Intlayer garde votre contenu près de vos composants — sans spaghetti JSON.',
      es: 'Intlayer mantiene tu contenido cerca de tus componentes, sin enredos de JSON.',
    }),
    ctaLabel: t({
      en: 'Get started',
      fr: 'Commencer',
      es: 'Empezar',
    }),
  },
} satisfies Dictionary;

export default heroDefault;
