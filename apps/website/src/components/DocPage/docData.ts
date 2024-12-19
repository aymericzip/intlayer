import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { locales } from '../../../intlayer.config';
import { getBlogIntlayerWithI18nextData } from './docDataContent/blog/i18next';
import { getCliData } from './docDataContent/concept/cli';
import { getConfigurationData } from './docDataContent/concept/configuration';
import { getContentDeclarationEnumerationData } from './docDataContent/concept/contentDeclaration/enumeration';
import { getContentDeclarationFunctionFetchingData } from './docDataContent/concept/contentDeclaration/functionFetching';
import { getContentDeclarationGetStatedData } from './docDataContent/concept/contentDeclaration/getStarted';
import { getContentDeclarationTranslationData } from './docDataContent/concept/contentDeclaration/translation';
import { getEditorData } from './docDataContent/concept/editor';
import { getHowWorksIntlayerData } from './docDataContent/concept/howWorksIntlayer';
import { getInterestOfIntlayerData } from './docDataContent/concept/interestOfIntlayer';
import { getIntroductionData } from './docDataContent/concept/introduction';
import { getEnvironmentCreateReactAppData } from './docDataContent/environment/createReactApp';
import { getEnvironmentExpressData } from './docDataContent/environment/express';
import { getEnvironmentNextJSNextJS15Data } from './docDataContent/environment/nextjs';
import { getEnvironmentNextJSNextJS14Data } from './docDataContent/environment/nextjs14';
import { getEnvironmentNextJSPageRouterData } from './docDataContent/environment/pageRouter';
import { getEnvironmentViteAndReactData } from './docDataContent/environment/viteAndReact';
import { getPackagesExpressIntlayerTData } from './docDataContent/packages/express-intlayer/t';
import { getPackagesIntlayerGetConfigurationData } from './docDataContent/packages/intlayer/getConfiguration';
import { getPackagesIntlayerGetEnumerationContentData } from './docDataContent/packages/intlayer/getEnumerationContent';
import { getPackagesIntlayerGetHTMLTextDirData } from './docDataContent/packages/intlayer/getHTMLTextDir';
import { getPackagesIntlayerGetLocaleLangData } from './docDataContent/packages/intlayer/getLocaleLang';
import { getPackagesIntlayerGetLocaleNameData } from './docDataContent/packages/intlayer/getLocaleName';
import { getPackagesIntlayerGetLocalizedUrlData } from './docDataContent/packages/intlayer/getLocalizedUrl';
import { getPackagesIntlayerGetMultilingualUrlsData } from './docDataContent/packages/intlayer/getMultilingualUrls';
import { getPackagesIntlayerGetPathWithoutLocaleData } from './docDataContent/packages/intlayer/getPathWithoutLocale';
import { getPackagesIntlayerGetTranslationContentData } from './docDataContent/packages/intlayer/getTranslationContent';
import { getPackagesNextIntlayerTData } from './docDataContent/packages/next-intlayer/t';
import { getPackagesNextIntlayerUseDictionaryData } from './docDataContent/packages/next-intlayer/useDictionary';
import { getPackagesNextIntlayerUseIntlayerData } from './docDataContent/packages/next-intlayer/useIntlayer';
import { getPackagesNextIntlayerUseIntlayerAsyncData } from './docDataContent/packages/next-intlayer/useIntlayerAsync';
import { getPackagesNextIntlayerUseLocaleData } from './docDataContent/packages/next-intlayer/useLocale';
import { getPackagesReactIntlayerTData } from './docDataContent/packages/react-inltayer/t';
import { getPackagesReactIntlayerUseDictionaryData } from './docDataContent/packages/react-inltayer/useDictionary';
import { getPackagesReactIntlayerUseIntlayerData } from './docDataContent/packages/react-inltayer/useIntlayer';
import { getPackagesReactIntlayerUseIntlayerAsyncData } from './docDataContent/packages/react-inltayer/useIntlayerAsync';
import { getPackagesReactIntlayerUseLocaleData } from './docDataContent/packages/react-inltayer/useLocale';
import { CategorizedDocData, DocData, Section } from './types';
import { PagesRoutes, GithubRoutes } from '@/Routes';

