import { isAbsolute, join } from 'node:path';
import type { Dictionary } from '@intlayer/types';

/** A content declaration generated from a component by the compiler. */
export type RelatedContentFile =
  | {
      /** Local `.content` file, opened in the editor. */
      kind: 'file';
      /** Key of the dictionary declared in the file. */
      dictionaryKey: string;
      /** Absolute path of the content declaration file. */
      absolutePath: string;
    }
  | {
      /** Remote dictionary, declared on the CMS only. */
      kind: 'remote';
      /** Key of the remote dictionary. */
      dictionaryKey: string;
      /** CMS page editing the dictionary. */
      cmsDictionaryUrl: string;
    };

/**
 * CMS page editing a dictionary (`https://app.intlayer.org/dictionary/hero`).
 *
 * @param cmsURL - `editor.cmsURL` of the configuration.
 * @param dictionaryKey - Key of the dictionary.
 */
export const getCmsDictionaryUrl = (
  cmsURL: string,
  dictionaryKey: string
): string =>
  `${cmsURL.replace(/\/+$/, '')}/dictionary/${encodeURIComponent(dictionaryKey)}`;

/**
 * Content declarations of the dictionaries the compiler extracted from a
 * component (`componentFilePath` match): local files, or CMS pages for remote
 * dictionaries. One entry per file or remote key.
 *
 * @param dictionaries - Built unmerged dictionaries of the project.
 * @param componentFilePath - Component path, as the compiler stores it.
 * @param baseDir - Project root, against which `filePath` is resolved.
 * @param cmsURL - `editor.cmsURL`, base of the remote dictionary links.
 */
export const getRelatedContentFiles = (
  dictionaries: Dictionary[],
  componentFilePath: string,
  baseDir: string,
  cmsURL?: string
): RelatedContentFile[] => {
  const relatedContentFiles = new Map<string, RelatedContentFile>();

  for (const dictionary of dictionaries) {
    if (dictionary.componentFilePath !== componentFilePath) continue;

    if (dictionary.location === 'remote') {
      if (!cmsURL) continue;

      const cmsDictionaryUrl = getCmsDictionaryUrl(cmsURL, dictionary.key);

      relatedContentFiles.set(cmsDictionaryUrl, {
        kind: 'remote',
        dictionaryKey: dictionary.key,
        cmsDictionaryUrl,
      });
      continue;
    }

    if (!dictionary.filePath) continue;

    const absolutePath = isAbsolute(dictionary.filePath)
      ? dictionary.filePath
      : join(baseDir, dictionary.filePath);

    relatedContentFiles.set(absolutePath, {
      kind: 'file',
      dictionaryKey: dictionary.key,
      absolutePath,
    });
  }

  return [...relatedContentFiles.values()];
};
