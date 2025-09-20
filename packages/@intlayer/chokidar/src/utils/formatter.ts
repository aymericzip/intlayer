import { ANSIColors, colorize, colorizePath, Locales } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { getLocaleName } from 'intlayer';
import { relative } from 'path';

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
  locale: Locales | Locales[],
  color: ANSIColors | false = ANSIColors.GREEN
) =>
  [locale]
    .flat()
    .map((locale) => `${getLocaleName(locale, Locales.ENGLISH)} (${locale})`)
    .map((text) => (color === false ? text : colorize(text, color)))
    .join(`, `);
