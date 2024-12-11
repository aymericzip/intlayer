import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-intlayer-with-express-metadata',
  content: {
    title: t({
      en: 'Intlayer with Express',
      fr: 'Intlayer avec Express',
      es: 'Intlayer con Express',
    }),

    description: t({
      en: 'Learn how to integrate Intlayer with Express to enable multilingual capabilities in your backend. This guide will show you how to configure your server to handle multiple languages, enhancing accessibility and user experience.',
      fr: "Apprenez à intégrer Intlayer avec Express pour activer les capacités multilingues dans votre backend. Ce guide vous montrera comment configurer votre serveur pour gérer plusieurs langues, améliorant l'accessibilité et l'expérience utilisateur.",
      es: 'Aprenda a integrar Intlayer con Express para habilitar capacidades multilingües en su backend. Esta guía le mostrará cómo configurar su servidor para manejar múltiples idiomas, mejorando la accesibilidad y la experiencia del usuario.',
    }),
    keywords: t({
      en: [
        'Internationalization',
        'Documentation',
        'Intlayer',
        'Express',
        'JavaScript',
        'Backend',
      ],
      fr: [
        'Internationalisation',
        'Documentation',
        'Intlayer',
        'Express',
        'JavaScript',
        'Backend',
      ],
      es: [
        'Internacionalización',
        'Documentación',
        'Intlayer',
        'Express',
        'JavaScript',
        'Backend',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
