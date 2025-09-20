import { formatLocale, formatPath } from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeKey,
  colorizeNumber,
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
} from '@intlayer/config';
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

  const missingTranslations = listMissingTranslations();

  const maxKeyColSize = missingTranslations
    .map((t) => ` - ${t.key}`)
    .reduce((max, t) => Math.max(max, t.length), 0);
  const maxLocalesColSize = missingTranslations
    .map((t) => formatLocale(t.locales, false))
    .reduce((max, t) => Math.max(max, t.length), 0);

  const formattedMissingTranslations = missingTranslations.map((translation) =>
    [
      colon(` - ${colorizeKey(translation.key)}`, {
        colSize: maxKeyColSize,
        maxSize: 40,
      }),
      ' - ',
      colon(formatLocale(translation.locales, ANSIColors.RED), {
        colSize: maxLocalesColSize,
        maxSize: 40,
      }),
      ' - ',
      translation.filePath ? formatPath(translation.filePath) : 'Remote',
    ].join('')
  );

  appLogger(`Missing translations:`, {
    level: 'info',
  });

  formattedMissingTranslations.forEach((t) => {
    appLogger(t, {
      level: 'info',
    });
  });

  const missingLocalesSet = new Set(
    missingTranslations.flatMap((t) => t.locales)
  );
  const missingLocales = Array.from(missingLocalesSet);

  appLogger(`Locales: ${formatLocale(locales)}`);
  appLogger(`Required locales: ${formatLocale(requiredLocales ?? locales)}`);
  appLogger(
    `Missing locales: ${missingLocales.length === 0 ? colorize('-', ANSIColors.GREEN) : formatLocale(missingLocales, ANSIColors.RED)}`
  );

  const missingRequiredLocales = missingLocales.filter((locale) =>
    (requiredLocales ?? locales).includes(locale)
  );

  appLogger(
    `Missing required locales: ${missingRequiredLocales.length === 0 ? colorize('-', ANSIColors.GREEN) : formatLocale(missingRequiredLocales, ANSIColors.RED)}`
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
