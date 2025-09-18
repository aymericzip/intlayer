import type { CustomIntlayerConfig } from './types/config';
import { Locales } from './types/locales';

export type Details = {
  isVerbose?: boolean;
  level?: 'info' | 'warn' | 'error' | 'debug';
  config?: CustomIntlayerConfig['log'];
};

export type Logger = (content: any, details?: Details) => void;

export const logger: Logger = (
  content,
  details = {
    isVerbose: false,
    level: undefined,
    config: { mode: 'default', prefix: '' },
  }
) => {
  const mode = details.config?.mode ?? 'default';
  const prefix = Boolean(details.config?.prefix)
    ? details.config?.prefix
    : undefined;

  if (mode === 'disabled') return;

  if (details.isVerbose && mode !== 'verbose') return;

  const flatContent = prefix ? [prefix, ...[content].flat()] : [content].flat();

  if (details.level === 'debug') {
    return console.debug(...flatContent);
  }

  if (details.level === 'info') {
    return console.info(...flatContent);
  }

  if (details.level === 'warn') {
    return console.warn(...flatContent);
  }

  if (details.level === 'error') {
    return console.error(...flatContent);
  }

  console.log(...flatContent);
};

export enum ANSIColors {
  RESET = '\x1b[0m',
  GREY = '\x1b[90m',
  GREY_DARK = '\x1b[90m',
  BLUE = '\x1b[34m',
  RED = '\x1b[31m',
  GREEN = '\x1b[32m',
  YELLOW = '\x1b[33m',
  MAGENTA = '\x1b[35m',
  CYAN = '\x1b[36m',
  WHITE = '\x1b[37m',
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

export const colorize = (s: string, color?: ANSIColors): string =>
  color ? `${color}${s}${ANSIColors.RESET}` : s;

export const colorizeLocales = (
  locales: Locales | Locales[],
  color = ANSIColors.GREEN
) =>
  [locales]
    .flat()
    .map((locale) => colorize(locale, color))
    .join(`, `);

export const colorizeKey = (
  keyPath: string | string[],
  color = ANSIColors.GREY
) =>
  [keyPath]
    .flat()
    .map((key) => colorize(key, color))
    .join(`, `);

export const colorizePath = (
  path: string | string[],
  color = ANSIColors.GREY
) =>
  [path]
    .flat()
    .map((p) => colorize(p, color))
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
    zero: ANSIColors.RESET,
    one: ANSIColors.RESET,
    two: ANSIColors.RESET,
    few: ANSIColors.RESET,
    many: ANSIColors.RESET,
    other: ANSIColors.RESET,
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
