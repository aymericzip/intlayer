import { relative } from 'node:path';
import configuration from '@intlayer/config/built';
import { ANSIColors, colorize, colorizePath } from '@intlayer/config/logger';
import { getLocaleName } from '@intlayer/core/localization';
import * as Locales from '@intlayer/types/locales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

export const formatPath = (
  path: string | string[],
  color?: ANSIColors | false
) =>
  [path]
    .flat()
    .map((path) =>
      path.startsWith('/') ? relative(configuration.system.baseDir, path) : path
    )
    .map((relativePath) =>
      color === false ? relativePath : colorizePath(relativePath, color)
    )
    .join(`, `);

export const formatLocale = (
  locale: LocalesValues | LocalesValues[],
  color: ANSIColors | false = ANSIColors.GREEN
) =>
  [locale]
    .flat()
    .map((locale) => `${getLocaleName(locale, Locales.ENGLISH)} (${locale})`)
    .map((text) => (color === false ? text : colorize(text, color)))
    .join(`, `);
