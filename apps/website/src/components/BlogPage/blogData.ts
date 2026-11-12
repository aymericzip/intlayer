import type { BlogKey, BlogMetadata } from '@intlayer/docs';
import { getIntlayer, type LocalesValues } from 'intlayer';
import type { BlogNavMetadata, CategorizedBlogData, Section } from './types';

/** Walks the section tree along the given keys. */
export const getBlogSubSection = <
  Metadata extends BlogNavMetadata | BlogMetadata = BlogMetadata,
>(
  docData: Section<Metadata>,
  sectionKey: string[]
): CategorizedBlogData<Metadata> | undefined => {
  let current = docData as unknown as CategorizedBlogData<Metadata>; // Use the `docData` object to navigate through sections

  for (const key of sectionKey) {
    if (current[key as keyof typeof current]) {
      current = current[
        key as keyof typeof current
      ] as CategorizedBlogData<Metadata>; // Navigate deeper
    } else if (current.subSections?.[key]) {
      current = current.subSections[key] as CategorizedBlogData<Metadata>; // Navigate deeper
    } else {
      break; // If key is not found, return an empty string
    }
  }

  return current; // Return the title if it exists
};

type BlogSectionPaths<Metadata extends BlogNavMetadata | BlogMetadata> = {
  paths: string[][];
  blog: Metadata[];
  title: string[];
};

/** Flattens a blog section tree into its posts, paths and titles. */
export const getBlogSection = <
  Metadata extends BlogNavMetadata | BlogMetadata = BlogMetadata,
>(
  docData: Section<Metadata>,
  presetKeys: string[] = []
): BlogSectionPaths<Metadata> => {
  const paths: string[][] = [];
  const blog: Metadata[] = [];
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
  const blogData = getIntlayer('blog-data', locale) as Record<
    string,
    CategorizedBlogData
  >;

  const { blog, paths, title } = getBlogSection(blogData);

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
