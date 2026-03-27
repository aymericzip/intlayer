import type { BlogKey, BlogMetadata } from '@intlayer/docs';
import { getIntlayer, Locales, type LocalesValues } from 'intlayer';
import type { CategorizedBlogData, Section } from './types';

export const getBlogData = (
  locale: LocalesValues = Locales.ENGLISH
): Record<string, CategorizedBlogData> => {
  const blog = getIntlayer('blog-data', locale);

  return blog satisfies Record<string, CategorizedBlogData>;
};

export const getBlogSubSection = (
  docData: Record<string, CategorizedBlogData>,
  sectionKey: string[]
): CategorizedBlogData | undefined => {
  let current = docData as unknown as CategorizedBlogData; // Use the `docData` object to navigate through sections

  for (const key of sectionKey) {
    if (current[key as keyof typeof current]) {
      current = current[key as keyof typeof current] as CategorizedBlogData; // Navigate deeper
    } else if (current.subSections?.[key]) {
      current = current.subSections[key] as CategorizedBlogData; // Navigate deeper
    } else {
      break; // If key is not found, return an empty string
    }
  }

  return current; // Return the title if it exists
};

type BlogSectionPaths = {
  paths: string[][];
  blog: BlogMetadata[];
  title: string[];
};

export const getBlogSection = (
  docData: Section,
  presetKeys: string[] = []
): BlogSectionPaths => {
  const paths: string[][] = [];
  const blog: BlogMetadata[] = [];
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

export const getPreviousNextBlogData = (
  docKey: BlogKey,
  locale: LocalesValues
) => {
  const docData = getBlogData(locale);
  const { blog, paths, title } = getBlogSection(docData);

  const blogIndex = blog.findIndex((blog) => blog.docKey === docKey);
  const nextBlogIndex = blogIndex + 1;
  const prevBlogIndex = blogIndex - 1;

  return {
    prevBlogData: {
      blogs: blog[prevBlogIndex] as BlogMetadata,
      paths: paths[prevBlogIndex],
      title: title[prevBlogIndex],
    },
    nextBlogData: {
      blogs: blog[nextBlogIndex] as BlogMetadata,
      paths: paths[nextBlogIndex],
      title: title[nextBlogIndex],
    },
  };
};
