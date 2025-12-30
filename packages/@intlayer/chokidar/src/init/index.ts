import { access, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  ANSIColors,
  colorize,
  colorizePath,
  logger,
  v,
  x,
} from '@intlayer/config';
import { initConfig } from '../initConfig';

/**
 * UTILITIES
 */
const rootDir = process.cwd();

// Helper to check if a file exists
const exists = async (filePath: string) => {
  try {
    await access(join(rootDir, filePath));
    return true;
  } catch {
    return false;
  }
};

// Helper to read a file
const readFileFromRoot = async (filePath: string) =>
  await readFile(join(rootDir, filePath), 'utf8');

// Helper to write a file
const writeFileToRoot = async (filePath: string, content: string) =>
  await writeFile(join(rootDir, filePath), content, 'utf8');

// Helper to parse JSON that may contain comments (tsconfig allows comments)
const parseJSONWithComments = (jsonString: string) => {
  // First, try parsing as-is (most tsconfig files don't have comments)
  try {
    return JSON.parse(jsonString);
  } catch {
    // If that fails, try stripping comments
    // Note: This simple approach removes comments line by line to avoid
    // matching glob patterns like /* and */ that appear in paths
  }

  // Process line by line to safely remove comments
  const lines = jsonString.split('\n');
  const cleanedLines = lines.map((line) => {
    // Track if we're inside a string
    let inString = false;
    let result = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      // Handle string boundaries (accounting for escaped quotes)
      if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
        inString = !inString;
        result += char;
        continue;
      }

      // If we're inside a string, keep the character
      if (inString) {
        result += char;
        continue;
      }

      // Check for single-line comment outside of strings
      if (char === '/' && nextChar === '/') {
        // Rest of line is a comment, stop here
        break;
      }

      // Check for multi-line comment start (/* ... */)
      // For simplicity, we only handle single-line /* */ comments here
      if (char === '/' && nextChar === '*') {
        const endIndex = line.indexOf('*/', i + 2);
        if (endIndex !== -1) {
          // Skip the comment
          i = endIndex + 1;
          continue;
        }
      }

      result += char;
    }

    return result;
  });

  return JSON.parse(cleanedLines.join('\n'));
};

// Helper to find all tsconfig files (tsconfig.json, tsconfig.*.json)
const findTsConfigFiles = async (): Promise<string[]> => {
  try {
    const files = await readdir(rootDir);

    return files.filter(
      (file) => file === 'tsconfig.json' || /^tsconfig\..+\.json$/.test(file)
    );
  } catch {
    return [];
  }
};

/**
 * MAIN LOGIC
 */

export const initIntlayer = async () => {
  logger(colorize('Checking Intlayer configuration...', ANSIColors.CYAN));

  // Check for package.json to ensure we are in a project root
  if (!(await exists('package.json'))) {
    logger(
      `${x} No ${colorizePath('package.json')} found. Please run this script from the project root.`,
      { level: 'error' }
    );
    process.exit(1);
  }

  // Check .gitignore
  const gitignorePath = '.gitignore';
  if (await exists(gitignorePath)) {
    const gitignoreContent = await readFileFromRoot(gitignorePath);

    if (!gitignoreContent.includes('intlayer')) {
      const newContent = `${gitignoreContent}\n# Intlayer\n.intlayer\n`;
      await writeFileToRoot(gitignorePath, newContent);
      logger(
        `${v} Added ${colorizePath('.intlayer')} to ${colorizePath(gitignorePath)}`
      );
    } else {
      logger(`${v} ${colorizePath(gitignorePath)} already includes .intlayer`);
    }
  }

  // Check TSConfigs
  // Find all tsconfig files (tsconfig.json, tsconfig.*.json)
  const tsConfigFiles = await findTsConfigFiles();

  let hasTsConfig = false;

  for (const fileName of tsConfigFiles) {
    if (await exists(fileName)) {
      hasTsConfig = true;
      try {
        const fileContent = await readFileFromRoot(fileName);
        const config = parseJSONWithComments(fileContent);
        const typeDefinition = '.intlayer/**/*.ts';

        // Check if include array exists - if not, skip (likely a solution-style tsconfig with references)
        let updated = false;
        if (!config.include) {
          // Skip tsconfig files without include array (e.g. solution-style configs with references)
        } else if (
          Array.isArray(config.include) &&
          !(config.include as string[]).some((patten: string) =>
            patten.includes('.intlayer')
          )
        ) {
          config.include.push(typeDefinition);
          updated = true;
        } else if (config.include.includes(typeDefinition)) {
          logger(
            `${v} ${colorizePath(fileName)} already includes intlayer types`
          );
        }

        if (updated) {
          // We write back using standard JSON stringify (comments will be lost, sadly)
          // If preserving comments is critical, a more complex parser/printer is needed.
          await writeFileToRoot(fileName, JSON.stringify(config, null, 2));
          logger(
            `${v} Updated ${colorizePath(fileName)} to include intlayer types`
          );
        }
      } catch {
        logger(
          `${x} Could not parse or update ${colorizePath(fileName)}. You may need to add ${colorizePath('.intlayer/types/**/*.ts')} manually.`,
          { level: 'warn' }
        );
      }
    }
  }

  // Initialize Intlayer configuration file
  const format = hasTsConfig ? 'intlayer.config.ts' : 'intlayer.config.mjs';
  await initConfig(format, rootDir);

  // Check Vite Config
  const viteConfigs = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'];

  for (const file of viteConfigs) {
    if (await exists(file)) {
      let content = await readFileFromRoot(file);

      if (!content.includes('vite-intlayer')) {
        const viteImport =
          "import { intlayer } from 'vite-intlayer'; // Add the plugin to the Vite plugin list";

        // Prepend the import
        content = `${viteImport}\n${content}`;
        await writeFileToRoot(file, content);
        logger(`${v} Injected import into ${colorizePath(file)}`);
      }
      break; // Stop after finding one vite config
    }
  }

  // Check Next Config
  const nextConfigs = ['next.config.js', 'next.config.mjs', 'next.config.ts'];

  for (const file of nextConfigs) {
    if (await exists(file)) {
      let content = await readFileFromRoot(file);

      if (!content.includes('next-intlayer')) {
        const nextImport =
          "import { withIntlayer } from 'next-intlayer'; // Add the plugin to the Next.js configuration";

        // Prepend the import
        content = `${nextImport}\n${content}`;
        await writeFileToRoot(file, content);
        logger(`${v} Injected import into ${colorizePath(file)}`);
      }
      break; // Stop after finding one next config
    }
  }

  logger(`${v} ${colorize('Intlayer init setup complete.', ANSIColors.GREEN)}`);
};
