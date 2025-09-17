import {
  ANSIColors,
  colorize,
  colorizeLocales,
  colorizeNumber,
  colorizePath,
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
} from '@intlayer/config';
import { relative } from 'path';
import { listMissingTranslations } from './listMissingTranslations';

export { listMissingTranslations };

type ListMissingTranslationsOptions = {
  configOptions?: GetConfigurationOptions;
};

export const testMissingTranslations = (
  options?: ListMissingTranslationsOptions
) => {
  const config = getConfiguration(options?.configOptions);
  const { locales, requiredLocales } = config.internationalization;

  const appLogger = getAppLogger(config, {
    config: {
      prefix: '',
    },
  });
  const baseDir = config.content.baseDir;

  const missingTranslations = listMissingTranslations();

  const rows = missingTranslations.map((translation) => {
    const localesRaw = translation.locales.join(', ');
    const localesColored = colorizeLocales(translation.locales, ANSIColors.RED);
    const path = colorizePath(
      relative(baseDir, translation.filePath ?? 'Remote')
    );
    return { key: translation.key, localesRaw, localesColored, path };
  });

  const keyColWidth = rows.reduce((max, r) => Math.max(max, r.key.length), 0);
  const localesColWidth = rows.reduce(
    (max, r) => Math.max(max, r.localesRaw.length),
    0
  );

  const formattedMissingTranslations = rows.map((r) => {
    const keyPadded = r.key.padEnd(keyColWidth, ' ');
    const localesPadding = ' '.repeat(localesColWidth - r.localesRaw.length);
    return ` - ${keyPadded} - ${r.localesColored}${localesPadding} - ${r.path}`;
  });

  appLogger(
    `Missing translations:\n${formattedMissingTranslations.join('\n')}`,
    {
      level: 'info',
    }
  );

  const missingLocalesSet = new Set(
    missingTranslations.flatMap((t) => t.locales)
  );
  const missingLocales = Array.from(missingLocalesSet);

  appLogger(`Locales: ${colorizeLocales(locales)}`);
  appLogger(`Required locales: ${colorizeLocales(requiredLocales ?? locales)}`);
  appLogger(
    `Missing locales: ${missingLocales.length === 0 ? colorize('-', ANSIColors.GREEN) : colorizeLocales(missingLocales, ANSIColors.RED)}`
  );

  const missingRequiredLocales = missingLocales.filter((locale) =>
    (requiredLocales ?? locales).includes(locale)
  );

  appLogger(
    `Missing required locales: ${missingRequiredLocales.length === 0 ? colorize('-', ANSIColors.GREEN) : colorizeLocales(missingRequiredLocales, ANSIColors.RED)}`
  );
  appLogger(
    `Total missing locales: ${colorizeNumber(missingLocales.length, {
      other: ANSIColors.RED,
      zero: ANSIColors.GREEN,
    })}`
  );
  appLogger(
    `Total missing required locales: ${colorizeNumber(
      missingRequiredLocales.length,
      {
        other: ANSIColors.RED,
        zero: ANSIColors.GREEN,
      }
    )}`
  );
};
