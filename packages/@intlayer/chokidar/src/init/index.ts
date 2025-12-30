import {
  ANSIColors,
  colorize,
  colorizePath,
  logger,
  v,
  x,
} from '@intlayer/config';
import { initConfig } from '../initConfig';
import {
  exists,
  findTsConfigFiles,
  parseJSONWithComments,
  readFileFromRoot,
  writeFileToRoot,
} from './utils';

/**
 * MAIN LOGIC
 */

export const initIntlayer = async (rootDir: string) => {
  logger(colorize('Checking Intlayer configuration...', ANSIColors.CYAN));

  // Check for package.json to ensure we are in a project root
  if (!(await exists(rootDir, 'package.json'))) {
    logger(
      `${x} No ${colorizePath('package.json')} found. Please run this script from the project root.`,
      { level: 'error' }
    );
    process.exit(1);
  }

  // Check .gitignore
  const gitignorePath = '.gitignore';
  if (await exists(rootDir, gitignorePath)) {
    const gitignoreContent = await readFileFromRoot(rootDir, gitignorePath);

    if (!gitignoreContent.includes('intlayer')) {
      const newContent = `${gitignoreContent}\n# Intlayer\n.intlayer\n`;
      await writeFileToRoot(rootDir, gitignorePath, newContent);
      logger(
        `${v} Added ${colorizePath('.intlayer')} to ${colorizePath(gitignorePath)}`
      );
    } else {
      logger(`${v} ${colorizePath(gitignorePath)} already includes .intlayer`);
    }
  }

  // Check TSConfigs
  // Find all tsconfig files (tsconfig.json, tsconfig.*.json)
  const tsConfigFiles = await findTsConfigFiles(rootDir);

  let hasTsConfig = false;

  for (const fileName of tsConfigFiles) {
    if (await exists(rootDir, fileName)) {
      hasTsConfig = true;
      try {
        const fileContent = await readFileFromRoot(rootDir, fileName);
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
          await writeFileToRoot(
            rootDir,
            fileName,
            JSON.stringify(config, null, 2)
          );
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
    if (await exists(rootDir, file)) {
      let content = await readFileFromRoot(rootDir, file);

      if (!content.includes('vite-intlayer')) {
        const viteImport =
          "import { intlayer } from 'vite-intlayer'; // Add the plugin to the Vite plugin list";

        // Prepend the import
        content = `${viteImport}\n${content}`;
        await writeFileToRoot(rootDir, file, content);
        logger(`${v} Injected import into ${colorizePath(file)}`);
      }
      break; // Stop after finding one vite config
    }
  }

  // Check Next Config
  const nextConfigs = ['next.config.js', 'next.config.mjs', 'next.config.ts'];

  for (const file of nextConfigs) {
    if (await exists(rootDir, file)) {
      let content = await readFileFromRoot(rootDir, file);

      if (!content.includes('next-intlayer')) {
        const nextImport =
          "import { withIntlayer } from 'next-intlayer'; // Add the plugin to the Next.js configuration";

        // Prepend the import
        content = `${nextImport}\n${content}`;
        await writeFileToRoot(rootDir, file, content);
        logger(`${v} Injected import into ${colorizePath(file)}`);
      }
      break; // Stop after finding one next config
    }
  }

  logger(`${v} ${colorize('Intlayer init setup complete.', ANSIColors.GREEN)}`);
};
