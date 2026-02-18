import {
  ANSIColors,
  colorize,
  colorizeKey,
  colorizePath,
  getAppLogger,
  x,
} from '@intlayer/config/client';
import { getContent } from '@intlayer/core/interpreter';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { formatLocale, formatPath } from './utils/formatter';

type IsInvalidDictionaryOptions = { checkSchema: boolean };

export const isInvalidDictionary = (
  dictionary: Dictionary | undefined,
  configuration?: IntlayerConfig,
  options?: IsInvalidDictionaryOptions
): boolean => {
  const appLogger = getAppLogger(configuration);

  if (!dictionary) return false;

  const isLocal = Boolean(
    dictionary.location === 'local' || typeof dictionary.filePath === 'string'
  );
  const location = isLocal ? 'Local' : 'Remote';
  const hasKey = Boolean(dictionary.key);
  const hasContent = Boolean(dictionary.content);

  if (!hasKey) {
    appLogger(`${location} dictionary has no key`, {
      level: 'error',
    });

    return false;
  }

  if (!hasContent) {
    appLogger(
      `${location} dictionary ${colorizeKey(dictionary.key)} has no content - ${dictionary.filePath ? formatPath(dictionary.filePath) : colorizePath('Remote')}`,
      {
        level: 'error',
      }
    );
    return false;
  }

  if (dictionary.schema && options?.checkSchema) {
    const isAsync =
      typeof dictionary.content === 'function' ||
      (typeof dictionary.content === 'object' &&
        dictionary.content !== null &&
        typeof (dictionary.content as any).then === 'function');

    if (!isAsync) {
      const locales = configuration?.internationalization?.locales ?? [];
      const isStrict =
        configuration?.internationalization.strictMode === 'strict';

      const schema =
        typeof dictionary.schema === 'string'
          ? configuration?.schemas?.[dictionary.schema]
          : undefined;

      if (schema && typeof schema.safeParse === 'function') {
        for (const locale of locales) {
          const resolvedContent = getContent(
            dictionary.content,
            {
              dictionaryKey: dictionary.key,
              keyPath: [],
            },
            locale,
            !isStrict
          );
          const result = (schema as any).safeParse(resolvedContent);

          if (!result.success) {
            appLogger(
              `${location} dictionary ${colorizeKey(dictionary.key)} has invalid content according to schema ${colorize(dictionary.schema as string, ANSIColors.ORANGE)} for locale ${formatLocale(locale)} - ${dictionary.filePath ? formatPath(dictionary.filePath) : colorizePath('Remote')}`,
              {
                level: 'error',
              }
            );

            result.error.issues.forEach((issue: any) => {
              appLogger(
                `${x} Error: ${colorizeKey(dictionary.key)} - ${formatLocale(locale)} - ${colorize(`${issue.path.join('.')}:`, ANSIColors.BLUE)} ${colorize(issue.message, ANSIColors.GREY)}`,
                {
                  level: 'error',
                }
              );
            });

            return false;
          }
        }
      }
    }
  }

  return true;
};

export const filterInvalidDictionaries = (
  dictionaries: (Dictionary | undefined)[] | undefined,
  configuration: IntlayerConfig,
  options?: IsInvalidDictionaryOptions
): Dictionary[] =>
  (dictionaries ?? [])?.filter((dictionary) =>
    isInvalidDictionary(dictionary, configuration, options)
  ) as Dictionary[];
