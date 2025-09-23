/* --------------------------------------------------------------------------
 *  docs/tools/generateEntry.ts
 *
 *  Completely re-written generator that now produces *two* artefacts for every
 *  documentation category (blog, docs, frequent_questions, legal):
 *    1. A `<category>.entry.ts` file listing every markdown document and
 *       exposing a `localeRecord` that asynchronously reads its content for
 *       any locale.
 *    2. A `<category>.types.ts` file providing an exhaustive TypeScript type
 *       describing the front-matter metadata of every document for all
 *       locales.
 *
 *  The generator is invoked from the `prepare` script of the `docs` package
 *  and must therefore be 100 % deterministic.
 * ------------------------------------------------------------------------- */

import { localeMap } from '@intlayer/core';
import fg from 'fast-glob';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname } from 'path';
import prettier from 'prettier';
import { locales } from '../intlayer.config';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface CategoryConfig {
  /** camelCase identifier used in variable names */
  name: 'blog' | 'docs' | 'frequentQuestions' | 'legal';
  /** folder name on disk */
  dir: 'blog' | 'docs' | 'frequent_questions' | 'legal';
  /** constant exported from the generated entry file */
  constName: string;
  /** path to the generated entry file */
  entryFilePath: string;
}

const rootDir = process.cwd();

/* -------------------------------------------------------------------------- */
/*                               CONFIGURATION                                */
/* -------------------------------------------------------------------------- */

const categories: CategoryConfig[] = [
  {
    name: 'blog',
    dir: 'blog',
    constName: 'blogEntry',
    entryFilePath: './src/generated/blog.entry.ts',
  },
  {
    name: 'docs',
    dir: 'docs',
    constName: 'docsEntry',
    entryFilePath: './src/generated/docs.entry.ts',
  },
  {
    name: 'frequentQuestions',
    dir: 'frequent_questions',
    constName: 'frequentQuestionsEntry',
    entryFilePath: './src/generated/frequentQuestions.entry.ts',
  },
  {
    name: 'legal',
    dir: 'legal',
    constName: 'legalEntry',
    entryFilePath: './src/generated/legal.entry.ts',
  },
];

/* -------------------------------------------------------------------------- */
/*                      HELPERS – ENTRY FILES GENERATION                      */
/* -------------------------------------------------------------------------- */

const buildEntryContent = (
  { constName, dir }: CategoryConfig,
  englishFiles: string[]
): string => {
  const header = [
    `/* AUTO-GENERATED – DO NOT EDIT */`,
    `/* REGENERATE USING \`pnpm prepare\` */`,
    `import type { LocalesValues } from '@intlayer/config';`,
    `import { existsSync } from 'fs';`,
    `import { readFile } from 'fs/promises';`,
    `import { dirname, join } from 'path';`,
    `import { fileURLToPath } from 'url';`,
    ``,
    `const isESModule = typeof import.meta.url === 'string';`,
    `const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;`,
    ``,
    `const readLocale = (relativeAfterLocale: string, locale: LocalesValues): Promise<string> => {`,
    `  const target = join(dir, '../../../${dir}/' + locale + '/' + relativeAfterLocale);`,
    `  if (!existsSync(target)) {`,
    `    console.error('File not found: ' + target);`,
    `    return readFile(join(dir, '../../../${dir}/en/' + relativeAfterLocale), 'utf8');`,
    `  }`,
    `  return readFile(target, 'utf8');`,
    `};`,
    ``,
    `\nexport const ${constName} = {\n`,
  ].join('\n');

  const lines = englishFiles
    .sort()
    .map((file) => {
      const relativeAfterLocale = file.replace(`./${dir}/en/`, '');

      const localeList = localeMap(
        ({ locale }) =>
          `'${locale}': readLocale('${relativeAfterLocale}', '${locale}')`,
        locales
      );
      return `  '${file}': {${localeList.join(',')}} as unknown as Record<LocalesValues, Promise<string>>,`;
    })
    .join('');

  const footer = `} as const;\n`;
  return header + lines + footer;
};

/* -------------------------------------------------------------------------- */
/*                                    MAIN                                    */
/* -------------------------------------------------------------------------- */

const generate = async () => {
  console.log('🔄 Generating entry & type files…');

  for (const cfg of categories) {
    /* ----------------------------- entry file ------------------------------ */
    const englishPattern = `./${cfg.dir}/en/**/*.md`;
    const englishFiles = fg.sync(englishPattern);

    const entryContent = buildEntryContent(cfg, englishFiles);
    await mkdir(dirname(cfg.entryFilePath), { recursive: true });

    /* --------------------------- format with prettier -------------------------- */
    try {
      // Resolve Prettier configuration for the target file to ensure the
      // generated artefacts follow the workspace formatting rules.
      const resolvedPrettierConfig = await prettier.resolveConfig(
        cfg.entryFilePath
      );

      const formatted = await prettier.format(entryContent, {
        ...resolvedPrettierConfig,
        parser: 'typescript',
        filepath: cfg.entryFilePath,
      });

      const currentContent = await readFile(cfg.entryFilePath, 'utf-8');

      // If the file is different from the formatted version, write the formatted version
      if (formatted !== currentContent) {
        await writeFile(cfg.entryFilePath, formatted, 'utf-8');
        console.log(`✨ Formatted ${cfg.entryFilePath}`);
      }
    } catch (error) {
      console.warn(`⚠️ Failed to format ${cfg.entryFilePath}:`, error);
    }
  }

  console.log('🎉 Done!');
};

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
