import { Locales, LocalesValues, getIntlayer } from 'intlayer';
import { getCI_CDData } from './docDataContent/concept/ci_cd';
import { getCliData } from './docDataContent/concept/cli';
import { getCMSData } from './docDataContent/concept/cms';
import { getConfigurationData } from './docDataContent/concept/configuration';
import { getContentDeclarationAutoFillData } from './docDataContent/concept/dictionary/autoFill';
import { getContentDeclarationConditionData } from './docDataContent/concept/dictionary/condition';
import { getContentDeclarationEnumerationData } from './docDataContent/concept/dictionary/enumeration';
import { getContentDeclarationFileData } from './docDataContent/concept/dictionary/file';
import { getContentDeclarationFunctionFetchingData } from './docDataContent/concept/dictionary/functionFetching';
import { getContentDeclarationGetStatedData } from './docDataContent/concept/dictionary/getStarted';
import { getContentDeclarationInsertionData } from './docDataContent/concept/dictionary/insertion';
import { getContentDeclarationMarkdownData } from './docDataContent/concept/dictionary/markdown';
import { getContentDeclarationNestingData } from './docDataContent/concept/dictionary/nesting';
import { getContentDeclarationPerLocaleFileData } from './docDataContent/concept/dictionary/per-locale-file';
import { getContentDeclarationTranslationData } from './docDataContent/concept/dictionary/translation';
import { getHowWorksIntlayerData } from './docDataContent/concept/howWorksIntlayer';
import { getInterestOfIntlayerData } from './docDataContent/concept/interestOfIntlayer';
import { getIntroductionData } from './docDataContent/concept/introduction';
import { getRoadmapData } from './docDataContent/concept/roadmap';
import { getVisualEditorData } from './docDataContent/concept/visual_editor';
import { getEnvironmentAngularData } from './docDataContent/environment/angular';
import { getEnvironmentCreateReactAppData } from './docDataContent/environment/createReactApp';
import { getEnvironmentExpressData } from './docDataContent/environment/express';
import { getEnvironmentLynxAndReactData } from './docDataContent/environment/lynxAndReact';
import { getEnvironmentNextJSNextJS15Data } from './docDataContent/environment/nextjs';
import { getEnvironmentNextJSNextJS14Data } from './docDataContent/environment/nextjs14';
import { getEnvironmentNuxtAndVueData } from './docDataContent/environment/NuxtAndVue';
import { getEnvironmentNextJSPageRouterData } from './docDataContent/environment/pageRouter';
import { getEnvironmentReactNativeAndExpoData } from './docDataContent/environment/reactNative';
import { getEnvironmentViteAndPreactData } from './docDataContent/environment/viteAndPreact';
import { getEnvironmentViteAndReactData } from './docDataContent/environment/viteAndReact';
import { getEnvironmentViteAndSolidData } from './docDataContent/environment/viteAndSolid';
import { getEnvironmentViteAndSvelteData } from './docDataContent/environment/viteAndSvelte';
import { getEnvironmentViteAndVueData } from './docDataContent/environment/viteAndVue';
import { getMCPServerData } from './docDataContent/mcp_server';
import { getVSCodeExtensionData } from './docDataContent/vscode_extension';
import type { CategorizedDocData, DocData, Section } from './types';

