import { Locales } from 'intlayer';
import { getIntlayer } from 'next-intlayer';
import { getBlogIndexData } from './blogDataContent';
import { getBlogIntlayerWithNextI18nextData } from './blogDataContent/nextI18next';
import { getBlogNextI18nVSNextIntlVSIntlayerData } from './blogDataContent/nextI18nextVSnextIntlVSIntlayer';
import { getBlogIntlayerWithNextIntlData } from './blogDataContent/nextIntl';
import { getBlogIntlayerWithReactI18nextData } from './blogDataContent/reactI18next';
import { getBlogReactI18nVSReactIntlVSIntlayerData } from './blogDataContent/reactI18nextVSreactIntlVSIntlayer';
import { getBlogIntlayerWithReactIntlData } from './blogDataContent/reactIntl';
import { getBlogSEOData } from './blogDataContent/SEO';
import { CategorizedBlogData, BlogData, Section } from './types';

export const getBlogData = (
  locale = Locales.ENGLISH
): Record<string, CategorizedBlogData> => {
  const content = getIntlayer('blog-data', locale);

  return {
    blog: {
      title: content.default.title,
      default: getBlogIndexData(locale),
      subSections: {
        'SEO-and-i18n': {
          title: content.default.subSections.SEO.title,
          default: getBlogSEOData(locale),
        },
        'intlayer-with-next-i18next': {
          title:
            content.default.subSections['intlayer-with-next-i18next'].title,
          default: getBlogIntlayerWithNextI18nextData(locale),
        },
        'intlayer-with-react-i18next': {
          title:
            content.default.subSections['intlayer-with-react-i18next'].title,
          default: getBlogIntlayerWithReactI18nextData(locale),
        },
        'intlayer-with-next-intl': {
          title: content.default.subSections['intlayer-with-next-intl'].title,
          default: getBlogIntlayerWithNextIntlData(locale),
        },
        'intlayer-with-react-intl': {
          title: content.default.subSections['intlayer-with-react-intl'].title,
          default: getBlogIntlayerWithReactIntlData(locale),
        },
        'next-i18next-vs-next-intl-vs-intlayer': {
          title:
            content.default.subSections['next-i18next_vs_next-intl_vs_intlayer']
              .title,
          default: getBlogNextI18nVSNextIntlVSIntlayerData(locale),
        },
        'react-i18next-vs-react-intl-vs-intlayer': {
          title:
            content.default.subSections['react-i18n-vs-react-intl-vs-intlayer']
              .title,
          default: getBlogReactI18nVSReactIntlVSIntlayerData(locale),
        },
      },
    },
  } satisfies Record<string, CategorizedBlogData>;
};

export const getBlogDataByPath = (
  docPath: string[] = [],
  locale: Locales = Locales.ENGLISH
): BlogData | undefined => {
  const blogData = getBlogData(locale);

  if (docPath.length === 0) {
    return blogData['blog'].default;
  }

  let currentSection = blogData['blog'].subSections;

  // Traverse the nested structure based on the docPath array
  for (const path of docPath) {
    const sections = currentSection?.[path as keyof typeof currentSection];

    if (sections && path === docPath[docPath.length - 1]) {
      return sections.default;
    } else if (typeof sections?.subSections !== 'undefined') {
      currentSection = sections.subSections;
    } else {
      return undefined; // Path is invalid if any segment does not exist
    }
  }
};

export const getBlogSubSection = (
  docData: Record<string, CategorizedBlogData>,
  sectionKey: string[]
): CategorizedBlogData | undefined => {
  let current = docData['blog'].subSections as unknown as CategorizedBlogData; // Use the `docData` object to navigate through sections

  for (const key of sectionKey) {
    if (current[key as keyof typeof current]) {
      current = current[key as keyof typeof current] as CategorizedBlogData; // Navigate deeper
    } else if (current.subSections && current.subSections[key]) {
      current = current.subSections[key] as CategorizedBlogData; // Navigate deeper
    } else {
      return undefined; // If key is not found, return an empty string
    }
  }

  return current; // Return the title if it exists
};

type BlogSectionPaths = {
  paths: string[][];
  blog: BlogData[];
  title: string[];
};

export const getBlogSection = (
  docData: Section,
  presetKeys: string[] = []
): BlogSectionPaths => {
  const paths: string[][] = [];
  const blog: BlogData[] = [];
  const title: string[] = [];

  for (const key of Object.keys(docData)) {
    const docDataValue = docData[key];

    if (typeof docDataValue.default !== 'undefined') {
      blog.push(docDataValue.default);
      paths.push([...presetKeys, key]);
      title.push(docDataValue.title);
    }
    if (typeof docDataValue.subSections !== 'undefined') {
      const {
        paths: subSectionsPaths,
        blog: subSectionsBlogs,
        title: subTitle,
      } = getBlogSection(docDataValue.subSections, [...presetKeys, key]);

      blog.push(...subSectionsBlogs);
      paths.push(...subSectionsPaths);
      title.push(...subTitle);
    }
  }

  return { paths, blog, title };
};

export const getBlogPathsArray = (
  locale: Locales = Locales.ENGLISH
): string[][] => {
  const docData = getBlogData(locale);
  return getBlogSection(docData['blog'].subSections as Section).paths;
};

export const getBlogDataArray = (locale?: Locales): BlogData[] => {
  const docData = getBlogData(locale);
  return getBlogSection(docData['blog'].subSections as Section).blog;
};

export const getPreviousNextBlogData = (
  docElement: BlogData,
  locale: Locales
) => {
  const docData = getBlogData(locale);
  const { blog, paths, title } = getBlogSection(docData);

  const blogIndex = blog.findIndex(
    (blog) => blog.blogName === docElement?.blogName
  );
  const nextBlogIndex = blogIndex + 1;
  const prevBlogIndex = blogIndex - 1;

  return {
    prevBlogData: {
      blogs: blog[prevBlogIndex],
      paths: paths[prevBlogIndex],
      title: title[prevBlogIndex],
    },
    nextBlogData: {
      blogs: blog[nextBlogIndex],
      paths: paths[nextBlogIndex],
      title: title[nextBlogIndex],
    },
  };
};
