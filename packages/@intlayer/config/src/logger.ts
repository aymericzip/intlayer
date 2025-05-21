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
  const prefix = details.config?.prefix ?? '';

  if (mode === 'disabled') return;

  if (details.isVerbose && mode !== 'verbose') return;

  const flatContent = [content].flat();

  if (details.level === 'debug') {
    return console.debug(prefix, ...flatContent);
  }

  if (details.level === 'info') {
    return console.info(prefix, ...flatContent);
  }

  if (details.level === 'warn') {
    return console.warn(prefix, ...flatContent);
  }

  if (details.level === 'error') {
    return console.error(prefix, ...flatContent);
  }

  console.log(prefix, ...flatContent);
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
