#!/usr/bin/env bun
/**
 * Updates doc links across localized documentation so they point to the document's own locale.
 *
 * Example:
 * In docs/docs/ar/intlayer_with_angular_19.md:
 *   [Intlayer Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
 * becomes:
 *   [Intlayer Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
 *
 * Usage:
 *   bun tools/fixLocalizedLinks.ts
 *   bun tools/fixLocalizedLinks.ts --dry-run
 *   bun tools/fixLocalizedLinks.ts --locale ar
 *   bun tools/fixLocalizedLinks.ts --locale ar,fr,es
 *   bun tools/fixLocalizedLinks.ts --check-exists
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import fg from 'fast-glob';
import { EXCLUDED_GLOB_PATTEN } from './markdownFormatting';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DOCS_ROOT = join(__dirname, '..');

const DEFAULT_SECTIONS = ['docs', 'blog', 'frequent_questions', 'legal'];
const KNOWN_SECTIONS = new Set([
  'docs',
  'blog',
  'frequent_questions',
  'legal',
  'assets',
]);

export interface FixLocalizedLinksOptions {
  /** If true, write changes to files. Defaults to true unless dryRun is set */
  write?: boolean;
  /** Preview changes without writing to disk */
  dryRun?: boolean;
  /** Only process files for a specific locale (e.g. 'ar' or ['ar', 'fr']) */
  locale?: string | string[];
  /** Only update links if the target localized file exists on disk */
  checkExists?: boolean;
  /** Sections to process, defaults to ['docs', 'blog', 'frequent_questions', 'legal'] */
  sections?: string[];
  /** Verbose output */
  verbose?: boolean;
}

export interface FixLocalizedLinksResult {
  totalFilesProcessed: number;
  totalFilesModified: number;
  totalLinksUpdated: number;
  statsByLocale: Record<string, number>;
  modifiedFiles: string[];
}

/**
 * Pattern 1: Standard URL with section
 * https://github.com/aymericzip/intlayer/(blob|tree)/<branch>/docs/(docs|blog|frequent_questions|legal)/<locale>/<path.md>(#hash)?
 */
