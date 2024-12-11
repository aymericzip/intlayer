import { t, type DeclarationContent } from 'intlayer';

const docDataContent = {
  key: 'doc-data',
  content: {
    'get-started': {
      title: t({
        en: 'Get Started',
        fr: 'Commencer',
        es: 'Empezar',
      }),
    },
    concept: {
      title: t({
        en: 'Concept',
        fr: 'Concept',
        es: 'Concepto',
      }),
      subSections: {
        'how-works-intlayer': {
          title: t({
            en: 'How works Intlayer',
            fr: 'Comment Intlayer fonctionne',
            es: 'Cómo funciona Intlayer',
          }),
        },
        configuration: {
          title: t({
            en: 'Configuration',
            fr: 'Configuration',
            es: 'Configuración',
          }),
        },

        interest: {
          title: t({
            en: 'Interest of Intlayer',
            fr: "Intérêt d'Intlayer",
            es: 'Interés de Intlayer',
          }),
        },
        cli: {
          title: t({
            en: 'Intayer CLI',
            fr: 'Intlayer CLI',
            es: 'Intlayer CLI',
          }),
        },
        editor: {
          title: t({
            en: 'Intlayer Editor',
            fr: 'Intlayer Editor',
            es: 'Intlayer Editor',
          }),
        },
        content: {
          title: t({
            en: 'Content Declaration',
            fr: 'Déclaration de Contenu',
            es: 'Declaración de Contenido',
          }),
          subsections: {
            translation: {
              title: t({
                en: 'Translation',
                fr: 'Traduction',
                es: 'Traducción',
              }),
            },
            enumeration: {
              title: t({
                en: 'Enumeration',
                fr: 'Énumération',
                es: 'Enumeración',
              }),
            },
            'function-fetching': {
              title: t({
                en: 'Function Fetching',
                fr: 'Fonction Fetching',
                es: 'Función Fetching',
              }),
            },
          },
        },
      },
    },
    environment: {
      title: t({
        en: 'Environment',
        fr: 'Environnement',
        es: 'Entornos',
      }),
      subSections: {
        nextjs: {
          title: t({
            en: 'Intlayer with Next.js',
            fr: 'Intlayer avec Next.js',
            es: 'Intlayer con Next.js',
          }),
          subSections: {
            14: {
              title: t({
                en: 'Next.js 14 and App Router',
                fr: 'Next.js 14 et App Router',
                es: 'Next.js 14 y App Router',
              }),
            },
            'next-with-Page-Router': {
              title: t({
                en: 'Next.js and Page Router',
                fr: 'Next.js et Page Router',
                es: 'Next.js y Page Router',
              }),
            },
          },
        },
        'create-react-app': {
          title: t({
            en: 'Intlayer with React CRA',
            fr: 'Intlayer avec React CRA',
            es: 'Intlayer con React CRA',
          }),
        },
        'vite-and-react': {
          title: t({
            en: 'Intlayer with Vite and React',
            fr: 'Intlayer avec Vite and React',
            es: 'Intlayer con Vite and React',
          }),
        },
        express: {
          title: t({
            en: 'Intlayer with Express',
            fr: 'Intlayer avec Express',
            es: 'Intlayer con Express',
          }),
        },
      },
    },
    packages: {
      title: 'Packages',
      subSections: {
        'express-intlayer': {
          title: 'express-intlayer',
          subSections: {
            t: {
              title: 't',
            },
          },
        },
        'react-intlayer': {
          title: 'react-intlayer',
          subSections: {
            t: {
              title: 't',
            },
            useIntlayer: {
              title: 'useIntlayer',
            },
            useDictionary: {
              title: 'useDictionary',
            },
            useLocale: {
              title: 'useLocale',
            },
          },
        },
        'next-intlayer': {
          title: 'next-intlayer',
          subSections: {
            t: {
              title: 't',
            },
            useIntlayer: {
              title: 'useIntlayer',
            },
            useDictionary: {
              title: 'useDictionary',
            },
            useLocale: {
              title: 'useLocale',
            },
          },
        },
      },
    },
    blog: {
      title: t({
        en: 'Blog',
        fr: 'Blog',
        es: 'Blog',
      }),
      subSections: {
        i18next: {
          title: t({
            en: 'Intlayer and i18next',
            fr: 'Intlayer et i18next',
            es: 'Intlayer y i18next',
          }),
        },
      },
    },
  },
} satisfies DeclarationContent;

export default docDataContent;
