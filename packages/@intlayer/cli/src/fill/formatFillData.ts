import { extname } from 'node:path';
import {
  getContentExtension,
  getFormatFromExtension,
} from '@intlayer/chokidar/utils';
import { resolveDictionaryPaths } from '@intlayer/config/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { DictionaryKey, Fill } from '@intlayer/types/dictionary';

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
  if (!fillField) return [];

  const { baseDir } = configuration.content;
  const { defaultLocale } = configuration.internationalization;

  const format = getFormatFromExtension(extname(fillField as string) as any);

  // Resolve all paths using the shared utility
  const resolvedPaths = await resolveDictionaryPaths({
    pattern: fillField as any, // resolveDictionaryPaths handles string/object/function
    dictionaryKey,
    sourceFilePath: filePath,
    baseDir,
    locales: localeList,
    defaultLocale,
    contentExtension: getContentExtension(format, configuration),
    format,
  });

  return resolvedPaths.map((resolved) => ({
    localeList: resolved.locales,
    filePath: resolved.filePath,
    isPerLocale: resolved.isPerLocale,
  }));
};
