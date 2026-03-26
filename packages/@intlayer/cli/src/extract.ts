import { existsSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import type { PackageName } from '@intlayer/babel';
import { prepareIntlayer } from '@intlayer/chokidar/build';
import { logConfigDetails } from '@intlayer/chokidar/cli';
import { buildComponentFilesList, formatPath } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger, x } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import enquirer from 'enquirer';

type ExtractOptions = {
  files?: string[];
  output?: FilePathPattern;
  configOptions?: GetConfigurationOptions;
  codeOnly?: boolean;
  declarationOnly?: boolean;
};

export const extract = async (options: ExtractOptions) => {
  const configuration = getConfiguration(options.configOptions);

  logConfigDetails(options?.configOptions);

  const appLogger = getAppLogger(configuration);

  const { baseDir } = configuration.system;
  const { output } = configuration.compiler;

  if (!output) {
    appLogger(
      `${x} No output configuration found. Add a ${colorize('compiler.output', ANSIColors.BLUE)} in your configuration.`,
      {
        level: 'error',
      }
    );
    return;
  }

  const { detectPackageName, extractContent } = await import('@intlayer/babel');

  // Detect package
  const packageName: PackageName = detectPackageName(baseDir);

  let filesToExtract = options.files ?? [];

  if (filesToExtract.length === 0) {
    // Await all promises simultaneously
    const fileList = buildComponentFilesList(configuration);

    // Flatten the nested arrays and remove duplicates
    // Relative paths for selection
    const choices = fileList.map((file) => {
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

      selectedFiles = enquirerSelectedFiles.filter(
        (file) => file !== SELECT_ALL
      );
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

  await prepareIntlayer(configuration); // Prepare Intlayer to apply the changes
};
