import { Locales, LocalesValues, getIntlayer } from 'intlayer';
import type { BlogData, CategorizedBlogData, Section } from './types';

export const getBlogData = (
  locale = Locales.ENGLISH
): Record<string, CategorizedBlogData> => {
  const content = getIntlayer('blog-data', locale);

  return {
    blog: {
      title: content.default.title,
      default: getIntlayer('blog-metadata', locale),
      subSections: {
        'what-is-internationalization': {
          title:
            content.default.subSections['what-is-internationalization'].title,
          default: getIntlayer('blog-what-is-i18n-metadata', locale),
        },
        'SEO-and-i18n': {
          title: content.default.subSections.SEO.title,
          default: getIntlayer('blog-i18n-and-SEO-metadata', locale),
        },
        'intlayer-with-next-i18next': {
          title:
            content.default.subSections['intlayer-with-next-i18next'].title,
          default: getIntlayer(
            'blog-intlayer-with-next-i18next-metadata',
            locale
          ),
        },
        'intlayer-with-react-i18next': {
          title:
            content.default.subSections['intlayer-with-react-i18next'].title,
          default: getIntlayer(
            'blog-intlayer-with-react-i18next-metadata',
            locale
          ),
        },
        'intlayer-with-next-intl': {
          title: content.default.subSections['intlayer-with-next-intl'].title,
          default: getIntlayer('blog-intlayer-with-next-intl-metadata', locale),
        },
        'intlayer-with-react-intl': {
          title: content.default.subSections['intlayer-with-react-intl'].title,
          default: getIntlayer(
            'blog-intlayer-with-react-intl-metadata',
            locale
          ),
        },
        'next-i18next-vs-next-intl-vs-intlayer': {
          title:
            content.default.subSections['next-i18next_vs_next-intl_vs_intlayer']
              .title,
          default: getIntlayer(
            'blog-next-i18next-vs-next-intl-vs-intlayer-metadata',
            locale
          ),
        },
        'react-i18next-vs-react-intl-vs-intlayer': {
          title:
            content.default.subSections['react-i18n-vs-react-intl-vs-intlayer']
              .title,
          default: getIntlayer(
            'blog-react-i18n-vs-react-intl-vs-intlayer-metadata',
            locale
          ),
        },
        'i18n-technologies': {
          title: content.default.subSections['i18n-technologies'].title,
          subSections: {
            frameworks: {
              title:
                content.default.subSections['i18n-technologies'].subSections
                  .frameworks.title,
              subSections: {
                angular: {
                  title:
                    content.default.subSections['i18n-technologies'].subSections
                      .frameworks.subSections.angular.title,
                  default: getIntlayer(
                    'blog-i18n_technologies_frameworks_angular-metadata',
                    locale
                  ),
                },
                react: {
                  title:
                    content.default.subSections['i18n-technologies'].subSections
                      .frameworks.subSections.react.title,
                  default: getIntlayer(
                    'blog-i18n_technologies_frameworks_react-metadata',
                    locale
                  ),
                },
                vue: {
                  title:
                    content.default.subSections['i18n-technologies'].subSections
                      .frameworks.subSections.vue.title,
                  default: getIntlayer(
                    'blog-i18n_technologies_frameworks_vue-metadata',
                    locale
                  ),
                },
                svelte: {
                  title:
                    content.default.subSections['i18n-technologies'].subSections
                      .frameworks.subSections.svelte.title,
                  default: getIntlayer(
                    'blog-i18n_technologies_frameworks_svelte-metadata',
                    locale
                  ),
                },
                flutter: {
                  title:
                    content.default.subSections['i18n-technologies'].subSections
                      .frameworks.subSections.flutter.title,
                  default: getIntlayer(
                    'blog-i18n_technologies_frameworks_flutter-metadata',
                    locale
                  ),
                },
                'react-native': {
                  title:
                    content.default.subSections['i18n-technologies'].subSections
                      .frameworks.subSections['react-native'].title,
                  default: getIntlayer(
                    'blog-i18n_technologies_frameworks_react-native-metadata',
                    locale
                  ),
                },
              },
            },
            CMS: {
              title:
                content.default.subSections['i18n-technologies'].subSections.CMS
                  .title,
              subSections: {
                wordpress: {
                  title:
                    content.default.subSections['i18n-technologies'].subSections
                      .CMS.subSections.wordpress.title,
                  default: getIntlayer(
                    'blog-i18n_technologies_CMS_wordpress-metadata',
                    locale
                  ),
                },
                drupal: {
                  title:
                    content.default.subSections['i18n-technologies'].subSections
                      .CMS.subSections.drupal.title,
                  default: getIntlayer(
                    'blog-i18n_technologies_CMS_drupal-metadata',
                    locale
                  ),
                },
                wix: {
                  title:
                    content.default.subSections['i18n-technologies'].subSections
                      .CMS.subSections.wix.title,
                  default: getIntlayer(
                    'blog-i18n_technologies_CMS_wix-metadata',
                    locale
                  ),
                },
              },
            },
          },
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

  let currentSection = blogData['blog'].subSections;

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

  return blogData['blog'].default;
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
      break; // If key is not found, return an empty string
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

export const getBlogDataArray = (locale?: LocalesValues): BlogData[] => {
  const docData = getBlogData(locale as Locales);
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
