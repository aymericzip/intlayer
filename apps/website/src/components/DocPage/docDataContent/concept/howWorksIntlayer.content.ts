import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-how-works-intlayer-metadata',
  content: {
    title: t({
      en: 'How Intlayer Works',
      fr: 'Comment Intlayer fonctionne',
      es: 'Cómo funciona Intlayer',
    }),

    description: t({
      en: 'Learn how Intlayer operates internally. Understand the architecture and components that make Intlayer powerful.',
      fr: "Apprenez comment Intlayer fonctionne en interne. Comprenez l'architecture et les composants qui rendent Intlayer puissant.",
      es: 'Aprenda cómo funciona Intlayer internamente. Comprenda la arquitectura y los componentes que hacen que Intlayer sea potente.',
    }),
    keywords: t({
      en: [
        'Intlayer',
        'How it works',
        'Architecture',
        'Components',
        'Internal workings',
      ],
      fr: [
        'Intlayer',
        'Comment ça marche',
        'Architecture',
        'Composants',
        'Fonctionnement interne',
      ],
      es: [
        'Intlayer',
        'Cómo funciona',
        'Arquitectura',
        'Componentes',
        'Funcionamiento interno',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
