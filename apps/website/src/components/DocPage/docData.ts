import { Locales, LocalesValues, getIntlayer } from 'intlayer';
import type { CategorizedDocData, DocData, Section } from './types';

export const getDocData = (
  locale: LocalesValues = Locales.ENGLISH
): Section => {
  const content = getIntlayer('doc-data', locale);

  return {
    'get-started': {
      title: content['get-started'].title,
      default: getIntlayer('doc-introduction-metadata', locale),
    },
    roadmap: {
      title: content.roadmap.title,
      default: getIntlayer('doc-roadmap-metadata', locale),
    },
    concept: {
      title: content.concept.title,
      subSections: {
        interest: {
          title: content.concept.subSections.interest.title,
          default: getIntlayer('doc-interest-of-intlayer-metadata', locale),
        },
        'how-works-intlayer': {
          title: content.concept.subSections['how-works-intlayer'].title,
          default: getIntlayer('doc-how-works-intlayer-metadata', locale),
        },
        configuration: {
          title: content.concept.subSections.configuration.title,
          default: getIntlayer('doc-configuration-metadata', locale),
        },

        content: {
          title: content.concept.subSections.content.title,
          default: getIntlayer('doc-dictionary-metadata', locale),

          subSections: {
            translation: {
              title:
                content.concept.subSections.content.subsections.translation
                  .title,
              default: getIntlayer(
                'doc-dictionary-translation-metadata',
                locale
              ),
            },
            enumeration: {
              title:
                content.concept.subSections.content.subsections.enumeration
                  .title,
              default: getIntlayer(
                'doc-dictionary-enumeration-metadata',
                locale
              ),
            },
            condition: {
              title:
                content.concept.subSections.content.subsections.condition.title,
              default: getIntlayer('doc-dictionary-condition-metadata', locale),
            },
            insertion: {
              title:
                content.concept.subSections.content.subsections.insertion.title,
              default: getIntlayer('doc-dictionary-insertion-metadata', locale),
            },
            file: {
              title: content.concept.subSections.content.subsections.file.title,
              default: getIntlayer('doc-dictionary-file-metadata', locale),
            },
            nesting: {
              title:
                content.concept.subSections.content.subsections.nesting.title,
              default: getIntlayer('doc-dictionary-nesting-metadata', locale),
            },
            markdown: {
              title:
                content.concept.subSections.content.subsections.markdown.title,
              default: getIntlayer('doc-dictionary-markdown-metadata', locale),
            },
            'function-fetching': {
              title:
                content.concept.subSections.content.subsections[
                  'function-fetching'
                ].title,
              default: getIntlayer(
                'doc-dictionary-function-fetching-metadata',
                locale
              ),
            },
          },
        },
        'per-locale-file': {
          title: content.concept.subSections['per-locale-file'].title,
          default: getIntlayer(
            'doc-dictionary-per-locale-file-metadata',
            locale
          ),
        },
        cli: {
          title: content.concept.subSections.cli.title,
          default: getIntlayer('doc-cli-metadata', locale),
        },
        'auto-fill': {
          title: content.concept.subSections['auto-fill'].title,
          default: getIntlayer('doc-dictionary-auto-fill-metadata', locale),
        },
        'ci-cd': {
          title: content.concept.subSections['ci-cd'].title,
          default: getIntlayer('doc-ci-cd-metadata', locale),
        },
        editor: {
          title: content.concept.subSections.editor.title,
          default: getIntlayer('doc-visual-editor-metadata', locale),
        },
        cms: {
          title: content.concept.subSections.cms.title,
          default: getIntlayer('doc-cms-metadata', locale),
        },
      },
    },
    environment: {
      title: content.environment.title,
      subSections: {
        nextjs: {
          title: content.environment.subSections.nextjs.title,
          default: getIntlayer('doc-intlayer-with-nextjs-15-metadata', locale),
          subSections: {
            14: {
              title:
                content.environment.subSections.nextjs.subSections[14].title,
              default: getIntlayer(
                'doc-intlayer-with-nextjs-14-metadata',
                locale
              ),
            },
            'next-with-Page-Router': {
              title:
                content.environment.subSections.nextjs.subSections[
                  'next-with-Page-Router'
                ].title,
              default: getIntlayer(
                'doc-intlayer-with-nextjs-page-router-metadata',
                locale
              ),
            },
          },
        },
        'create-react-app': {
          title: content.environment.subSections['create-react-app'].title,
          default: getIntlayer(
            'doc-intlayer-with-create-react-app-metadata',
            locale
          ),
        },
        'vite-and-react': {
          title: content.environment.subSections['vite-and-react'].title,
          default: getIntlayer('doc-intlayer-with-vite-react-metadata', locale),
        },
        'vite-and-vue': {
          title: content.environment.subSections['vite-and-vue'].title,
          default: getIntlayer('doc-intlayer-with-vite-vue-metadata', locale),
        },
        'nuxt-and-vue': {
          title: content.environment.subSections['nuxt-and-vue'].title,
          default: getIntlayer('doc-intlayer-with-nuxt-vue-metadata', locale),
        },
        'vite-and-solid': {
          title: content.environment.subSections['vite-and-solid'].title,
          default: getIntlayer('doc-intlayer-with-vite-solid-metadata', locale),
        },
        'vite-and-svelte': {
          title: content.environment.subSections['vite-and-svelte'].title,
          default: getIntlayer(
            'doc-intlayer-with-vite-svelte-metadata',
            locale
          ),
        },
        'vite-and-preact': {
          title: content.environment.subSections['vite-and-preact'].title,
          default: getIntlayer(
            'doc-intlayer-with-vite-preact-metadata',
            locale
          ),
        },
        angular: {
          title: content.environment.subSections['angular'].title,
          default: getIntlayer('doc-intlayer-with-angular-metadata', locale),
        },
        'react-native-and-expo': {
          title: content.environment.subSections['react-native-and-expo'].title,
          default: getIntlayer(
            'doc-intlayer-with-react-native-expo-metadata',
            locale
          ),
        },
        'lynx-and-react': {
          title: content.environment.subSections['lynx-and-react'].title,
          default: getIntlayer(
            'doc-intlayer-with-lynx-and-react-metadata',
            locale
          ),
        },
        express: {
          title: content.environment.subSections.express.title,
          default: getIntlayer('doc-intlayer-with-express-metadata', locale),
        },
      },
    },

    'vs-code-extension': {
      title: content['vs-code-extension'].title,
      default: getIntlayer('doc-vscode-extension-metadata', locale),
    },
    'mcp-server': {
      title: content.mcp_server.title,
      default: getIntlayer('doc-mcp-server-metadata', locale),
    },
  } satisfies Section;
};

