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

import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { localeMap } from '@intlayer/core';
import * as fg from 'fast-glob';
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

/**
 * Format content using Biome CLI. Falls back to the original content if Biome
 * is unavailable or formatting fails for any reason.
 */
const formatWithBiome = async (
  content: string,
  filePathForConfig: string
): Promise<string> => {
  try {
    const child = spawn(
      'biome',
      ['format', '--stdin-file-path', filePathForConfig],
      {
        stdio: ['pipe', 'pipe', 'pipe'],
      }
    );

    let stdout = '';
    let stderr = '';

    if (child.stdout) {
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (chunk) => {
        stdout += chunk as string;
      });
    }

    if (child.stderr) {
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (chunk) => {
        stderr += chunk as string;
      });
    }

    const completion = new Promise<string>((resolve, reject) => {
      child.on('error', reject);
      child.on('close', (code) => {
        if (code === 0) {
          resolve(stdout);
        } else {
          reject(new Error(stderr || `biome exited with code ${code}`));
        }
      });
    });

    if (child.stdin) {
      child.stdin.write(content);
      child.stdin.end();
    }

    return await completion;
  } catch {
    return content;
  }
};

const buildEntryContent = (
  { constName, dir }: CategoryConfig,
  englishFiles: string[]
): string => {
  const header = [
    `/* AUTO-GENERATED – DO NOT EDIT */`,
    `/* REGENERATE USING \`pnpm prepare\` */`,
    `import { existsSync } from 'node:fs';`,
    `import { readFile } from 'node:fs/promises';`,
    `import { join } from 'node:path';`,
    `import { getPackageJsonPath, getProjectRequire } from '@intlayer/config';`,
    `import type { LocalesValues } from '@intlayer/types';`,
    ``,
    `const docEntryPath = getProjectRequire().resolve('@intlayer/docs');`,
    `const { baseDir } = getPackageJsonPath(docEntryPath);`,
    ``,
    `const readLocale = (relativeAfterLocale: string, locale: LocalesValues): Promise<string> => {`,
    `  const target1 = join(baseDir, \`./${dir}/\${locale}/\${relativeAfterLocale}\`);`,
    `  if (existsSync(target1)) {`,
    `    return readFile(target1, 'utf8');`,
    `  }`,
    `  const target2 = join(baseDir, \`./${dir}/en/\${relativeAfterLocale}\`);`,
    `  if (existsSync(target2)) {`,
    `    return readFile(target2, 'utf8');`,
    `  }`,
    ``,
    `  return Promise.reject(new Error(\`[docs] File not found: \${relativeAfterLocale} - locale: \${locale} - path: \${target1} - path: \${target2}\`));`,
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
          `\n    '${locale}': readLocale('${relativeAfterLocale}', '${locale}')`,
        locales
      );
      return `  '${file}': {${localeList.join(',')}\n  } as unknown as Record<LocalesValues, Promise<string>>,`;
    })
    .join('\n');

  const footer = `\n} as const;\n`;
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
    const englishFiles = fg.sync(englishPattern, {
      ignore: ['**/_*'],
    });

    const entryContent = buildEntryContent(cfg, englishFiles);
    await mkdir(dirname(cfg.entryFilePath), { recursive: true });

    /* ----------------------------- format with Biome ----------------------------- */
    const formattedEntryContent = await formatWithBiome(
      entryContent,
      cfg.entryFilePath
    );

    try {
      const currentContent = await readFile(cfg.entryFilePath, 'utf-8');
      if (currentContent !== formattedEntryContent) {
        await writeFile(cfg.entryFilePath, formattedEntryContent, 'utf-8');
        console.log(`✍️ Updated ${cfg.entryFilePath}`);
      }
    } catch {
      // No existing file – write it
      await writeFile(cfg.entryFilePath, formattedEntryContent, 'utf-8');
      console.log(`✍️ Created ${cfg.entryFilePath}`);
    }
  }

  console.log('🎉 Done!');
};

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
