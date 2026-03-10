import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { extractContent, type PackageName } from '@intlayer/babel';
import { logConfigDetails } from '@intlayer/chokidar/cli';
import { colorizePath, getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import enquirer from 'enquirer';
import fg from 'fast-glob';

type ExtractOptions = {
  files?: string[];
  output?: FilePathPattern;
  configOptions?: GetConfigurationOptions;
  codeOnly?: boolean;
  declarationOnly?: boolean;
};

// Helper to read package.json dependencies
const getDependencies = async (baseDir: string) => {
  try {
    const packageJsonPath = resolve(baseDir, 'package.json');
    if (!existsSync(packageJsonPath)) {
      // Try parent directory if not found in baseDir
      return {};
    }
    const file = await readFile(packageJsonPath, 'utf8');
    const packageJSON = JSON.parse(file);

    return packageJSON.dependencies;
  } catch {
    return {};
  }
};

export const extract = async (options: ExtractOptions) => {
  const configuration = getConfiguration(options.configOptions);
  logConfigDetails(options?.configOptions);

  const appLogger = getAppLogger(configuration);
  const { baseDir, codeDir, excludedPath } = configuration.content;
  const { traversePattern } = configuration.build;

  const formatPath = (path: string) => {
    const relativePath = relative(baseDir, path);
    return colorizePath(relativePath);
  };

  // Detect package
  const dependencies = await getDependencies(baseDir);
  let packageName: PackageName = 'react-intlayer';

  if (dependencies['next-intlayer']) {
    packageName = 'next-intlayer';
  } else if (dependencies['vue-intlayer']) {
    packageName = 'vue-intlayer';
  } else if (dependencies['svelte-intlayer']) {
    packageName = 'svelte-intlayer';
  } else if (dependencies['react-intlayer']) {
    packageName = 'react-intlayer';
  } else if (dependencies['preact-intlayer']) {
    packageName = 'preact-intlayer';
  } else if (dependencies['solid-intlayer']) {
    packageName = 'solid-intlayer';
  } else if (dependencies['angular-intlayer']) {
    packageName = 'angular-intlayer';
  } else if (dependencies['express-intlayer']) {
    packageName = 'express-intlayer';
  }

  let filesToExtract = options.files ?? [];

  if (filesToExtract.length === 0) {
    // Filter out codeDirs that are themselves inside an excluded path (e.g. dist, node_modules)
    const isDirExcluded = (dirPath: string): boolean =>
      (excludedPath ?? []).some((pattern) => {
        const segments = pattern
          .split('/')
          .filter((s) => !s.includes('*') && s.length > 0);
        const parts = dirPath.split('/');
        return segments.some((seg) => parts.includes(seg));
      });

    // Await all promises simultaneously
    const resultsArray = await Promise.all(
      codeDir
        .filter((dir) => !isDirExcluded(dir))
        .map((dir) =>
          fg(traversePattern, {
            cwd: dir,
            ignore: excludedPath,
            absolute: true,
          })
        )
    );

    // Flatten the nested arrays and remove duplicates
    const allFiles = resultsArray.flat();

    const uniqueFiles = [...new Set(allFiles)].filter((file) =>
      existsSync(file)
    );

    // Relative paths for selection
    const choices = uniqueFiles.map((file) => {
      const relPath = relative(baseDir, file);
      return {
        value: file,
        label: relPath,
      };
    });

    if (choices.length === 0) {
      appLogger('No extractable files found in the project.');
      return;
    }

    const SELECT_ALL = '__select_all__';

    type PromptChoice = {
      name: string;
      enabled: boolean;
      disabled?: boolean | string;
    };

    type PromptContext = {
      choices: PromptChoice[];
      render(): void | Promise<void>;
      state: { submitted: boolean };
      selected: PromptChoice[];
      input: string;
      options: { multiple?: boolean };
    };

    let selectedFiles: string[] | symbol;
    try {
      const maxLen = Math.max((process.stdout.columns || 80) - 15, 20);
      const truncatePath = (path: string) =>
        path.length > maxLen ? `...${path.slice(-(maxLen - 3))}` : path;

      const { files: enquirerSelectedFiles } = await enquirer.prompt<{
        files: string[];
      }>({
        type: 'autocomplete',
        name: 'files',
        message: 'Select files to extract (Type to search):',
        multiple: true,
        // @ts-ignore limit exist but is not typed
        limit: 40,
        choices: [
          { name: SELECT_ALL, message: '────── Select all ──────' },
          ...choices.map((choice) => ({
            name: choice.value,
            message: truncatePath(choice.label),
          })),
        ],
        async toggle(
          this: PromptContext,
          choice: PromptChoice,
          enabled?: boolean
        ) {
          if (!choice || choice.disabled) return;
          choice.enabled = enabled == null ? !choice.enabled : enabled;

          if (choice.name === SELECT_ALL) {
            this.choices
              .filter((choiceEl) => choiceEl.name !== SELECT_ALL)
              .forEach((choiceEl) => {
                choiceEl.enabled = choice.enabled;
              });
          }

          return this.render();
        },
        format(this: PromptContext) {
          if (this.state?.submitted && this.options?.multiple) {
            return `${this.selected.filter((s) => s.name !== SELECT_ALL).length} file(s) selected`;
          }
          return this.input ?? '';
        },
      });

      selectedFiles = enquirerSelectedFiles.filter((f) => f !== SELECT_ALL);
    } catch {
      selectedFiles = Symbol('cancel');
    }

    if (typeof selectedFiles === 'symbol') {
      // User cancelled
      process.exit(0);
    }

    filesToExtract = selectedFiles as string[];
  }

  if (filesToExtract.length === 0) {
    appLogger('No files selected for extraction.');
    return;
  }

  const absoluteFiles = filesToExtract
    .map((file) => resolve(baseDir, file))
    .filter((file) => {
      if (!existsSync(file)) {
        appLogger(`File not found: ${formatPath(file)}`);
        return false;
      }
      return true;
    });

  if (absoluteFiles.length === 0) {
    return;
  }

  const unmergedDictionaries = getUnmergedDictionaries(configuration);

  await Promise.all(
    absoluteFiles.map(async (filePath) => {
      try {
        await extractContent(filePath, packageName, {
          unmergedDictionaries,
          configuration,
          output: options.output,
          codeOnly: options.codeOnly,
          declarationOnly: options.declarationOnly,
        });
      } catch (error) {
        appLogger(
          `Failed to transform ${filePath}: ${(error as Error).message}`
        );
      }
    })
  );
};
