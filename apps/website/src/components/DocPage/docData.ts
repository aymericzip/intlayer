import type { DocKey, DocMetadata } from '@intlayer/docs';
import { getIntlayer, Locales, type LocalesValues } from 'intlayer';
import type { NavCategorizedDoc, NavSection, Section } from './types';

export const getDocData = (locale: LocalesValues = Locales.ENGLISH): Section =>
  getIntlayer('doc-data', locale) satisfies Section;

/**
 * Reduces a documentation tree to the fields the sidebar and breadcrumb read.
 *
 * The full tree carries the complete metadata of every page — description,
 * keywords, revision history, GitHub locations — and is serialized into every
 * documentation page. Trimming it removes the bulk of that payload without
 * changing anything the navigation renders.
 *
 * @param section - Full documentation tree, as returned by `getDocData`.
 * @returns The same tree, holding navigation fields only.
 */
export const toNavSection = (section: Section): NavSection =>
  Object.fromEntries(
    Object.entries(section).map(([key, data]): [string, NavCategorizedDoc] => [
      key,
      {
        title: data.title,
        ...(data.frameworks ? { frameworks: data.frameworks } : {}),
        ...(data.deployed === undefined ? {} : { deployed: data.deployed }),
        ...(data.default
          ? {
              default: {
                slugs: data.default.slugs,
                relativeUrl: data.default.relativeUrl,
                url: data.default.url,
              },
            }
          : {}),
        ...(data.subSections
          ? { subSections: toNavSection(data.subSections) }
          : {}),
      },
    ])
  );

export const getDocSubSection = (
  docData: NavSection,
  sectionKey: string[]
): NavCategorizedDoc | undefined => {
  let current = docData as unknown as NavCategorizedDoc; // Use the `docData` object to navigate through sections

  for (const key of sectionKey) {
    if (current[key as keyof typeof current]) {
      current = current[
        key as keyof typeof current
      ] as unknown as NavCategorizedDoc; // Navigate deeper
    } else if (current.subSections?.[key]) {
      current = current.subSections[key] as NavCategorizedDoc; // Navigate deeper
    } else {
      return undefined; // If key is not found, return an empty string
    }
  }

  return current; // Return the title if it exists
};

type DocSectionPaths = {
  paths: string[][];
  docs: DocMetadata[];
  title: string[];
};

export const getDocSection = (
  docData: Section,
  presetKeys: string[] = []
): DocSectionPaths => {
  const paths: string[][] = [];
  const docs: DocMetadata[] = [];
  const title: string[] = [];

  for (const key of Object.keys(docData)) {
    const docDataValue = docData[key];

    if (typeof docDataValue.default !== 'undefined') {
      docs.push(docDataValue.default as unknown as DocMetadata);
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

export const getPreviousNextDocMetadata = (
  docKey: DocKey,
  locale: LocalesValues
) => {
  const docData = getDocData(locale);
  const { docs, paths, title } = getDocSection(docData);

  const docIndex = docs.findIndex((doc) => doc.docKey === docKey);
  const nextDocIndex = docIndex + 1;
  const prevDocIndex = docIndex - 1;

  return {
    prevDocData: {
      docs: docs[prevDocIndex] as DocMetadata,
      paths: paths[prevDocIndex],
      title: title[prevDocIndex],
    },
    nextDocData: {
      docs: docs[nextDocIndex] as DocMetadata,
      paths: paths[nextDocIndex],
      title: title[nextDocIndex],
    },
  };
};
