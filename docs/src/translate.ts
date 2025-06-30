import { translateDoc } from '@intlayer/cli';
import { getConfiguration, Locales } from '@intlayer/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AIOptions } from '../../packages/@intlayer/api/dist/types/types';
import { defaultLocale, locales } from '../intlayer.config';

// Fill the list of files to audit if you want to audit only a subset of the files
// If empty list is provided, the audit will run on all markdown files present in the /en folder
const DOC_PATTERN: string[] = [
  // './docs/en/**/*.md',
  // './blog/en/**/*.md',
  // './docs/en/**/express-intlayer/index.md',
];
const EXCLUDED_GLOB_PATTEN: string[] = [
  '**/node_modules/**',
  '**/dist/**',
  '**/src/**',
];

// Number of files to process simultaneously
const NB_SIMULTANEOUS_FILE_PROCESSED: number = 1;

const LOCALE_LIST_TO_TRANSLATE: Locales[] = locales.filter(
  // Include all locales except English
  // Change it to include your specific locales if you want to translate only a subset of the locale(s)
  (locale) => locale !== Locales.ENGLISH
);

const configuration = getConfiguration();

const customInstructions = readFileSync(
  join(process.cwd(), './src/prompts/CUSTOM_INSTRUCTIONS.md'),
  'utf-8'
);

translateDoc({
  excludedGlobPattern: EXCLUDED_GLOB_PATTEN,
  docPattern: DOC_PATTERN,
  locales: LOCALE_LIST_TO_TRANSLATE,
  baseLocale: defaultLocale,
  aiOptions: configuration.ai as AIOptions,
  nbSimultaneousFileProcessed: NB_SIMULTANEOUS_FILE_PROCESSED,
  customInstructions,
});
