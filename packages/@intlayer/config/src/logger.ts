import type { CustomIntlayerConfig, Locale } from '@intlayer/types';

export type Details = {
  isVerbose?: boolean;
  level?: 'info' | 'warn' | 'error' | 'debug';
  config?: CustomIntlayerConfig['log'];
};

export type Logger = (content: any, details?: Details) => void;

export const logger: Logger = (content, details) => {
  const isVerbose = details?.isVerbose ?? false;
  const mode = details?.config?.mode ?? 'default';
  const level = details?.level ?? 'info';
  const prefix = details?.config?.prefix ? details?.config?.prefix : undefined;
  const log = details?.config?.log ?? console.log;
  const info = details?.config?.info ?? console.info;
  const warn = details?.config?.warn ?? console.warn;
  const error = details?.config?.error ?? console.error;
  const debug = details?.config?.debug ?? console.debug;

  if (mode === 'disabled') return;

  if (isVerbose && mode !== 'verbose') return;

  const flatContent = prefix ? [prefix, ...[content].flat()] : [content].flat();

  if (level === 'debug') {
    return debug(...flatContent);
  }

  if (level === 'info') {
    return info(...flatContent);
  }

  if (level === 'warn') {
    return warn(...flatContent);
  }

  if (level === 'error') {
    return error(...flatContent);
  }

  log(...flatContent);
};

export enum ANSIColors {
  RESET = '\x1b[0m',
  GREY = '\x1b[90m',
  GREY_DARK = '\x1b[38;5;239m',
  GREY_LIGHT = '\x1b[38;5;252m',
  BLUE = '\x1b[34m',
  RED = '\x1b[31m',
  GREEN = '\x1b[32m',
  YELLOW = '\x1b[38;5;226m',
  MAGENTA = '\x1b[35m',
  BEIGE = '\x1b[38;5;3m',
  ORANGE = '\x1b[38;5;208m',
  CYAN = '\x1b[36m',
  WHITE = '\x1b[37m',
  BOLD = '\x1b[1m',
}

export const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

/**
 * The appLogger function takes the logger and merges it with the configuration from the intlayer config file.
 * It allows overriding the default configuration by passing a config object in the details parameter.
 * The configuration is merged with the default configuration from the intlayer config file.
 */
export const getAppLogger =
  (configuration?: CustomIntlayerConfig, globalDetails?: Details) =>
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
  s: string,
  color?: ANSIColors,
  reset?: boolean | ANSIColors
): string =>
  color
    ? `${color}${s}${reset ? (typeof reset === 'boolean' ? ANSIColors.RESET : reset) : ANSIColors.RESET}`
    : s;

export const colorizeLocales = (
  locales: Locale | Locale[],
  color = ANSIColors.GREEN,
  reset: boolean | ANSIColors = ANSIColors.RESET
) =>
  [locales]
    .flat()
    .map((locale) => colorize(locale, color, reset))
    .join(`, `);

export const colorizeKey = (
  keyPath: string | string[],
  color = ANSIColors.BEIGE,
  reset: boolean | ANSIColors = ANSIColors.RESET
) =>
  [keyPath]
    .flat()
    .map((key) => colorize(key, color, reset))
    .join(`, `);

export const colorizePath = (
  path: string | string[],
  color = ANSIColors.GREY,
  reset: boolean | ANSIColors = ANSIColors.RESET
) =>
  [path]
    .flat()
    .map((p) => colorize(p, color, reset))
    .join(`, `);

/**
 * Colorize numeric value using Intl.NumberFormat and optional ANSI colors.
 *
 * Examples:
 *   colorizeNumber(2, [{ pluralRule: 'one' , color: ANSIColors.GREEN}, { pluralRule: 'other' , color: ANSIColors.RED}]) // "'\x1b[31m2\x1b[0m"
 */
export const colorizeNumber = (
  number: number,
  options: Partial<Record<Intl.LDMLPluralRule, ANSIColors>> = {
    zero: ANSIColors.BLUE,
    one: ANSIColors.BLUE,
    two: ANSIColors.BLUE,
    few: ANSIColors.BLUE,
    many: ANSIColors.BLUE,
    other: ANSIColors.BLUE,
  }
): string => {
  if (number === 0) {
    const color = options.zero ?? ANSIColors.GREEN;
    return colorize(number.toString(), color);
  }

  const rule = new Intl.PluralRules('en').select(number);
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
  if (Array.isArray(length) && length.every((l) => typeof l === 'string')) {
    value = Math.max(...length.map((str) => str.length));
  }
  if (Array.isArray(length) && length.every((l) => typeof l === 'number')) {
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
      const { colSize, minSize, maxSize, pad, padChar } = {
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

export const x = colorize('✗', ANSIColors.RED);
export const v = colorize('✓', ANSIColors.GREEN);
export const clock = colorize('⏲', ANSIColors.BLUE);
