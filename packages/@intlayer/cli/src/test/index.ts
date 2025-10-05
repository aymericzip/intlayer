import { formatLocale, formatPath, prepareIntlayer } from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeKey,
  colorizeNumber,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import { listMissingTranslations } from './listMissingTranslations';

export { listMissingTranslations };

type ListMissingTranslationsOptions = {
  configOptions?: GetConfigurationOptions;
  build?: boolean;
};

export const testMissingTranslations = async (
  options?: ListMissingTranslationsOptions
) => {
  const config = getConfiguration(options?.configOptions);
  const { locales, requiredLocales } = config.internationalization;

  const appLogger = getAppLogger(config, {
    config: {
      prefix: '',
    },
  });

  if (options?.build === true) {
    await prepareIntlayer(config, { forceRun: true });
  } else if (typeof options?.build === 'undefined') {
    await prepareIntlayer(config);
  }

  const result = listMissingTranslations(undefined, options?.configOptions);

  const maxKeyColSize = result.missingTranslations
    .map((t) => ` - ${t.key}`)
    .reduce((max, t) => Math.max(max, t.length), 0);
  const maxLocalesColSize = result.missingTranslations
    .map((t) => formatLocale(t.locales, false))
    .reduce((max, t) => Math.max(max, t.length), 0);

  const formattedMissingTranslations = result.missingTranslations.map(
    (translation) =>
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

  appLogger(`Locales: ${formatLocale(locales)}`);
  appLogger(`Required locales: ${formatLocale(requiredLocales ?? locales)}`);
  appLogger(
    `Missing locales: ${result.missingLocales.length === 0 ? colorize('-', ANSIColors.GREEN) : formatLocale(result.missingLocales, ANSIColors.RED)}`
  );

  appLogger(
    `Missing required locales: ${result.missingRequiredLocales.length === 0 ? colorize('-', ANSIColors.GREEN) : formatLocale(result.missingRequiredLocales, ANSIColors.RED)}`
  );
  appLogger(
    `Total missing locales: ${colorizeNumber(result.missingLocales.length, {
      one: ANSIColors.RED,
      other: ANSIColors.RED,
      zero: ANSIColors.GREEN,
    })}`
  );
  appLogger(
    `Total missing required locales: ${colorizeNumber(
      result.missingRequiredLocales.length,
      {
        one: ANSIColors.RED,
        other: ANSIColors.RED,
        zero: ANSIColors.GREEN,
      }
    )}`
  );
};
