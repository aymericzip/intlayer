import { type Dictionary, t } from 'intlayer';

const faq3 = {
  key: 'faq',
  item: 3,
  content: {
    question: t({
      en: 'Does Intlayer support server-side rendering?',
      fr: 'Intlayer prend-il en charge le rendu côté serveur ?',
      es: '¿Intlayer admite la renderización en el servidor?',
    }),
    answer: t({
      en: 'Yes. Intlayer ships server-side hooks (`useIntlayer` from `react-intlayer/server`) and integrates with Next.js App Router out of the box.',
      fr: "Oui. Intlayer propose des hooks côté serveur (`useIntlayer` depuis `react-intlayer/server`) et s'intègre nativement avec le routeur App de Next.js.",
      es: 'Sí. Intlayer incluye hooks del lado del servidor (`useIntlayer` desde `react-intlayer/server`) y se integra con Next.js App Router de fábrica.',
    }),
  },
} satisfies Dictionary;

export default faq3;