export const getDocDataByPath = (
  docPath: string[] = [],
  locale: Locales = Locales.ENGLISH
): DocData | undefined => {
  let currentSection = getDocData(locale);

  // Traverse the nested structure based on the docPath array
  for (const path of docPath) {
    const sections = currentSection?.[path as keyof typeof currentSection];

    if (sections && path === docPath[docPath.length - 1]) {
      return sections.default;
    } else if (typeof sections?.subSections !== 'undefined') {
      currentSection = sections.subSections;
    } else {
      break; // Exit loop instead of returning undefined
    }
  }

  return currentSection['get-started'].default;
};

export const getDocSubSection = (
  docData: Record<string, CategorizedDocData>,
  sectionKey: string[]
): CategorizedDocData | undefined => {
  let current = docData as unknown as CategorizedDocData; // Use the `docData` object to navigate through sections

  for (const key of sectionKey) {
    if (current[key as keyof typeof current]) {
      current = current[key as keyof typeof current] as CategorizedDocData; // Navigate deeper
    } else if (current.subSections && current.subSections[key]) {
      current = current.subSections[key] as CategorizedDocData; // Navigate deeper
    } else {
      return undefined; // If key is not found, return an empty string
    }
  }

  return current; // Return the title if it exists
};

type DocSectionPaths = {
  paths: string[][];
  docs: DocData[];
  title: string[];
};

export const getDocSection = (
  docData: Section,
  presetKeys: string[] = []
): DocSectionPaths => {
  const paths: string[][] = [];
  const docs: DocData[] = [];
  const title: string[] = [];

  for (const key of Object.keys(docData)) {
    const docDataValue = docData[key];

    if (typeof docDataValue.default !== 'undefined') {
      docs.push(docDataValue.default);
      paths.push([...presetKeys, key]);
      title.push(docDataValue.title);
    }
    if (typeof docDataValue.subSections !== 'undefined') {
      const {
        paths: subSectionsPaths,
        docs: subSectionsDocs,
        title: subTitle,
      } = getDocSection(docDataValue.subSections, [...presetKeys, key]);

      docs.push(...subSectionsDocs);
      paths.push(...subSectionsPaths);
      title.push(...subTitle);
    }
  }

  return { paths, docs, title };
};

export const getDocPathsArray = (
  locale: Locales = Locales.ENGLISH
): string[][] => {
  const docData = getDocData(locale);
  return getDocSection(docData).paths;
};

export const getDocDataArray = (locale?: LocalesValues): DocData[] => {
  const docData = getDocData(locale);
  return getDocSection(docData).docs;
};

export const getPreviousNextDocData = (
  docElement: DocData,
  locale: Locales
) => {
  const docData = getDocData(locale);
  const { docs, paths, title } = getDocSection(docData);

  const docIndex = docs.findIndex((doc) => doc.docName === docElement?.docName);
  const nextDocIndex = docIndex + 1;
  const prevDocIndex = docIndex - 1;

  return {
    prevDocData: {
      docs: docs[prevDocIndex],
      paths: paths[prevDocIndex],
      title: title[prevDocIndex],
    },
    nextDocData: {
      docs: docs[nextDocIndex],
      paths: paths[nextDocIndex],
      title: title[nextDocIndex],
    },
  };
};