export const getDocData = (locale = Locales.ENGLISH) => {
  const content = getIntlayer('doc-data', locale);

  const result: Record<string, CategorizedDocData> = {
    'get-started': {
      title: content['get-started'].title,
      default: getIntroductionData(locale),
    },
    concept: {
      title: content.concept.title,
      subSections: {
        'how-works-intlayer': {
          title: content.concept.subSections['how-works-intlayer'].title,
          default: getHowWorksIntlayerData(locale),
        },
        configuration: {
          title: content.concept.subSections.configuration.title,
          default: getConfigurationData(locale),
        },
        interest: {
          title: content.concept.subSections.interest.title,
          default: getInterestOfIntlayerData(locale),
        },
        cli: {
          title: content.concept.subSections.cli.title,
          default: getCliData(locale),
        },
        editor: {
          title: content.concept.subSections.editor.title,
          default: getEditorData(locale),
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
            'function-fetching': {
              title:
                content.concept.subSections.content.subsections[
                  'function-fetching'
                ].title,
              default: getContentDeclarationFunctionFetchingData(locale),
            },
          },
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
        express: {
          title: content.environment.subSections.express.title,
          default: getEnvironmentExpressData(locale),
        },
      },
    },
    packages: {
      title: 'Packages',
      subSections: {
        intlayer: {
          title: content.packages.subSections['intlayer'].title,
          subSections: {
            getConfiguration: {
              title:
                content.packages.subSections['intlayer'].subSections
                  .getConfiguration.title,
              default: getPackagesIntlayerGetConfigurationData(locale),
            },
            getLocaleLang: {
              title:
                content.packages.subSections['intlayer'].subSections
                  .getLocaleLang.title,
              default: getPackagesIntlayerGetLocaleLangData(locale),
            },
            getLocaleName: {
              title:
                content.packages.subSections['intlayer'].subSections
                  .getLocaleName.title,
              default: getPackagesIntlayerGetLocaleNameData(locale),
            },
            getLocalizedUrl: {
              title:
                content.packages.subSections['intlayer'].subSections
                  .getLocalizedUrl.title,
              default: getPackagesIntlayerGetLocalizedUrlData(locale),
            },
            getMultilingualUrls: {
              title:
                content.packages.subSections['intlayer'].subSections
                  .getMultilingualUrls.title,
              default: getPackagesIntlayerGetMultilingualUrlsData(locale),
            },
            getPathWithoutLocale: {
              title:
                content.packages.subSections['intlayer'].subSections
                  .getPathWithoutLocale.title,
              default: getPackagesIntlayerGetPathWithoutLocaleData(locale),
            },
            getTranslationContent: {
              title:
                content.packages.subSections['intlayer'].subSections
                  .getTranslationContent.title,
              default: getPackagesIntlayerGetTranslationContentData(locale),
            },
            getEnumerationContent: {
              title:
                content.packages.subSections['intlayer'].subSections
                  .getEnumerationContent.title,
              default: getPackagesIntlayerGetEnumerationContentData(locale),
            },
            getHTMLTextDir: {
              title:
                content.packages.subSections['intlayer'].subSections
                  .getHTMLTextDir.title,
              default: getPackagesIntlayerGetHTMLTextDirData(locale),
            },
          },
        },
        'express-intlayer': {
          title: content.packages.subSections['express-intlayer'].title,
          subSections: {
            t: {
              title:
                content.packages.subSections['express-intlayer'].subSections.t
                  .title,
              default: getPackagesExpressIntlayerTData(locale),
            },
          },
        },
        'react-intlayer': {
          title: content.packages.subSections['react-intlayer'].title,
          subSections: {
            t: {
              title:
                content.packages.subSections['react-intlayer'].subSections.t
                  .title,
              default: getPackagesReactIntlayerTData(locale),
            },
            useIntlayer: {
              title:
                content.packages.subSections['react-intlayer'].subSections
                  .useIntlayer.title,
              default: getPackagesReactIntlayerUseIntlayerData(locale),
            },
            useIntlayerAsync: {
              title:
                content.packages.subSections['react-intlayer'].subSections
                  .useIntlayerAsync.title,
              default: getPackagesReactIntlayerUseIntlayerAsyncData(locale),
            },
            useDictionary: {
              title:
                content.packages.subSections['react-intlayer'].subSections
                  .useDictionary.title,
              default: getPackagesReactIntlayerUseDictionaryData(locale),
            },
            useLocale: {
              title:
                content.packages.subSections['react-intlayer'].subSections
                  .useLocale.title,
              default: getPackagesReactIntlayerUseLocaleData(locale),
            },
          },
        },
        'next-intlayer': {
          title: content.packages.subSections['next-intlayer'].title,
          subSections: {
            t: {
              title:
                content.packages.subSections['next-intlayer'].subSections.t
                  .title,
              default: getPackagesNextIntlayerTData(locale),
            },
            useIntlayer: {
              title:
                content.packages.subSections['next-intlayer'].subSections
                  .useIntlayer.title,
              default: getPackagesNextIntlayerUseIntlayerData(locale),
            },
            useIntlayerAsync: {
              title:
                content.packages.subSections['next-intlayer'].subSections
                  .useIntlayerAsync.title,
              default: getPackagesNextIntlayerUseIntlayerAsyncData(locale),
            },
            useDictionary: {
              title:
                content.packages.subSections['next-intlayer'].subSections
                  .useDictionary.title,
              default: getPackagesNextIntlayerUseDictionaryData(locale),
            },
            useLocale: {
              title:
                content.packages.subSections['next-intlayer'].subSections
                  .useLocale.title,
              default: getPackagesNextIntlayerUseLocaleData(locale),
            },
          },
        },
      },
    },
    blog: {
      title: content.blog.title,
      subSections: {
        i18next: {
          title: content.blog.subSections.i18next.title,
          default: getBlogIntlayerWithI18nextData(locale),
        },
      },
    },
  };

  return result;
};

