import { resolve } from 'node:path';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, Fill } from '@intlayer/types/dictionary';
import { formatFillData } from './formatFillData';

/**
 * Resolves `compiler.output` as the fill pattern of a per-locale dictionary
 * the compiler emitted, so `fill: true` writes each locale to its own file
 * (`/i18n/en/key.content.json` → `/i18n/fr/key.content.json`).
 *
 * Returns `undefined` when the output pattern does not vary per locale, or
 * did not produce this dictionary's file.
 */
export const getCompilerOutputFill = async (
  dictionary: Dictionary,
  configuration: IntlayerConfig
): Promise<Fill | undefined> => {
  const compilerOutput = configuration.compiler?.output;
  const { key, locale, filePath } = dictionary;

  if (
    !compilerOutput ||
    compilerOutput === true ||
    typeof locale !== 'string' ||
    !filePath
  ) {
    return undefined;
  }

  const [sourceFillData] = await formatFillData(
    compilerOutput,
    [locale as Locale],
    filePath,
    key,
    configuration
  );

  if (!sourceFillData?.isPerLocale) return undefined;

  const { baseDir } = configuration.system;
  const isCompilerOutputFile =
    resolve(baseDir, sourceFillData.filePath) === resolve(baseDir, filePath);

  return isCompilerOutputFile ? compilerOutput : undefined;
};
