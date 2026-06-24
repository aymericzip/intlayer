import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { AIOptions } from '@intlayer/api';
import { type ListGitFilesOptions, reviewDoc } from '@intlayer/cli';
import { getConfiguration } from '@intlayer/config/node';
import type { Locale } from '@intlayer/types/allLocales';
import * as Locales from '@intlayer/types/locales';
import { defaultLocale, locales } from '../intlayer.config';

// Fill the list of files to audit if you want to audit only a subset of the files
// If empty list is provided, the audit will run on all markdown files present in the /en folder
const DOC_PATTERN: string[] = [
  './docs/docs/en/**/*.md',
  './docs/blog/en/**/*.md',
  './docs/frequent_questions/en/**/*.md',
  './docs/legal/en/**/*.md',
];
const EXCLUDED_GLOB_PATTEN: string[] = [
  '**/_*',
  '**/node_modules/**',
  '**/dist/**',
  '**/src/**',
];

const LOG_ONLY = true; // If false it gonna generate translations // NEVER TOUCH IT

// Number of files to process simultaneously
const NB_SIMULTANEOUS_FILE_PROCESSED: number = 1;

const LOCALE_LIST_TO_TRANSLATE: Locale[] = locales.filter(
  // Include all locales except English
  // Change it to include your specific locales if you want to translate only a subset of the locale(s)
  (locale) => locale === Locales.FRENCH
);

const SKIP_IF_MODIFIED_BEFORE: number | undefined = undefined; //1000 * 60 * 60 * 24; // 1 day ago
const SKIP_IF_MODIFIED_AFTER: number | undefined = undefined;

const GIT_OPTIONS: ListGitFilesOptions | undefined = {
  mode: ['uncommitted', 'unpushed'],
};

const configuration = getConfiguration();

const customInstructions = readFileSync(
  join(process.cwd(), './docs/tools/prompts/CUSTOM_INSTRUCTIONS.md'),
  'utf-8'
);

reviewDoc({
  excludedGlobPattern: EXCLUDED_GLOB_PATTEN,
  docPattern: DOC_PATTERN,
  locales: LOCALE_LIST_TO_TRANSLATE,
  baseLocale: defaultLocale,
  aiOptions: configuration.ai as AIOptions,
  nbSimultaneousFileProcessed: NB_SIMULTANEOUS_FILE_PROCESSED,
  customInstructions,
  // skipIfModifiedBefore: SKIP_IF_MODIFIED_BEFORE,
  // skipIfModifiedAfter: SKIP_IF_MODIFIED_AFTER,
  // gitOptions: GIT_OPTIONS,
  log: LOG_ONLY,
});
