import { basename, dirname, extname, relative } from 'node:path';
import { getFormatFromExtension } from '@intlayer/chokidar/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { DictionaryKey, Fill } from '@intlayer/types/dictionary';
import type { FilePathPatternContext } from '@intlayer/types/filePathPattern';
import {
  getPatternForLocale,
  resolveOutputPattern,
} from '../utils/getOutputFilePath';

export type FillData = {
  localeList: Locale[];
  filePath: string;
  isPerLocale: boolean;
};

/** Merge FillData entries that resolve to the same file path. */
const groupByFilePath = (entries: FillData[]): FillData[] =>
  entries.reduce((acc, curr) => {
    const existing = acc.find((item) => item.filePath === curr.filePath);
    if (existing) {
      for (const loc of curr.localeList) {
        if (!existing.localeList.includes(loc)) existing.localeList.push(loc);
      }
      // Multiple locales sharing one path → multilingual file
      existing.isPerLocale = false;
    } else {
      acc.push(curr);
    }
    return acc;
  }, [] as FillData[]);

export const formatFillData = async (
  fillField: Fill,
  localeList: Locale[],
  filePath: string,
  dictionaryKey: DictionaryKey,
  configuration: IntlayerConfig
): Promise<FillData[]> => {
  if (!fillField || typeof fillField === 'boolean') return [];

  const { baseDir } = configuration.system;
  const { defaultLocale } = configuration.internationalization;

  const extension = extname(filePath);
  const base = basename(filePath);
  const cleanComponentFileName = base.includes('.content.')
    ? base.split('.content.')[0]
    : base.split('.')[0];
  const uncapitalizedName =
    cleanComponentFileName.charAt(0).toLowerCase() +
    cleanComponentFileName.slice(1);
  const componentFormat = getFormatFromExtension(extension);

  const getContext = (
    locale: Locale,
    patternString?: string
  ): FilePathPatternContext => {
    let format: FilePathPatternContext['format'] = 'json';
    if (patternString) {
      const extFormat = getFormatFromExtension(extname(patternString) as any);
      if (extFormat) format = extFormat as any;
    }
    return {
      key: dictionaryKey,
      componentDirPath: relative(baseDir, dirname(filePath)),
      componentFileName: cleanComponentFileName,
      fileName: uncapitalizedName,
      componentFormat:
        componentFormat as FilePathPatternContext['componentFormat'],
      componentExtension:
        extension as FilePathPatternContext['componentExtension'],
      format,
      locale,
      extension: configuration.content.fileExtensions[0],
    };
  };

  /**
   * Evaluate a scalar Fill pattern (string or function) for a list of locales.
   *
   * - Uses a dummy locale probe to detect whether the pattern varies per locale.
   * - `forcePerLocale` overrides the probe for object-fill entries where each
   *   locale always maps to its own dedicated file regardless of whether the
   *   path itself contains the locale string.
   */
  const processPattern = async (
    pattern: Fill,
    locales: Locale[],
    forcePerLocale = false
  ): Promise<FillData[]> => {
    const dummyLocale = '###########locale###########' as Locale;
    const patternString = typeof pattern === 'string' ? pattern : undefined;

    const dummyPath = await resolveOutputPattern(
      pattern,
      dummyLocale,
      getContext(dummyLocale, patternString),
      filePath,
      baseDir
    );
    const isPatternPerLocale =
      forcePerLocale ||
      (typeof dummyPath === 'string' && dummyPath.includes(dummyLocale));

    if (isPatternPerLocale) {
      const resolvedPaths: FillData[] = [];
      for (const locale of locales) {
        const absolutePath = await resolveOutputPattern(
          pattern,
          locale,
          getContext(locale, patternString),
          filePath,
          baseDir
        );
        if (absolutePath !== false) {
          resolvedPaths.push({
            filePath: absolutePath,
            localeList: [locale],
            isPerLocale: true,
          });
        }
      }
      return groupByFilePath(resolvedPaths);
    }

    // Single multilingual path — resolve using the default locale for context
    const absolutePath = await resolveOutputPattern(
      pattern,
      defaultLocale as Locale,
      getContext(defaultLocale as Locale, patternString),
      filePath,
      baseDir
    );
    if (absolutePath === false) return [];
    return [
      { filePath: absolutePath, localeList: locales, isPerLocale: false },
    ];
  };

  // Object fill: each locale key maps to its own pattern.
  // Object fill entries are always per-locale in intent (each locale → its own file).
  if (typeof fillField === 'object' && fillField !== null) {
    const results: FillData[] = [];
    for (const locale of localeList) {
      const pattern = getPatternForLocale(fillField, locale);
      if (pattern) {
        const res = await processPattern(pattern, [locale], true);
        results.push(...res);
      }
    }
    return groupByFilePath(results);
  }

  // Scalar string or function pattern
  return processPattern(fillField, localeList);
};
