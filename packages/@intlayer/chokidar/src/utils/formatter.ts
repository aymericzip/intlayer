import { relative } from 'node:path';
import { system } from '@intlayer/config/built';
import * as ANSIColors from '@intlayer/config/colors';
import {
  type ANSIColorsType,
  colorize,
  colorizePath,
} from '@intlayer/config/logger';
import { getLocaleName } from '@intlayer/core/localization';
import { ENGLISH } from '@intlayer/types/locales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

export const formatPath = (
  path: string | string[],
  color?: ANSIColorsType | false
) =>
  [path]
    .flat()
    .map((path) =>
      path.startsWith('/') ? relative(system.baseDir, path) : path
    )
    .map((relativePath) =>
      color === false ? relativePath : colorizePath(relativePath, color)
    )
    .join(`, `);

export const formatLocale = (
  locale: LocalesValues | LocalesValues[],
  color: ANSIColorsType | false = ANSIColors.GREEN
) =>
  [locale]
    .flat()
    .map((locale) => `${getLocaleName(locale, ENGLISH)} (${locale})`)
    .map((text) => (color === false ? text : colorize(text, color)))
    .join(`, `);
