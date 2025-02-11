import type { IntlayerConfig } from './types/config';

export type Details = {
  isVerbose?: boolean;
  level?: 'info' | 'warn' | 'error' | 'debug';
  config?: Partial<IntlayerConfig['log']>;
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

  if (details.level === 'debug') {
    return console.debug(`${prefix}${content}`);
  }

  if (details.level === 'info') {
    return console.info(`${prefix}${content}`);
  }

  if (details.level === 'warn') {
    return console.warn(`${prefix}${content}`);
  }

  if (details.level === 'error') {
    return console.error(`${prefix}${content}`);
  }

  console.log(`${prefix}${content}`);
};
