import { t, type DeclarationContent } from 'intlayer';
import { Metadata } from 'next';

const docContent = {
  key: 'doc-configuration-metadata',
  content: {
    title: t({
      en: 'Configuration',
      fr: 'Configuration',
      es: 'Configuración',
    }),

    description: t({
      en: 'Learn how to configure Intlayer for your application. Understand the various settings and options available to customize Intlayer to your needs.',
      fr: 'Apprenez à configurer Intlayer pour votre application. Comprenez les différents paramètres et options disponibles pour personnaliser Intlayer selon vos besoins.',
      es: 'Aprenda cómo configurar Intlayer para su aplicación. Comprenda los diferentes ajustes y opciones disponibles para personalizar Intlayer según sus necesidades.',
    }),
    keywords: t({
      en: ['Configuration', 'Settings', 'Customization', 'Intlayer', 'Options'],
      fr: [
        'Configuration',
        'Paramètres',
        'Personnalisation',
        'Intlayer',
        'Options',
      ],
      es: [
        'Configuración',
        'Ajustes',
        'Personalización',
        'Intlayer',
        'Opciones',
      ],
    }),
  },
} satisfies DeclarationContent<Metadata>;

export default docContent;