export const getDocDataByPath = (
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

export const getDocDataArray = (locale?: Locales): DocData[] => {
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

const getDocLocale = (url: string, locale: Locales): string =>
  url.replace('/en/', `/${locale}/`);

const docUrlRenamer: Record<GithubRoutes | string, PagesRoutes> = {
  [process.env.NEXT_PUBLIC_URL!]: PagesRoutes.Home,
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

  [GithubRoutes['Packages_intlayer_getConfiguration']]:
    PagesRoutes['Doc_Packages_intlayer_getConfiguration'],
  [GithubRoutes['Packages_intlayer_getDictionary']]:
    PagesRoutes['Doc_Packages_intlayer_getDictionary'],
  [GithubRoutes['Packages_intlayer_getLocaleLang']]:
    PagesRoutes['Doc_Packages_intlayer_getLocaleLang'],
  [GithubRoutes['Packages_intlayer_getLocaleName']]:
    PagesRoutes['Doc_Packages_intlayer_getLocaleName'],
  [GithubRoutes['Packages_intlayer_getHTMLTextDir']]:
    PagesRoutes['Doc_Packages_intlayer_getHTMLTextDir'],
  [GithubRoutes['Packages_intlayer_getLocalizedUrl']]:
    PagesRoutes['Doc_Packages_intlayer_getLocalizedUrl'],
  [GithubRoutes['Packages_intlayer_getMultilingualUrls']]:
    PagesRoutes['Doc_Packages_intlayer_getMultilingualUrls'],
  [GithubRoutes['Packages_intlayer_getPathWithoutLocale']]:
    PagesRoutes['Doc_Packages_intlayer_getPathWithoutLocale'],
  [GithubRoutes['Packages_intlayer_getTranslationContent']]:
    PagesRoutes['Doc_Packages_intlayer_getTranslationContent'],
  [GithubRoutes['Packages_intlayer_getEnumerationContent']]:
    PagesRoutes['Doc_Packages_intlayer_getEnumerationContent'],
  [GithubRoutes['Packages_intlayer_removeLocaleFromUrl']]:
    PagesRoutes['Doc_Packages_intlayer_removeLocaleFromUrl'],
  [GithubRoutes['Packages_express-intlayer_t']]:
    PagesRoutes['Doc_Packages_express-intlayer_t'],
  [GithubRoutes['Packages_react-intlayer_t']]:
    PagesRoutes['Doc_Packages_react-intlayer_t'],
  [GithubRoutes['Packages_react-intlayer_useIntlayer']]:
    PagesRoutes['Doc_Packages_react-intlayer_useIntlayer'],
  [GithubRoutes['Packages_react-intlayer_useIntlayerAsync']]:
    PagesRoutes['Doc_Packages_react-intlayer_useIntlayerAsync'],
  [GithubRoutes['Packages_react-intlayer_useDictionary']]:
    PagesRoutes['Doc_Packages_react-intlayer_useDictionary'],
  [GithubRoutes['Packages_react-intlayer_useLocale']]:
    PagesRoutes['Doc_Packages_react-intlayer_useLocale'],
  [GithubRoutes['Packages_next-intlayer_t']]:
    PagesRoutes['Doc_Packages_next-intlayer_t'],
  [GithubRoutes['Packages_next-intlayer_useIntlayer']]:
    PagesRoutes['Doc_Packages_next-intlayer_useIntlayer'],
  [GithubRoutes['Packages_next-intlayer_useIntlayerAsync']]:
    PagesRoutes['Doc_Packages_next-intlayer_useIntlayerAsync'],
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