export const WITH_SECTION_REGEX =
  /https:\/\/github\.com\/aymericzip\/intlayer\/(blob|tree)\/([^/]+)\/docs\/(docs|blog|frequent_questions|legal)\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_./@+-]+\.md)((?:#[^\s)"'`>]*)?)/g;

/**
 * Pattern 2: Malformed URL missing section
 * https://github.com/aymericzip/intlayer/(blob|tree)/<branch>/docs/<locale>/<path.md>(#hash)?
 */
export const MISSING_SECTION_REGEX =
  /https:\/\/github\.com\/aymericzip\/intlayer\/(blob|tree)\/([^/]+)\/docs\/([a-zA-Z]{2}(?:-[a-zA-Z]{2,4})?)\/([a-zA-Z0-9_./@+-]+\.md)((?:#[^\s)"'`>]*)?)/g;

/**
 * Transforms doc links in content according to the file's locale and options.
 */
export const transformDocLinks = (
  content: string,
  fileRelPath: string,
  options?: FixLocalizedLinksOptions
): {
  newContent: string;
  replacements: number;
  details: Array<{ from: string; to: string }>;
} => {
  const parts = fileRelPath.split('/');
  const fileLocale = parts[1];
  const isReadme = fileRelPath.endsWith('readme.md');

  let replacements = 0;
  const details: Array<{ from: string; to: string }> = [];

  // Pattern 1: Links that have an explicit section
  let updated = content.replace(
    WITH_SECTION_REGEX,
    (
      fullMatch,
      gitMode,
      branch,
      targetSection,
      targetLocale,
      targetFilePath,
      hash
    ) => {
      // Preserve language switcher links in readme.md files
      if (isReadme && targetFilePath === 'readme.md') {
        return fullMatch;
      }

      // If locale already matches and mode is 'blob', no fix needed
      if (targetLocale === fileLocale && gitMode === 'blob') {
        return fullMatch;
      }

      // If checkExists is requested, verify target exists
      if (options?.checkExists) {
        const localTarget = join(
          DOCS_ROOT,
          targetSection,
          fileLocale,
          targetFilePath
        );
        if (!existsSync(localTarget)) {
          return fullMatch;
        }
      }

      const newUrl = `https://github.com/aymericzip/intlayer/blob/${branch}/docs/${targetSection}/${fileLocale}/${targetFilePath}${hash || ''}`;
      if (newUrl !== fullMatch) {
        replacements++;
        details.push({ from: fullMatch, to: newUrl });
        return newUrl;
      }

      return fullMatch;
    }
  );

  // Pattern 2: Links missing the section directory (e.g. docs/<locale>/<path.md>)
  updated = updated.replace(
    MISSING_SECTION_REGEX,
    (fullMatch, _gitMode, branch, targetLocale, targetFilePath, hash) => {
      // Skip if matched prefix is actually a section name or assets
      if (KNOWN_SECTIONS.has(targetLocale)) {
        return fullMatch;
      }

      // Preserve language switcher in readme.md
      if (isReadme && targetFilePath === 'readme.md') {
        return fullMatch;
      }

      // Determine the correct section (check docs vs blog)
      let targetSection = 'docs';
      if (
        existsSync(join(DOCS_ROOT, 'blog', fileLocale, targetFilePath)) &&
        !existsSync(join(DOCS_ROOT, 'docs', fileLocale, targetFilePath))
      ) {
        targetSection = 'blog';
      }

      if (options?.checkExists) {
        const localTarget = join(
          DOCS_ROOT,
          targetSection,
          fileLocale,
          targetFilePath
        );
        if (!existsSync(localTarget)) {
          return fullMatch;
        }
      }

      const newUrl = `https://github.com/aymericzip/intlayer/blob/${branch}/docs/${targetSection}/${fileLocale}/${targetFilePath}${hash || ''}`;
      if (newUrl !== fullMatch) {
        replacements++;
        details.push({ from: fullMatch, to: newUrl });
        return newUrl;
      }

      return fullMatch;
    }
  );

  return { newContent: updated, replacements, details };
};

/**
 * Main execution function to find and fix links across documentation.
 */
export const fixLocalizedLinks = (
  options: FixLocalizedLinksOptions = {}
): FixLocalizedLinksResult => {
  const isDryRun = Boolean(options.dryRun) || options.write === false;
  const sections = options.sections ?? DEFAULT_SECTIONS;

  let localeFilters: string[] | null = null;
  if (options.locale) {
    if (Array.isArray(options.locale)) {
      localeFilters = options.locale;
    } else {
      localeFilters = options.locale.split(',').map((l) => l.trim());
    }
  }

  const patterns = sections.map((sec) => `${sec}/*/**/*.md`);
  const files = fg.sync(patterns, {
    cwd: DOCS_ROOT,
    ignore: EXCLUDED_GLOB_PATTEN,
  });

  const result: FixLocalizedLinksResult = {
    totalFilesProcessed: 0,
    totalFilesModified: 0,
    totalLinksUpdated: 0,
    statsByLocale: {},
    modifiedFiles: [],
  };

  for (const relFile of files) {
    const parts = relFile.split('/');
    const fileLocale = parts[1];

    if (localeFilters && !localeFilters.includes(fileLocale)) {
      continue;
    }

    result.totalFilesProcessed++;

    const absPath = join(DOCS_ROOT, relFile);
    const content = readFileSync(absPath, 'utf-8');

    const { newContent, replacements, details } = transformDocLinks(
      content,
      relFile,
      options
    );

    if (replacements > 0) {
      result.totalFilesModified++;
      result.totalLinksUpdated += replacements;
      result.statsByLocale[fileLocale] =
        (result.statsByLocale[fileLocale] || 0) + replacements;
      result.modifiedFiles.push(relFile);

      if (options.verbose) {
        console.info(`\n${isDryRun ? '[DRY-RUN] ' : ''}File: ${relFile}`);
        for (const { from, to } of details) {
          console.info(`  - ${from}\n    -> ${to}`);
        }
      }

      if (!isDryRun) {
        writeFileSync(absPath, newContent, 'utf-8');
      }
    }
  }

  return result;
};

const printHelp = (): void => {
  console.info(`
fixLocalizedLinks - Updates GitHub doc links in translated files to match each document's locale

Usage:
  bun tools/fixLocalizedLinks.ts [options]

Options:
  --dry-run            Preview changes without writing to disk
  --write, -w          Write changes to files (default)
  --locale, -l <code   Filter by locale (e.g. --locale ar or -l ar,es,fr)
  --check-exists       Only update link if the localized file exists on disk
  --verbose, -v        Print every replaced link
  --help, -h           Show this help message
`);
};

if (import.meta.main) {
  const { values } = parseArgs({
    allowPositionals: true,
    options: {
      'dry-run': { type: 'boolean', default: false },
      write: { type: 'boolean', short: 'w', default: true },
      locale: { type: 'string', short: 'l' },
      'check-exists': { type: 'boolean', default: false },
      verbose: { type: 'boolean', short: 'v', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });

  if (values.help) {
    printHelp();
    process.exit(0);
  }

  const dryRun = Boolean(values['dry-run']);
  const write = !dryRun && Boolean(values.write);

  console.info(
    `Running fixLocalizedLinks (${dryRun ? 'DRY-RUN' : 'WRITE MODE'})...\n`
  );

  const res = fixLocalizedLinks({
    dryRun,
    write,
    locale: values.locale,
    checkExists: values['check-exists'],
    verbose: values.verbose,
  });

  console.info('\nSummary:');
  console.info(`- Total files scanned: ${res.totalFilesProcessed}`);
  console.info(
    `- Files ${dryRun ? 'to modify' : 'modified'}: ${res.totalFilesModified}`
  );
  console.info(
    `- Total links ${dryRun ? 'to update' : 'updated'}: ${res.totalLinksUpdated}`
  );
  console.info('\nUpdates by locale:');
  for (const [loc, count] of Object.entries(res.statsByLocale).sort(
    (a, b) => b[1] - a[1]
  )) {
    console.info(`  ${loc.padEnd(8)}: ${count}`);
  }
}
