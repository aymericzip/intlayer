import type { AIConfig, AIOptions } from '@intlayer/ai';
import type { ListGitFilesOptions } from '@intlayer/chokidar';
import type { GetConfigurationOptions } from '@intlayer/config';
import type { IntlayerConfig, Locale } from '@intlayer/types';
import type { AIClient } from '../utils/setupAI';

export type ErrorState = {
  count: number;
  maxErrors: number;
  shouldStop: boolean;
};

export type FlushStrategy = 'incremental' | 'end' | 'none';

// Define the Limit Function type (compatible with p-limit)
export type LimitFunction = (
  fn: () => Promise<any>,
  ...args: any[]
) => Promise<any>;

export type TranslateFileOptions = {
  baseFilePath: string;
  outputFilePath: string;
  locale: Locale;
  baseLocale: Locale;
  configuration: IntlayerConfig;
  errorState: ErrorState;
  aiOptions?: AIOptions;
  customInstructions?: string;
  aiClient?: AIClient;
  aiConfig?: AIConfig;
  flushStrategy?: FlushStrategy;
  onChunkReceive?: (chunk: string, index: number, total: number) => void;
  limit?: LimitFunction;
};

export type TranslateDocOptions = {
  docPattern: string[];
  locales: Locale[];
  excludedGlobPattern: string[];
  baseLocale: Locale;
  aiOptions?: AIOptions;
  nbSimultaneousFileProcessed?: number;
  configOptions?: GetConfigurationOptions;
  customInstructions?: string;
  skipIfModifiedBefore?: number | string | Date;
  skipIfModifiedAfter?: number | string | Date;
  skipIfExists?: boolean;
  gitOptions?: ListGitFilesOptions;
  flushStrategy?: FlushStrategy;
};
