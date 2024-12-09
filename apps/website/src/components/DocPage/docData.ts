import type { DocsKeys } from '@intlayer/docs';
import { type IConfigLocales, getTranslationContent, Locales } from 'intlayer';
import { locales } from '../../../intlayer.config';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export type DocData = {
  docName: DocsKeys;
  url: PagesRoutes;
  githubUrl: GithubRoutes;
  title: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Section = Record<string, CategorizedDocData>;

export type CategorizedDocData = {
  title: string;
  default?: DocData;
  subSections?: Section;
};

export const getDocData = (locale = Locales.ENGLISH) => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const result: Record<string, CategorizedDocData> = {
    'get-started': {
      title: t({
        en: 'Get Started',
        fr: 'Commencer',
        es: 'Empezar',
      }),

      default: {
        docName: 'introduction',
        url: PagesRoutes.Doc_GetStarted,
        githubUrl: GithubRoutes.Introduction,
        title: t({
          en: 'Introduction',
          fr: 'Introduction',
          es: 'Introducción',
        }),
        description: t({
          en: 'Discover how Intlayer works. See the steps used by Intlayer in your application. See what does the different packages do.',
          fr: 'Découvrez comment Intlayer fonctionne. Voir les étapes utilisées par Intlayer dans votre application. Voir ce qui fait les différents packages.',
          es: 'Descubra cómo funciona Intlayer. Vea las pasos utilizados por Intlayer en su aplicación. Vea lo que hace los diferentes paquetes.',
        }),
        keywords: t({
          en: [
            'Introduction',
            'Get started',
            'Intlayer',
            'Applifcation',
            'Packages',
          ],
          fr: [
            'Introduction',
            'Commencer',
            'Intlayer',
            'Application',
            'Packages',
          ],
          es: ['Introducción', 'Empezar', 'Intlayer', 'Aplicación', 'Paquetes'],
        }),
        createdAt: new Date('2024-08-11'),
        updatedAt: new Date('2024-08-11'),
      },
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
          default: {
            docName: 'how_works_intlayer',
            url: PagesRoutes.Doc_HowWorksIntlayer,
            githubUrl: GithubRoutes.HowWorksIntlayer,
            title: t({
              en: 'How works Intlayer',
              fr: 'Comment Intlayer fonctionne',
              es: 'Cómo funciona Intlayer',
            }),
            description: t({
              en: 'Discover how Intlayer works. See the steps used by Intlayer in your application. See what does the different packages do.',
              fr: 'Découvrez comment Intlayer fonctionne. Voir les étapes utilisées par Intlayer dans votre application. Voir ce qui fait les différents packages.',
              es: 'Descubra cómo funciona Intlayer. Vea las pasos utilizados por Intlayer en su aplicación. Vea lo que hace los diferentes paquetes.',
            }),
            keywords: t({
              en: [
                'How works Intlayer',
                'Package',
                'Functioning',
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              fr: [
                'Comment Intlayer fonctionne',
                'Package',
                'Fonctionnement',
                'Internationalisation',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              es: [
                'Cómo funciona Intlayer',
                'Package',
                'Funcionamiento',
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
            }),
            createdAt: new Date('2024-08-11'),
            updatedAt: new Date('2024-08-11'),
          },
        },
        configuration: {
          title: t({
            en: 'Configuration',
            fr: 'Configuration',
            es: 'Configuración',
          }),
          default: {
            docName: 'configuration',
            url: PagesRoutes.Doc_Configuration,
            githubUrl: GithubRoutes.Configuration,
            title: t({
              en: 'Configuration',
              fr: 'Configuration',
              es: 'Configuración',
            }),
            description: t({
              en: 'Discover how to configure Intlayer to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
              fr: 'Découvrez comment configurer Intlayer pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
              es: 'Descubra cómo configurar Intlayer para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
            }),
            keywords: t({
              en: [
                'Configuration',
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              fr: [
                'Configuration',
                'Internationalisation',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              es: [
                'Configuración',
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
            }),
            createdAt: new Date('2024-08-11'),
            updatedAt: new Date('2024-08-11'),
          },
        },
        interest: {
          title: t({
            en: 'Interest of Intlayer',
            fr: "Intérêt d'Intlayer",
            es: 'Interés de Intlayer',
          }),
          default: {
            docName: 'interest_of_intlayer',
            url: PagesRoutes.Doc_Interest,
            githubUrl: GithubRoutes.InterestOfIntlayer,
            title: t({
              en: 'Interest of Intlayer',
              fr: "Intérêt d'Intlayer",
              es: 'Interés de Intlayer',
            }),
            description: t({
              en: 'Discover the interest of Intlayer in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
              fr: "Découvrez l'intérêt d'Intlayer dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.",
              es: 'Descubra el interés de Intlayer en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
            }),
            keywords: t({
              en: [
                'Interest of Intlayer',
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              fr: [
                "Intérêt d'Intlayer",
                'Internationalisation',
                'Documentación',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              es: [
                'Interés de Intlayer',
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
            }),
            createdAt: new Date('2024-08-11'),
            updatedAt: new Date('2024-08-11'),
          },
        },
        cli: {
          title: t({
            en: 'Intayer CLI',
            fr: 'Intlayer CLI',
            es: 'Intlayer CLI',
          }),
          default: {
            docName: 'intlayer_cli',
            url: PagesRoutes.Doc_CLI,
            githubUrl: GithubRoutes.IntlayerCLI,
            title: t({
              en: 'CLI',
              fr: 'CLI',
              es: 'CLI',
            }),
            description: t({
              en: 'Discover how to use the Intlayer CLI to manage your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
              fr: 'Découvrez comment utiliser la CLI Intlayer pour gérer votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
              es: 'Descubra cómo usar la CLI Intlayer para gestionar su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
            }),
            keywords: t({
              en: [
                'CLI',
                'Command Line Interface',
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              fr: [
                'CLI',
                'Interface en Ligne de Commande',
                'Internationalisation',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              es: [
                'CLI',
                'Interfaz de Línea de Comandos',
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
            }),
            createdAt: new Date('2024-08-11'),
            updatedAt: new Date('2024-08-11'),
          },
        },
        editor: {
          title: t({
            en: 'Intlayer Editor',
            fr: 'Intlayer Editor',
            es: 'Intlayer Editor',
          }),
          default: {
            docName: 'intlayer_editor',
            url: PagesRoutes.Doc_IntlayerEditor,
            githubUrl: GithubRoutes.IntlayerEditor,
            title: t({
              en: 'Editor',
              fr: 'Éditeur',
              es: 'Editor',
            }),
            description: t({
              en: 'Discover how to use the Intlayer Editor to manage your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
              fr: "Découvrez comment utiliser l'Éditeur Intlayer pour gérer votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.",
              es: 'Descubra cómo usar el Editor Intlayer para gestionar su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
            }),
            keywords: t({
              en: [
                'Editor',
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              fr: [
                'Éditeur',
                'Internationalisation',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              es: [
                'Editor',
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
            }),
            createdAt: new Date('2024-08-11'),
            updatedAt: new Date('2024-08-11'),
          },
        },
        content: {
          title: t({
            en: 'Content Declaration',
            fr: 'Déclaration de Contenu',
            es: 'Declaración de Contenido',
          }),
          default: {
            docName: 'content_declaration__get_started',
            url: PagesRoutes.Doc_ContentDeclaration,
            githubUrl: GithubRoutes.ContentDeclaration_GetStarted,
            title: t({
              en: 'Declare Your Content',
              fr: 'Déclarer Votre Contenu',
              es: 'Declarar Su Contenido',
            }),
            description: t({
              en: 'Discover how to declare and use content declaration in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
              fr: 'Découvrez comment déclarer et utiliser la déclaration de contenu dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
              es: 'Descubra cómo declarar y usar la declaración de contenido en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
            }),
            keywords: t({
              en: [
                'Get Started',
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              fr: [
                'Commencer',
                'Internationalisation',
                'Documentación',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              es: [
                'Empezar',
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
            }),
            createdAt: new Date('2024-08-11'),
            updatedAt: new Date('2024-08-11'),
          },

          subSections: {
            translation: {
              title: t({
                en: 'Translation',
                fr: 'Traduction',
                es: 'Traducción',
              }),
              default: {
                docName: 'content_declaration__translation',
                url: PagesRoutes.Doc_ContentDeclaration_Translation,
                githubUrl: GithubRoutes.ContentDeclaration_Translation,
                title: t({
                  en: 'Translation',
                  fr: 'Traduction',
                  es: 'Traducción',
                }),
                description: t({
                  en: 'Discover how to declare and use translation in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
                  fr: 'Découvrez comment déclarer et utiliser la traduction dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
                  es: 'Descubra cómo declarar y usar la traducción en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
                }),
                keywords: t({
                  en: [
                    'Translation',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'Traduction',
                    'Internationalisation',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'Traducción',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
            },
            enumeration: {
              title: t({
                en: 'Enumeration',
                fr: 'Énumération',
                es: 'Enumeración',
              }),
              default: {
                docName: 'content_declaration__enumeration',
                url: PagesRoutes.Doc_ContentDeclaration_Enumeration,
                githubUrl: GithubRoutes.ContentDeclaration_Enumeration,
                title: t({
                  en: 'Enumeration',
                  fr: 'Énumération',
                  es: 'Enumeración',
                }),
                description: t({
                  en: 'Discover how to declare and use enumerations in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
                  fr: 'Découvrez comment déclarer et utiliser des énumérations dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
                  es: 'Descubra cómo declarar y usar enumeraciones en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
                }),
                keywords: t({
                  en: [
                    'Enumeration',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'Énumération',
                    'Internationalisation',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'Enumeración',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
            },
            'function-fetching': {
              title: t({
                en: 'Function Fetching',
                fr: 'Fonction Fetching',
                es: 'Función Fetching',
              }),
              default: {
                docName: 'content_declaration__function_fetching',
                url: PagesRoutes.Doc_ContentDeclaration_FunctionFetching,
                githubUrl: GithubRoutes.ContentDeclaration_FunctionFetching,
                title: t({
                  en: 'Function Fetching',
                  fr: 'Récupération de Fonction',
                  es: 'Recuperación de Función',
                }),
                description: t({
                  en: 'Discover how to declare and use function fetching in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
                  fr: 'Découvrez comment déclarer et utiliser la récupération de fonction dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
                  es: 'Descubra cómo declarar y usar la recuperación de función en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
                }),
                keywords: t({
                  en: [
                    'Function Fetching',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'Récupération de Fonction',
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'Recuperación de Función',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
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
          default: {
            docName: 'intlayer_with_nextjs_15',
            url: PagesRoutes.Doc_Environment_NextJS_15,
            githubUrl: GithubRoutes.IntlayerWithNextJS15,
            title: t({
              en: 'Intlayer with Next.js 15',
              fr: 'Intlayer avec Next.js 15',
              es: 'Intlayer con Next.js 15',
            }),
            description: t({
              en: 'Discover how to set up Intlayer with Next.js 15 to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
              fr: 'Découvrez comment configurer Intlayer avec Next.js 15 pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
              es: 'Descubra cómo configurar Intlayer con Next.js 15 para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
            }),
            keywords: t({
              en: [
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Next.js 15',
                'JavaScript',
                'React',
              ],
              fr: [
                'Internationalisation',
                'Documentation',
                'Intlayer',
                'Next.js 15',
                'JavaScript',
                'React',
              ],
              es: [
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Next.js 15',
                'JavaScript',
                'React',
              ],
            }),
            createdAt: new Date('2024-12-06'),
            updatedAt: new Date('2024-12-07'),
          },
          subSections: {
            14: {
              title: t({
                en: 'Intlayer with Next.js 14 and App Router',
                fr: 'Intlayer avec Next.js 14 et App Router',
                es: 'Intlayer con Next.js 14 y App Router',
              }),
              default: {
                docName: 'intlayer_with_nextjs_14',
                url: PagesRoutes.Doc_Environment_NextJS_14,
                githubUrl: GithubRoutes.IntlayerWithNextJS14,
                title: t({
                  en: 'Intlayer with Next.js 14 and App Router',
                  fr: 'Intlayer avec Next.js 14 et App Router',
                  es: 'Intlayer con Next.js 14 y App Router',
                }),
                description: t({
                  en: 'Discover how to set up Intlayer with Next.js 14 to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
                  fr: 'Découvrez comment configurer Intlayer avec Next.js 14 pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
                  es: 'Descubra cómo configurar Intlayer con Next.js 14 para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
                }),
                keywords: t({
                  en: [
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js 14',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js 14',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'Next.js 14',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-12-06'),
                updatedAt: new Date('2024-12-07'),
              },
            },
            'next-with-Page-Router': {
              title: t({
                en: 'Intlayer with Next.js using Page Router',
                fr: 'Intlayer avec Next.js en utilisant le Page Router',
                es: 'Intlayer con Next.js usando el Page Router',
              }),
              default: {
                docName: 'intlayer_with_nextjs_page_router',
                url: PagesRoutes.Doc_Intlayer_with_NextJS_using_Page_Router,
                githubUrl: GithubRoutes.IntlayerWithNextJSUsingPageRouter,
                title: t({
                  en: 'Intlayer with Next.js using Page Router',
                  fr: 'Intlayer avec Next.js en utilisant le Page Router',
                  es: 'Intlayer con Next.js usando el Page Router',
                }),
                description: t({
                  en: 'Discover how to set up Intlayer with Next.js using Page Router to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
                  fr: 'Découvrez comment configurer Intlayer avec Next.js en utilisant le Page Router pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
                  es: 'Descubra cómo configurar Intlayer con Next.js usando el Page Router para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
                }),
                keywords: t({
                  en: [
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'page router',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'page router',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'page router',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-12-07'),
                updatedAt: new Date('2024-12-07'),
              },
            },
          },
        },
        'create-react-app': {
          title: t({
            en: 'Intlayer with React CRA',
            fr: 'Intlayer avec React CRA',
            es: 'Intlayer con React CRA',
          }),
          default: {
            docName: 'intlayer_with_create_react_app',
            url: PagesRoutes.Doc_Environment_CRA,
            githubUrl: GithubRoutes.IntlayerWithReactCRA,
            title: t({
              en: 'Intlayer with React CRA',
              fr: 'Intlayer avec React CRA',
              es: 'Intlayer con React CRA',
            }),
            description: t({
              en: 'Discover how to set up Intlayer with Create React App to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
              fr: 'Découvrez comment configurer Intlayer avec Create React App pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
              es: 'Descubra cómo configurar Intlayer con Create React App para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
            }),
            keywords: t({
              en: [
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Create React App',
                'CRA',
                'JavaScript',
                'React',
              ],
              fr: [
                'Internationalisation',
                'Documentation',
                'Intlayer',
                'Create React App',
                'CRA',
                'JavaScript',
                'React',
              ],
              es: [
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Create React App',
                'CRA',
                'JavaScript',
                'React',
              ],
            }),
            createdAt: new Date('2024-08-11'),
            updatedAt: new Date('2024-08-11'),
          },
        },
        'vite-and-react': {
          title: t({
            en: 'Intlayer with Vite and React',
            fr: 'Intlayer avec Vite and React',
            es: 'Intlayer con Vite and React',
          }),
          default: {
            docName: 'intlayer_with_vite_react',
            url: PagesRoutes.Doc_Environment_ViteAndReact,
            githubUrl: GithubRoutes.IntlayerWithViteReact,
            title: t({
              en: 'Intlayer with Vite and React',
              fr: 'Intlayer avec Vite and React',
              es: 'Intlayer con Vite and React',
            }),
            description: t({
              en: 'Discover how to set up Intlayer with Vite and React to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
              fr: 'Découvrez comment configurer Intlayer avec Vite and React pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
              es: 'Descubra cómo configurar Intlayer con Vite and React para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
            }),
            keywords: t({
              en: [
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Vite',
                'React',
                'JavaScript',
              ],
              fr: [
                'Internationalisation',
                'Documentation',
                'Intlayer',
                'Vite',
                'React',
                'JavaScript',
              ],
              es: [
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Vite',
                'React',
                'JavaScript',
              ],
            }),
            createdAt: new Date('2024-08-11'),
            updatedAt: new Date('2024-08-11'),
          },
        },
        express: {
          title: t({
            en: 'Intlayer with Express',
            fr: 'Intlayer avec Express',
            es: 'Intlayer con Express',
          }),
          default: {
            docName: 'intlayer_with_express',
            url: PagesRoutes.Doc_Environment_Express,
            githubUrl: GithubRoutes.IntlayerWithExpress,
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
            createdAt: new Date('2024-08-11'),
            updatedAt: new Date('2024-08-11'),
          },
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
              default: {
                docName: 't_express-intlayer',
                url: PagesRoutes['Doc_Packages_express-intlayer_t'],
                githubUrl: GithubRoutes['Packages_express-intlayer_t'],
                title: t({
                  en: 't Function Documentation | express-intlayer',
                  fr: 'Documentation de la fonction t | express-intlayer',
                  es: 'Documentación de la función t | express-intlayer',
                }),
                description: t({
                  en: 'See how to use the t function for next-intlayer package',
                  fr: 'Découvrez comment utiliser la fonction t pour le package next-intlayer',
                  es: 'Descubre cómo usar la función t para el paquete next-intlayer',
                }),
                keywords: t({
                  en: [
                    't',
                    'translation',
                    'Intlayer',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Express',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    't',
                    'translation',
                    'Intlayer',
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Express',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'useIntlayer',
                    'diccionario',
                    'clave',
                    'Intlayer',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Express',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-12-02'),
                updatedAt: new Date('2024-12-02'),
              },
            },
          },
        },
        'react-intlayer': {
          title: 'react-intlayer',
          subSections: {
            t: {
              title: 't',
              default: {
                docName: 't_react-intlayer',
                url: PagesRoutes['Doc_Packages_react-intlayer_t'],
                githubUrl: GithubRoutes['Packages_react-intlayer_t'],
                title: t({
                  en: 't Function Documentation',
                  fr: 'Documentation de la fonction t',
                  es: 'Documentación de la función t',
                }),

                description: t({
                  en: 'See how to use the t function for next-intlayer package',
                  fr: 'Découvrez comment utiliser la fonction t pour le package next-intlayer',
                  es: 'Descubre cómo usar la función t para el paquete next-intlayer',
                }),
                keywords: t({
                  en: [
                    't',
                    'translation',
                    'Intlayer',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    't',
                    'traduction',
                    'Intlayer',
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    't',
                    'traducción',
                    'Intlayer',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
            },
            useIntlayer: {
              title: 'useIntlayer',
              default: {
                docName: 'useIntlayer_react-intlayer',
                url: PagesRoutes['Doc_Packages_react-intlayer_useIntlayer'],
                githubUrl: GithubRoutes['Packages_react-intlayer_useIntlayer'],
                title: t({
                  en: 'useIntlayer Hook Documentation | react-intlayer',
                  fr: 'Documentation du hook useIntlayer | react-intlayer',
                  es: 'Documentación del hook useIntlayer | react-intlayer',
                }),
                description: t({
                  en: 'See how to use the useIntlayer hook for next-intlayer package',
                  fr: 'Découvrez comment utiliser le hook useIntlayer pour le package next-intlayer',
                  es: 'Descubre cómo usar el hook useIntlayer para el paquete next-intlayer',
                }),
                keywords: t({
                  en: [
                    'useIntlayer',
                    'dictionary',
                    'key',
                    'Intlayer',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'useIntlayer',
                    'dictionnaire',
                    'clé',
                    'Intlayer',
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'useIntlayer',
                    'diccionario',
                    'clave',
                    'Intlayer',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
            },
            useDictionary: {
              title: 'useDictionary',
              default: {
                docName: 'useDictionary_react-intlayer',
                url: PagesRoutes['Doc_Packages_react-intlayer_useDictionary'],
                githubUrl:
                  GithubRoutes['Packages_react-intlayer_useDictionary'],
                title: t({
                  en: 'useDictionary Hook Documentation | react-intlayer',
                  fr: 'Documentation du hook useDictionary | react-intlayer',
                  es: 'Documentación del hook useDictionary | react-intlayer',
                }),
                description: t({
                  en: 'See how to use the useDictionary hook for next-intlayer package',
                  fr: 'Découvrez comment utiliser le hook useDictionary pour le package next-intlayer',
                  es: 'Descubre cómo usar el hook useDictionary para el paquete next-intlayer',
                }),
                keywords: t({
                  en: [
                    'useDictionary',
                    'dictionary',
                    'key',
                    'Intlayer',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'useDictionary',
                    'dictionnaire',
                    'clé',
                    'Intlayer',
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'useDictionary',
                    'diccionario',
                    'clave',
                    'Intlayer',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
            },
            useLocale: {
              title: 'useLocale',
              default: {
                docName: 'useLocale_react-intlayer',
                url: PagesRoutes['Doc_Packages_react-intlayer_useLocale'],
                githubUrl: GithubRoutes['Packages_react-intlayer_useLocale'],
                title: t({
                  en: 'useLocale Hook Documentation | react-intlayer',
                  fr: 'Documentation du hook useLocale | react-intlayer',
                  es: 'Documentación del hook useLocale | react-intlayer',
                }),
                description: t({
                  en: 'See how to use the useLocale hook for next-intlayer package',
                  fr: 'Découvrez comment utiliser le hook useLocale pour le package next-intlayer',
                  es: 'Descubre cómo usar el hook useLocale para el paquete next-intlayer',
                }),
                keywords: t({
                  en: [
                    'useLocale',
                    'dictionary',
                    'key',
                    'Intlayer',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'useLocale',
                    'dictionnaire',
                    'clé',
                    'Intlayer',
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'useLocale',
                    'diccionario',
                    'clave',
                    'Intlayer',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
            },
          },
        },
        'next-intlayer': {
          title: 'next-intlayer',
          subSections: {
            t: {
              title: 't',
              default: {
                docName: 't_next-intlayer',
                url: PagesRoutes['Doc_Packages_next-intlayer_t'],
                githubUrl: GithubRoutes['Packages_next-intlayer_t'],
                title: t({
                  en: 't Function Documentation | next-intlayer',
                  fr: 'Documentation de la fonction t | next-intlayer',
                  es: 'Documentación de la función t | next-intlayer',
                }),

                description: t({
                  en: 'See how to use the t function for next-intlayer package',
                  fr: 'Découvrez comment utiliser la fonction t pour le package next-intlayer',
                  es: 'Descubre cómo usar la función t para el paquete next-intlayer',
                }),
                keywords: t({
                  en: [
                    't',
                    'translation',
                    'Intlayer',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    't',
                    'traduction',
                    'Intlayer',
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    't',
                    'traducción',
                    'Intlayer',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
            },
            useIntlayer: {
              title: 'useIntlayer',
              default: {
                docName: 'useIntlayer_next-intlayer',
                url: PagesRoutes['Doc_Packages_next-intlayer_useIntlayer'],
                githubUrl: GithubRoutes['Packages_next-intlayer_useIntlayer'],
                title: t({
                  en: 'useIntlayer Hook Documentation | next-intlayer',
                  fr: 'Documentation du hook useIntlayer | next-intlayer',
                  es: 'Documentación del hook useIntlayer | next-intlayer',
                }),
                description: t({
                  en: 'See how to use the useIntlayer hook for next-intlayer package',
                  fr: 'Découvrez comment utiliser le hook useIntlayer pour le package next-intlayer',
                  es: 'Descubre cómo usar el hook useIntlayer para el paquete next-intlayer',
                }),
                keywords: t({
                  en: [
                    'useIntlayer',
                    'dictionary',
                    'key',
                    'Intlayer',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'useIntlayer',
                    'dictionnaire',
                    'clé',
                    'Intlayer',
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'useIntlayer',
                    'diccionario',
                    'clave',
                    'Intlayer',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
            },
            useDictionary: {
              title: 'useDictionary',
              default: {
                docName: 'useDictionary_next-intlayer',
                url: PagesRoutes['Doc_Packages_next-intlayer_useDictionary'],
                githubUrl: GithubRoutes['Packages_next-intlayer_useDictionary'],
                title: t({
                  en: 'useDictionary Hook Documentation | next-intlayer',
                  fr: 'Documentation du hook useDictionary | next-intlayer',
                  es: 'Documentación del hook useDictionary | next-intlayer',
                }),
                description: t({
                  en: 'See how to use the useDictionary hook for next-intlayer package',
                  fr: 'Découvrez comment utiliser le hook useDictionary pour le package next-intlayer',
                  es: 'Descubre cómo usar el hook useDictionary para el paquete next-intlayer',
                }),
                keywords: t({
                  en: [
                    'useDictionary',
                    'dictionary',
                    'key',
                    'Intlayer',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'useDictionary',
                    'dictionnaire',
                    'clé',
                    'Intlayer',
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'useDictionary',
                    'diccionario',
                    'clave',
                    'Intlayer',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
            },
            useLocale: {
              title: 'useLocale',
              default: {
                docName: 'useLocale_next-intlayer',
                url: PagesRoutes['Doc_Packages_next-intlayer_useLocale'],
                githubUrl: GithubRoutes['Packages_next-intlayer_useLocale'],
                title: t({
                  en: 'useLocale Hook Documentation | next-intlayer',
                  fr: 'Documentation du hook useLocale | next-intlayer',
                  es: 'Documentación del hook useLocale | next-intlayer',
                }),
                description: t({
                  en: 'See how to use the useLocale hook for next-intlayer package',
                  fr: 'Découvrez comment utiliser le hook useLocale pour le package next-intlayer',
                  es: 'Descubre cómo usar el hook useLocale para el paquete next-intlayer',
                }),
                keywords: t({
                  en: [
                    'useLocale',
                    'dictionary',
                    'key',
                    'Intlayer',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'useLocale',
                    'dictionnaire',
                    'clé',
                    'Intlayer',
                    'Internationalisation',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'useLocale',
                    'diccionario',
                    'clave',
                    'Intlayer',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
                createdAt: new Date('2024-08-11'),
                updatedAt: new Date('2024-08-11'),
              },
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
          default: {
            docName: 'intlayer_with_i18next',
            url: PagesRoutes.Doc_Intlayer_with_I18next,
            githubUrl: GithubRoutes.IntlayerWithI18next,
            title: t({
              en: 'Intlayer with i18next',
              fr: 'Intlayer avec i18next',
              es: 'Intlayer con i18next',
            }),
            description: t({
              en: 'Compare Intlayer with i18next',
              fr: 'Comparer Intlayer avec i18next',
              es: 'Comparar Intlayer con i18next',
            }),
            keywords: t({
              en: [
                'i18next',
                'next-intl',
                'Intlayer',
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              es: [
                'i18next',
                'next-intl',
                'Intlayer',
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              fr: [
                'i18next',
                'next-intl',
                'Intlayer',
                'Internationalisation',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
            }),
            createdAt: new Date('2024-08-11'),
            updatedAt: new Date('2024-08-11'),
          },
        },
      },
    },
  };

  return result;
};

export const getDoc = (
  docPath: string[] = [],
  locale: Locales = Locales.ENGLISH
): DocData | undefined => {
  let currentSection = getDocData(locale);

  if (docPath.length === 0) {
    return currentSection['get-started'].default;
  }

  // Traverse the nested structure based on the docPath array
  for (const path of docPath) {
    if (currentSection?.[path] && path === docPath[docPath.length - 1]) {
      return currentSection[path].default;
    } else if (typeof currentSection?.[path]?.subSections !== 'undefined') {
      currentSection = currentSection[path].subSections!;
    } else {
      return undefined; // Path is invalid if any segment does not exist
    }
  }
};

const getDocSectionPaths = (docData: Section, presetKeys: string[] = []) => {
  const paths: string[][] = [];
  const docs: DocData[] = [];

  for (const key of Object.keys(docData)) {
    const docDataValue = docData[key];

    if (typeof docDataValue.default !== 'undefined') {
      docs.push(docDataValue.default);
      paths.push([...presetKeys, key]);
    } else if (typeof docDataValue.subSections !== 'undefined') {
      const { paths: subSectionsPaths, docs: subSectionsDocs } =
        getDocSectionPaths(docDataValue.subSections, [...presetKeys, key]);

      docs.push(...subSectionsDocs);
      paths.push(...subSectionsPaths);
    }
  }

  return { paths, docs };
};

export const getDocPaths = (locale?: Locales): string[][] => {
  const docData = getDocData(locale);
  return getDocSectionPaths(docData).paths;
};

export const getDocArray = (locale?: Locales): DocData[] => {
  const docData = getDocData(locale);
  return getDocSectionPaths(docData).docs;
};

const getDocLocale = (url: string, locale: Locales): string =>
  url.replace('en.md', `${locale}.md`);

const docUrlRenamer: Record<GithubRoutes, PagesRoutes> = {
  [GithubRoutes.Introduction]: PagesRoutes.Doc_GetStarted,
  [GithubRoutes.HowWorksIntlayer]: PagesRoutes.Doc_HowWorksIntlayer,
  [GithubRoutes.Configuration]: PagesRoutes.Doc_Configuration,
  [GithubRoutes.InterestOfIntlayer]: PagesRoutes.Doc_Interest,
  [GithubRoutes.IntlayerCLI]: PagesRoutes.Doc_CLI,
  [GithubRoutes.IntlayerEditor]: PagesRoutes.Doc_IntlayerEditor,
  [GithubRoutes.IntlayerWithNextJS15]: PagesRoutes.Doc_Environment_NextJS_15,
  [GithubRoutes.IntlayerWithNextJS14]: PagesRoutes.Doc_Environment_NextJS_14,
  [GithubRoutes.IntlayerWithNextJSUsingPageRouter]:
    PagesRoutes.Doc_Intlayer_with_NextJS_using_Page_Router,
  [GithubRoutes.IntlayerWithReactCRA]: PagesRoutes.Doc_Environment_CRA,
  [GithubRoutes.IntlayerWithViteReact]:
    PagesRoutes.Doc_Environment_ViteAndReact,
  [GithubRoutes.IntlayerWithExpress]: PagesRoutes.Doc_Environment_Express,

  [GithubRoutes.ContentDeclaration_GetStarted]:
    PagesRoutes.Doc_ContentDeclaration,
  [GithubRoutes.ContentDeclaration_ContentExtensionCustomization]:
    PagesRoutes.Doc_ContentDeclaration,
  [GithubRoutes.ContentDeclaration_Enumeration]:
    PagesRoutes.Doc_ContentDeclaration_Enumeration,
  [GithubRoutes.ContentDeclaration_FunctionFetching]:
    PagesRoutes.Doc_ContentDeclaration_FunctionFetching,
  [GithubRoutes.ContentDeclaration_Translation]:
    PagesRoutes.Doc_ContentDeclaration_Translation,

  [GithubRoutes.IntlayerWithI18next]: PagesRoutes.Doc_Intlayer_with_I18next,

  [GithubRoutes['Packages_express-intlayer_t']]:
    PagesRoutes['Doc_Packages_express-intlayer_t'],
  [GithubRoutes['Packages_react-intlayer_t']]:
    PagesRoutes['Doc_Packages_react-intlayer_t'],
  [GithubRoutes['Packages_react-intlayer_useIntlayer']]:
    PagesRoutes['Doc_Packages_react-intlayer_useIntlayer'],
  [GithubRoutes['Packages_react-intlayer_useDictionary']]:
    PagesRoutes['Doc_Packages_react-intlayer_useDictionary'],
  [GithubRoutes['Packages_react-intlayer_useLocale']]:
    PagesRoutes['Doc_Packages_react-intlayer_useLocale'],
  [GithubRoutes['Packages_next-intlayer_t']]:
    PagesRoutes['Doc_Packages_next-intlayer_t'],
  [GithubRoutes['Packages_next-intlayer_useIntlayer']]:
    PagesRoutes['Doc_Packages_next-intlayer_useIntlayer'],
  [GithubRoutes['Packages_next-intlayer_useDictionary']]:
    PagesRoutes['Doc_Packages_next-intlayer_useDictionary'],
  [GithubRoutes['Packages_next-intlayer_useLocale']]:
    PagesRoutes['Doc_Packages_next-intlayer_useLocale'],

  [GithubRoutes.PrivacyPolicy]: PagesRoutes.PrivacyPolicy,
  [GithubRoutes.TermsOfService]: PagesRoutes.TermsOfService,
};

const docUrlRenamerMultiLocale: Record<string, string> = locales.reduce(
  (acc, locale) =>
    Object.entries(docUrlRenamer).reduce((acc, [githubRoute, pagesRoute]) => {
      const githubUrl = getDocLocale(githubRoute, locale);

      if (locale === Locales.ENGLISH) {
        acc[githubUrl] = pagesRoute;
      } else {
        acc[githubUrl] = `/${locale}${pagesRoute}`;
      }
      return acc;
    }, acc),
  {} as Record<string, string>
);

/**
 * Escapes special characters in a string for use in a regular expression.
 *
 * @param string - The string to escape.
 * @returns The escaped string.
 */
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

/**
 * Replaces GitHub URLs in the content with corresponding PagesRoutes.
 *
 * @param content - The input string content containing GitHub URLs.
 * @returns The updated content with URLs replaced.
 */
export const urlRenamer = (content: string): string => {
  let updatedContent = content;

  // Sort the entries by URL length in descending order to prevent partial replacements
  const sortedEntries = Object.entries(docUrlRenamerMultiLocale);

  sortedEntries.forEach(([githubUrl, pagesRoute]) => {
    const regex = new RegExp(escapeRegExp(githubUrl), 'g');
    updatedContent = updatedContent.replace(regex, pagesRoute);
  });

  return updatedContent;
};
