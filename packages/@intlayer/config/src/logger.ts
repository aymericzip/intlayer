import type { CustomIntlayerConfig } from './types/config';

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

/**
 * The appLogger function takes the logger and merges it with the configuration from the intlayer config file.
 * It allows overriding the default configuration by passing a config object in the details parameter.
 * The configuration is merged with the default configuration from the intlayer config file.
 */
export const getAppLogger =
  (configuration?: CustomIntlayerConfig) => (content: any, details?: Details) =>
    logger(content, {
      ...(details ?? {}),
      config: { ...configuration?.log, ...(details?.config ?? {}) },
    });
