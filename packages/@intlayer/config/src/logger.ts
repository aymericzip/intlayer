import type { Locale } from '@intlayer/types/allLocales';
import type {
  CustomIntlayerConfig,
  IntlayerConfig,
} from '@intlayer/types/config';
import type * as ANSIColorsTypes from './colors';
import { BEIGE, BLUE, GREEN, GREY, RED, RESET } from './colors';

export type ANSIColorsType =
  (typeof ANSIColorsTypes)[keyof typeof ANSIColorsTypes];

export type Details = {
  isVerbose?: boolean;
  level?: 'info' | 'warn' | 'error' | 'debug';
  config?: CustomIntlayerConfig['log'];
};

export type Logger = (content: any, details?: Details) => void;

let loggerPrefix: string | undefined;

export const setPrefix = (prefix: string | undefined) => {
  loggerPrefix = prefix;
};

export const getPrefix = (configPrefix?: string): string | undefined => {
  if (typeof loggerPrefix !== 'undefined') {
    return loggerPrefix;
  }

  return configPrefix;
};

export const logger: Logger = (content, details) => {
  const config = details?.config ?? {};
  const mode = config.mode ?? 'default';

  if (mode === 'disabled' || (details?.isVerbose && mode !== 'verbose')) return;

  const prefix = getPrefix(config.prefix);
  const flatContent = prefix ? [prefix, ...[content].flat()] : [content].flat();
  const level = details?.level ?? 'info';

  const logMethod =
    config[level] ?? console[level] ?? config.log ?? console.log;

  logMethod(...flatContent);
};

export const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

/**
 * The appLogger function takes the logger and merges it with the configuration from the intlayer config file.
 * It allows overriding the default configuration by passing a config object in the details parameter.
 * The configuration is merged with the default configuration from the intlayer config file.
 */
export const getAppLogger =
  (configuration?: IntlayerConfig, globalDetails?: Details) =>
  (content: any, details?: Details) =>
    logger(content, {
      ...(details ?? {}),
      config: {
        ...configuration?.log,
        ...globalDetails?.config,
        ...(details?.config ?? {}),
      },
    });

export const colorize = (
  string: string,
  color?: ANSIColorsType,
  reset?: boolean | ANSIColorsType
): string =>
  color
    ? `${color}${string}${reset ? (typeof reset === 'boolean' ? RESET : reset) : RESET}`
    : string;

export const colorizeLocales = (
  locales: Locale | Locale[],
  color: ANSIColorsType = GREEN,
  reset: boolean | ANSIColorsType = RESET
) =>
  [locales]
    .flat()
    .map((locale) => colorize(locale, color, reset))
    .join(`, `);

export const colorizeKey = (
  keyPath: string | string[],
  color: ANSIColorsType = BEIGE,
  reset: boolean | ANSIColorsType = RESET
) =>
  [keyPath]
    .flat()
    .map((key) => colorize(key, color, reset))
    .join(`, `);

export const colorizePath = (
  path: string | string[],
  color: ANSIColorsType = GREY,
  reset: boolean | ANSIColorsType = RESET
) =>
  [path]
    .flat()
    .map((path) => colorize(path, color, reset))
    .join(`, `);

export const colorizeNumber = (
  number: number | string,
  options: Partial<Record<Intl.LDMLPluralRule, ANSIColorsType>> = {
    zero: BLUE,
    one: BLUE,
    two: BLUE,
    few: BLUE,
    many: BLUE,
    other: BLUE,
  }
): string => {
  if (number === 0 || number === '0') {
    const color = options.zero ?? GREEN;
    return colorize(number.toString(), color);
  }

  // Kept inside the function. Top-level instantiation of classes/APIs
  // is treated as a side-effect and prevents tree-shaking if the function is unused.
  const rule = new Intl.PluralRules('en').select(Number(number));
  const color = options[rule];
  return colorize(number.toString(), color);
};

export const removeColor = (text: string) =>
  // biome-ignore lint/suspicious/noControlCharactersInRegex: we need to remove the color codes
  text.replace(/\x1b\[[0-9;]*m/g, '');

const getLength = (length: number | number[] | string | string[]): number => {
  let value: number = 0;
  if (typeof length === 'number') {
    value = length;
  }
  if (typeof length === 'string') {
    value = length.length;
  }
  if (
    Array.isArray(length) &&
    length.every((locale) => typeof locale === 'string')
  ) {
    value = Math.max(...length.map((str) => str.length));
  }
  if (
    Array.isArray(length) &&
    length.every((locale) => typeof locale === 'number')
  ) {
    value = Math.max(...length);
  }
  return Math.max(value, 0);
};

const defaultColonOptions = {
  colSize: 0,
  minSize: 0,
  maxSize: Infinity,
  pad: 'right',
  padChar: '0',
};

/**
 * Create a string of spaces of a given length.
 *
 * @param colSize - The length of the string to create.
 * @returns A string of spaces.
 */
export const colon = (
  text: string | string[],
  options?: {
    colSize?: number | number[] | string | string[];
    minSize?: number;
    maxSize?: number;
    pad?: 'left' | 'right';
    padChar?: string;
  }
): string =>
  [text]
    .flat()
    .map((text) => {
      const { colSize, minSize, maxSize, pad } = {
        ...defaultColonOptions,
        ...(options ?? {}),
      };

      const length = getLength(colSize);
      const spacesLength = Math.max(
        minSize!,
        Math.min(maxSize!, length - removeColor(text).length)
      );

      if (pad === 'left') {
        return `${' '.repeat(spacesLength)}${text}`;
      }

      return `${text}${' '.repeat(spacesLength)}`;
    })
    .join('');

export const x = colorize('✗', RED);
export const v = colorize('✓', GREEN);
export const clock = colorize('⏲', BLUE);
