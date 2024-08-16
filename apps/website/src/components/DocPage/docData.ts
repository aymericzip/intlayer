/* eslint-disable sonarjs/no-duplicate-string */

import type { DocsKeys } from '@intlayer/docs';
import { type IConfigLocales, getTranslationContent, Locales } from 'intlayer';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export type DocData = {
  docName: DocsKeys;
  url: PagesRoutes;
  githubUrl: GithubRoutes;
  title: string;
  description: string;
  keywords: string[];
};

export type Section = Record<string, CategorizedDocData>;

export type CategorizedDocData = {
  title: string;
  default?: DocData;
  subSections?: Section;
};

export const getDocData = (locale = Locales.ENGLISH): Section => {
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
            'Application',
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
              },
            },
            'nested-id': {
              title: t({
                en: 'Nested ID',
                fr: 'ID imbriqué',
                es: 'ID anidado',
              }),
              default: {
                docName: 'content_declaration__nested_id',
                url: PagesRoutes.Doc_ContentDeclaration_NestedId,
                githubUrl: GithubRoutes.ContentDeclaration_NestedId,
                title: t({
                  en: 'Nested ID',
                  fr: 'ID imbriqué',
                  es: 'ID anidado',
                }),
                description: t({
                  en: 'Discover how to declare and use nested IDs in your multilingual website. Follow the steps in this online documentation to set up your project in a few minutes.',
                  fr: 'Découvrez comment déclarer et utiliser des ID imbriqués dans votre site web multilingue. Suivez les étapes de cette documentation en ligne pour configurer votre projet en quelques minutes.',
                  es: 'Descubra cómo declarar y usar IDs anidados en su sitio web multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
                }),
                keywords: t({
                  en: [
                    'Nested ID',
                    'Internationalization',
                    'Documentation',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  fr: [
                    'ID imbriqué',
                    'Internationalisation',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                  es: [
                    'ID anidado',
                    'Internacionalización',
                    'Documentación',
                    'Intlayer',
                    'Next.js',
                    'JavaScript',
                    'React',
                  ],
                }),
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
            docName: 'intlayer_with_nextjs',
            url: PagesRoutes.Doc_Environment_NextJS,
            githubUrl: GithubRoutes.IntlayerWithNextJS,
            title: t({
              en: 'Intlayer with Next.js',
              fr: 'Intlayer avec Next.js',
              es: 'Intlayer con Next.js',
            }),
            description: t({
              en: 'Discover how to set up Intlayer with Next.js to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
              fr: 'Découvrez comment configurer Intlayer avec Next.js pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
              es: 'Descubra cómo configurar Intlayer con Next.js para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
            }),
            keywords: t({
              en: [
                'Internationalization',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              fr: [
                'Internationalisation',
                'Documentation',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
              es: [
                'Internacionalización',
                'Documentación',
                'Intlayer',
                'Next.js',
                'JavaScript',
                'React',
              ],
            }),
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
          },
        },
        'vite-and-react': {
          title: t({
            en: 'Intlayer with Vite+React',
            fr: 'Intlayer avec Vite+React',
            es: 'Intlayer con Vite+React',
          }),
          default: {
            docName: 'intlayer_with_vite_react',
            url: PagesRoutes.Doc_Environment_ViteAndReact,
            githubUrl: GithubRoutes.IntlayerWithViteReact,
            title: t({
              en: 'Intlayer with Vite+React',
              fr: 'Intlayer avec Vite+React',
              es: 'Intlayer con Vite+React',
            }),
            description: t({
              en: 'Discover how to set up Intlayer with Vite+React to make your website multilingual. Follow the steps in this online documentation to set up your project in a few minutes.',
              fr: 'Découvrez comment configurer Intlayer avec Vite+React pour rendre votre site web multilingue. Suivez les étapes de cette documentation en ligne pour mettre en place votre projet en quelques minutes.',
              es: 'Descubra cómo configurar Intlayer con Vite+React para hacer que su sitio web sea multilingüe. Siga los pasos de esta documentación en línea para configurar su proyecto en unos minutos.',
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

export const getDocPaths = (locale?: Locales) => {
  const docData = getDocData(locale);
  return getDocSectionPaths(docData).paths;
};
export const getDocArray = (locale?: Locales) => {
  const docData = getDocData(locale);
  return getDocSectionPaths(docData).docs;
};
