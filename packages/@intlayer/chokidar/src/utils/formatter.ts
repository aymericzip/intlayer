import { relative } from 'node:path';
import { ANSIColors, colorize, colorizePath } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { getLocaleName } from '@intlayer/core';
import { Locales, type LocalesValues } from '@intlayer/types';

export const formatPath = (
  path: string | string[],
  color?: ANSIColors | false
) =>
  [path]
    .flat()
    .map((path) =>
      path.startsWith('/')
        ? relative(configuration.content.baseDir, path)
        : path
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
