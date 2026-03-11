import { basename, dirname, extname, relative } from 'node:path';
import {
  getFormatFromExtension,
  resolveRelativePath,
} from '@intlayer/chokidar/utils';
import { parseStringPattern } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { DictionaryKey, Fill } from '@intlayer/types/dictionary';
import type {
  FilePathPattern,
  FilePathPatternContext,
} from '@intlayer/types/filePathPattern';

export type FillData = {
  localeList: Locale[];
  filePath: string;
  isPerLocale: boolean;
};

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

  // Extract the original filename without extensions
  const cleanComponentFileName = base.includes('.content.')
    ? base.split('.content.')[0]
    : base.split('.')[0];

  const uncapitalizedName =
    cleanComponentFileName.charAt(0).toLowerCase() +
    cleanComponentFileName.slice(1);

  const componentFormat = getFormatFromExtension(extension as any);

  const getContext = (
    locale: Locale,
    patternType?: FilePathPattern
  ): FilePathPatternContext => {
    let format: FilePathPatternContext['format'] = 'json';
    if (typeof patternType === 'string') {
      const extFormat = getFormatFromExtension(extname(patternType) as any);
      if (extFormat) {
        format = extFormat as any;
      }
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
      extension: configuration.content.fileExtensions[0] as any,
    };
  };

  const processPattern = async (
    pattern: FilePathPattern,
    locales: Locale[]
  ): Promise<FillData[]> => {
    const dummyLocale = '###########locale###########' as Locale;
    let isPatternPerLocale = false;

    if (typeof pattern === 'string') {
      isPatternPerLocale = pattern.includes('{{locale}}');
    } else if (typeof pattern === 'function') {
      const pathWithDummy = await pattern(getContext(dummyLocale, pattern));
      isPatternPerLocale = pathWithDummy.includes(dummyLocale);
    }

    if (isPatternPerLocale) {
      const resolvedPaths: FillData[] = [];

      // Generate one path per locale
      for (const locale of locales) {
        const rawPath =
          typeof pattern === 'string'
            ? parseStringPattern(pattern, getContext(locale, pattern))
            : await pattern(getContext(locale, pattern));

        const absolutePath = resolveRelativePath(rawPath, filePath, baseDir);

        resolvedPaths.push({
          filePath: absolutePath,
          localeList: [locale],
          isPerLocale: true,
        });
      }

      // Group by filePath in case multiple locales resolve to the same path
      const groupedByFilePath = resolvedPaths.reduce((acc, curr) => {
        const existing = acc.find((item) => item.filePath === curr.filePath);
        if (existing) {
          if (!existing.localeList.includes(curr.localeList[0])) {
            existing.localeList.push(...curr.localeList);
          }
          // If multiple locales share a path, it's no longer strictly per-locale
          existing.isPerLocale = false;
        } else {
          acc.push(curr);
        }
        return acc;
      }, [] as FillData[]);

      return groupedByFilePath;
    } else {
      // Single multi-lingual path using default locale for pattern resolution
      const rawPath =
        typeof pattern === 'string'
          ? parseStringPattern(pattern, getContext(defaultLocale, pattern))
          : await pattern(getContext(defaultLocale, pattern));

      const absolutePath = resolveRelativePath(rawPath, filePath, baseDir);

      return [
        {
          filePath: absolutePath,
          localeList: locales,
          isPerLocale: false,
        },
      ];
    }
  };

  // 1. Handle Record of Locales
  if (typeof fillField === 'object' && fillField !== null) {
    const results: FillData[] = [];

    for (const locale of localeList) {
      const pattern = (fillField as Record<string, any>)[locale];
      if (pattern && typeof pattern !== 'boolean') {
        const res = await processPattern(pattern as FilePathPattern, [locale]);
        results.push(...res);
      }
    }

    // Merge identical file paths if they stem from different locales having the same output path
    const grouped = results.reduce((acc, curr) => {
      const existing = acc.find((item) => item.filePath === curr.filePath);
      if (existing) {
        for (const loc of curr.localeList) {
          if (!existing.localeList.includes(loc)) {
            existing.localeList.push(loc);
          }
        }
        existing.isPerLocale = false;
      } else {
        acc.push(curr);
      }
      return acc;
    }, [] as FillData[]);

    return grouped;
  }

  // 2. Handle static string or function patterns
  if (typeof fillField === 'string' || typeof fillField === 'function') {
    return processPattern(fillField as FilePathPattern, localeList);
  }

  return [];
};