export const getDocData = (
  locale: LocalesValues = Locales.ENGLISH
): Section => {
  const content = getIntlayer('doc-data', locale);

  return {
    'get-started': {
      title: content['get-started'].title,
      default: getIntroductionData(locale),
    },
    roadmap: {
      title: content.roadmap.title,
      default: getRoadmapData(locale),
    },
    concept: {
      title: content.concept.title,
      subSections: {
        interest: {
          title: content.concept.subSections.interest.title,
          default: getInterestOfIntlayerData(locale),
        },
        'how-works-intlayer': {
          title: content.concept.subSections['how-works-intlayer'].title,
          default: getHowWorksIntlayerData(locale),
        },
        configuration: {
          title: content.concept.subSections.configuration.title,
          default: getConfigurationData(locale),
        },

        content: {
          title: content.concept.subSections.content.title,
          default: getContentDeclarationGetStatedData(locale),

          subSections: {
            translation: {
              title:
                content.concept.subSections.content.subsections.translation
                  .title,
              default: getContentDeclarationTranslationData(locale),
            },
            enumeration: {
              title:
                content.concept.subSections.content.subsections.enumeration
                  .title,
              default: getContentDeclarationEnumerationData(locale),
            },
            condition: {
              title:
                content.concept.subSections.content.subsections.condition.title,
              default: getContentDeclarationConditionData(locale),
            },
            insertion: {
              title:
                content.concept.subSections.content.subsections.insertion.title,
              default: getContentDeclarationInsertionData(locale),
            },
            file: {
              title: content.concept.subSections.content.subsections.file.title,
              default: getContentDeclarationFileData(locale),
            },
            nesting: {
              title:
                content.concept.subSections.content.subsections.nesting.title,
              default: getContentDeclarationNestingData(locale),
            },
            markdown: {
              title:
                content.concept.subSections.content.subsections.markdown.title,
              default: getContentDeclarationMarkdownData(locale),
            },
            'function-fetching': {
              title:
                content.concept.subSections.content.subsections[
                  'function-fetching'
                ].title,
              default: getContentDeclarationFunctionFetchingData(locale),
            },
          },
        },
        'per-locale-file': {
          title: content.concept.subSections['per-locale-file'].title,
          default: getContentDeclarationPerLocaleFileData(locale),
        },
        cli: {
          title: content.concept.subSections.cli.title,
          default: getCliData(locale),
        },
        'auto-fill': {
          title: content.concept.subSections['auto-fill'].title,
          default: getContentDeclarationAutoFillData(locale),
        },
        'ci-cd': {
          title: content.concept.subSections['ci-cd'].title,
          default: getCI_CDData(locale),
        },
        editor: {
          title: content.concept.subSections.editor.title,
          default: getVisualEditorData(locale),
        },
        cms: {
          title: content.concept.subSections.cms.title,
          default: getCMSData(locale),
        },
      },
    },
    environment: {
      title: content.environment.title,
      subSections: {
        nextjs: {
          title: content.environment.subSections.nextjs.title,
          default: getEnvironmentNextJSNextJS15Data(locale),
          subSections: {
            14: {
              title:
                content.environment.subSections.nextjs.subSections[14].title,
              default: getEnvironmentNextJSNextJS14Data(locale),
            },
            'next-with-Page-Router': {
              title:
                content.environment.subSections.nextjs.subSections[
                  'next-with-Page-Router'
                ].title,
              default: getEnvironmentNextJSPageRouterData(locale),
            },
          },
        },
        'create-react-app': {
          title: content.environment.subSections['create-react-app'].title,
          default: getEnvironmentCreateReactAppData(locale),
        },
        'vite-and-react': {
          title: content.environment.subSections['vite-and-react'].title,
          default: getEnvironmentViteAndReactData(locale),
        },
        'vite-and-vue': {
          title: content.environment.subSections['vite-and-vue'].title,
          default: getEnvironmentViteAndVueData(locale),
        },
        'nuxt-and-vue': {
          title: content.environment.subSections['nuxt-and-vue'].title,
          default: getEnvironmentNuxtAndVueData(locale),
        },
        'vite-and-solid': {
          title: content.environment.subSections['vite-and-solid'].title,
          default: getEnvironmentViteAndSolidData(locale),
        },
        'vite-and-svelte': {
          title: content.environment.subSections['vite-and-svelte'].title,
          default: getEnvironmentViteAndSvelteData(locale),
        },
        'vite-and-preact': {
          title: content.environment.subSections['vite-and-preact'].title,
          default: getEnvironmentViteAndPreactData(locale),
        },
        angular: {
          title: content.environment.subSections['angular'].title,
          default: getEnvironmentAngularData(locale),
        },
        'react-native-and-expo': {
          title: content.environment.subSections['react-native-and-expo'].title,
          default: getEnvironmentReactNativeAndExpoData(locale),
        },
        'lynx-and-react': {
          title: content.environment.subSections['lynx-and-react'].title,
          default: getEnvironmentLynxAndReactData(locale),
        },
        express: {
          title: content.environment.subSections.express.title,
          default: getEnvironmentExpressData(locale),
        },
      },
    },

    'vs-code-extension': {
      title: content['vs-code-extension'].title,
      default: getVSCodeExtensionData(locale),
    },
    'mcp-server': {
      title: content.mcp_server.title,
      default: getMCPServerData(locale),
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
