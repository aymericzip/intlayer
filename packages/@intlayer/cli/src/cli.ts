import type { AIOptions as BaseAIOptions } from '@intlayer/api';
import type { GetConfigurationOptions } from '@intlayer/config';
import configuration from '@intlayer/config/built';
import { Command } from 'commander';
import { dirname as pathDirname } from 'path';
import { fileURLToPath } from 'url';
import {
  DiffMode,
  ListGitFilesOptions,
} from '../../chokidar/dist/types/listGitFiles';
import { build } from './build';
import { getConfig } from './config';
import { fill, FillOptions } from './fill';
import { listContentDeclaration } from './listContentDeclaration';
import { liveSync } from './liveSync';
import { pull } from './pull';
import { push } from './push';
import { pushConfig } from './pushConfig';
import { reviewDoc } from './reviewDoc';
import { translateDoc } from './translateDoc';
import { getParentPackageJSON } from './utils/getParentPackageJSON';

// Extended AI options to include customPrompt
type AIOptions = BaseAIOptions & {
  customPrompt?: string;
};

const isESModule = typeof import.meta.url === 'string';

export const dirname = isESModule
  ? pathDirname(fileURLToPath(import.meta.url))
  : __dirname;

const packageJson = getParentPackageJSON(dirname);

const logOptions = [
  ['--verbose', 'Verbose'],
  ['--prefix [prefix]', 'Prefix'],
];

const configurationOptions = [
  ['--env-file [envFile]', 'Environment file'],
  ['-e, --env [env]', 'Environment'],
  ['--base-dir [baseDir]', 'Base directory'],
  ...logOptions,
];

const aiOptions = [
  ['--provider [provider]', 'Provider'],
  ['--temperature [temperature]', 'Temperature'],
  ['--model [model]', 'Model'],
  ['--api-key [apiKey]', 'Provider API key'],
  ['--custom-prompt [prompt]', 'Custom prompt'],
  ['--application-context [applicationContext]', 'Application context'],
];

const gitOptions = [
  ['--git-diff [gitDiff]', 'Git diff mode - Check git diff between two refs'],
  ['--git-diff-base [gitDiffBase]', 'Git diff base ref'],
  ['--git-diff-current [gitDiffCurrent]', 'Git diff current ref'],
  ['--uncommitted [uncommitted]', 'Uncommitted'],
  ['--unpushed [unpushed]', 'Unpushed'],
  ['--untracked [untracked]', 'Untracked'],
];

const extractKeysFromOptions = (options: object, keys: string[]) =>
  keys.filter((key) => options[key as keyof typeof options]);

/**
 * Helper functions to apply common options to commands
 */
const applyOptions = (command: Command, options: string[][]) => {
  options.forEach(([flag, description]) => command.option(flag, description));
  return command;
};

const removeUndefined = <T extends Record<string, any>>(obj: T): T =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  ) as T;

const applyConfigOptions = (command: Command) =>
  applyOptions(command, configurationOptions);
const applyAIOptions = (command: Command) => applyOptions(command, aiOptions);
const applyGitOptions = (command: Command) => applyOptions(command, gitOptions);

const extractAiOptions = (options: AIOptions): AIOptions | undefined => {
  const {
    apiKey,
    provider,
    model,
    temperature,
    applicationContext,
    customPrompt,
  } = options;

  return removeUndefined({
    apiKey: apiKey ?? configuration.ai?.apiKey,
    provider: provider ?? (configuration.ai?.provider as AIOptions['provider']),
    model: model ?? configuration.ai?.model,
    temperature: temperature ?? configuration.ai?.temperature,
    applicationContext:
      applicationContext ?? configuration.ai?.applicationContext,
    customPrompt: customPrompt ?? (configuration.ai as any)?.customPrompt,
  });
};

type GitOptions = {
  gitDiff?: boolean;
  gitDiffBase?: string;
  gitDiffCurrent?: string;
  uncommitted?: boolean;
  unpushed?: boolean;
  untracked?: boolean;
};

const gitOptionKeys: (keyof GitOptions)[] = [
  'gitDiff',
  'gitDiffBase',
  'gitDiffCurrent',
  'uncommitted',
  'unpushed',
  'untracked',
];

const extractGitOptions = (
  options: GitOptions
): ListGitFilesOptions | undefined => {
  const filteredOptions = extractKeysFromOptions(options, gitOptionKeys);

  const isOptionEmpty = !Object.values(filteredOptions).some(Boolean);

  if (isOptionEmpty) return undefined;

  const {
    gitDiff,
    gitDiffBase,
    gitDiffCurrent,
    uncommitted,
    unpushed,
    untracked,
  } = options;

  const mode = [
    gitDiff && 'gitDiff',
    uncommitted && 'uncommitted',
    unpushed && 'unpushed',
    untracked && 'untracked',
  ].filter(Boolean) as DiffMode[];

  return removeUndefined({
    mode,
    baseRef: gitDiffBase,
    currentRef: gitDiffCurrent,
    absolute: true,
  });
};

type LogOptions = {
  prefix?: string;
  verbose?: boolean;
};

export type ConfigurationOptions = {
  baseDir?: string;
  env?: string;
  envFile?: string;
} & LogOptions;

const configurationOptionKeys: (keyof ConfigurationOptions)[] = [
  'baseDir',
  'env',
  'envFile',
  'verbose',
  'prefix',
];

const extractConfigOptions = (
  options: ConfigurationOptions
): GetConfigurationOptions | undefined => {
  const filteredOptions = extractKeysFromOptions(
    options,
    configurationOptionKeys
  );

  const isOptionEmpty = !Object.values(filteredOptions).some(Boolean);

  if (isOptionEmpty) {
    return undefined;
  }

  const { baseDir, env, envFile, verbose, prefix } = options;

  const log = {
    prefix: prefix ?? '', // Should not consider the prefix set in the intlayer configuration file
    verbose,
  };

  const override = {
    log,
  };

  return removeUndefined({
    baseDir,
    env,
    envFile,
    override,
  });
};

/**
 * Set the API for the CLI
 *
 * Example of commands:
 *
 * npm run intlayer build --watch
 * npm run intlayer push --dictionaries id1 id2 id3 --deleteLocaleDir
 */
export const setAPI = (): Command => {
  const program = new Command();

  program.version(packageJson.version!).description('Intlayer CLI');

  /**
   * DICTIONARIES
   */

  const dictionariesProgram = program
    .command('dictionary')
    .alias('dictionaries')
    .alias('dic')
    .description('Dictionaries operations');

  // Dictionary build command
  const buildOptions = {
    description: 'Build the dictionaries',
    options: [['-w, --watch', 'Watch for changes']],
  };

  // Add build command to dictionaries program
  const dictionariesBuildCmd = dictionariesProgram
    .command('build')
    .description(buildOptions.description);

  applyOptions(dictionariesBuildCmd, buildOptions.options);
  applyConfigOptions(dictionariesBuildCmd);
  dictionariesBuildCmd.action((options) => {
    build({
      ...options,
      configOptions: extractConfigOptions(options),
    });
  });

  // Add build command to root program as well
  const rootBuildCmd = program
    .command('build')
    .description(buildOptions.description);

  applyOptions(rootBuildCmd, buildOptions.options);
  applyConfigOptions(rootBuildCmd);
  rootBuildCmd.action((options) => {
    build({
      ...options,
      configOptions: extractConfigOptions(options),
    });
  });

  // Dictionary pull command
  const pullOptions = {
    description: 'Pull dictionaries from the server',
    options: [
      ['-d, --dictionaries [ids...]', 'List of dictionary IDs to pull'],
      ['--new-dictionaries-path [path]', 'Path to save the new dictionaries'],
    ],
  };

  // Add pull command to dictionaries program
  const dictionariesPullCmd = dictionariesProgram
    .command('pull')
    .description(pullOptions.description);

  applyOptions(dictionariesPullCmd, pullOptions.options);
  applyConfigOptions(dictionariesPullCmd);
  dictionariesPullCmd.action((options) => {
    pull({
      ...options,
      configOptions: {
        ...options.configOptions,
        baseDir: options.baseDir,
      },
    });
  });

  // Add pull command to root program as well
  const rootPullCmd = program
    .command('pull')
    .description(pullOptions.description);

  applyOptions(rootPullCmd, pullOptions.options);
  applyConfigOptions(rootPullCmd);
  rootPullCmd.action((options) => {
    pull({
      ...options,
      configOptions: extractConfigOptions(options),
    });
  });

  // Dictionary push command
  const pushOptions = {
    description:
      'Push all dictionaries. Create or update the pushed dictionaries',
    options: [
      ['-d, --dictionaries [ids...]', 'List of dictionary IDs to push'],
      [
        '-r, --delete-locale-dictionary',
        'Delete the local dictionaries after pushing',
      ],
      [
        '-k, --keep-locale-dictionary',
        'Keep the local dictionaries after pushing',
      ],
    ],
  };

  // Add push command to dictionaries program
  const dictionariesPushCmd = dictionariesProgram
    .command('push')
    .description(pushOptions.description);

  applyOptions(dictionariesPushCmd, pushOptions.options);
  applyConfigOptions(dictionariesPushCmd);
  applyGitOptions(dictionariesPushCmd);

  dictionariesPushCmd.action((options) =>
    push({
      ...options,
      gitOptions: extractGitOptions(options),
      configOptions: extractConfigOptions(options),
    } as FillOptions)
  );

  // Add push command to root program as well
  const rootPushCmd = program
    .command('push')
    .description(pushOptions.description);

  applyOptions(rootPushCmd, pushOptions.options);
  applyConfigOptions(rootPushCmd);
  applyGitOptions(rootPushCmd);

  rootPushCmd.action((options) =>
    push({
      ...options,
      gitOptions: extractGitOptions(options),
      configOptions: extractConfigOptions(options),
    } as FillOptions)
  );

  /**
   * CONFIGURATION
   */

  // Define the parent command
  const configurationProgram = program
    .command('configuration')
    .alias('config')
    .alias('conf')
    .description('Configuration operations');

  const configGetCmd = configurationProgram
    .command('get')
    .description('Get the configuration');

  applyConfigOptions(configGetCmd);
  configGetCmd.action((options) => {
    getConfig({
      ...options,
      configOptions: extractConfigOptions(options),
    });
  });

  // Define the `push config` subcommand and add it to the `push` command
  const configPushCmd = configurationProgram
    .command('push')
    .description('Push the configuration');

  applyConfigOptions(configPushCmd);
  configPushCmd.action((options) => {
    pushConfig({
      ...options,
      configOptions: extractConfigOptions(options),
    });
  });

  /**
   * CONTENT DECLARATION
   */

  program
    .command('content list')
    .description('List the content declaration files')
    .action(listContentDeclaration);

  const fillProgram = program
    .command('fill')
    .description('Fill the dictionaries')
    .option('-f, --file [files...]', 'List of Dictionary files to fill')
    .option('--source-locale [sourceLocale]', 'Source locale to translate from')
    .option(
      '--output-locales [outputLocales...]',
      'Target locales to translate to'
    )
    .option(
      '--mode [mode]',
      'Fill mode: complete, review. Complete will fill all missing content, review will fill missing content and review existing keys',
      'review'
    )
    .option('-k, --keys [keys...]', 'Filter dictionaries based on keys')
    .option(
      '--excluded-keys [excludedKeys...]',
      'Filter out dictionaries based on keys'
    )
    .option(
      '--path-filter [pathFilters...]',
      'Filter dictionaries based on glob pattern'
    );

  applyConfigOptions(fillProgram);
  applyAIOptions(fillProgram);
  applyGitOptions(fillProgram);

  fillProgram.action((options) =>
    fill({
      ...options,
      aiOptions: extractAiOptions(options),
      gitOptions: extractGitOptions(options),
      configOptions: extractConfigOptions(options),
    } as FillOptions)
  );

  /**
   * DOCS
   */

  const docParams = [
    ['--doc-pattern [docPattern...]', 'Documentation pattern'],
    [
      '--excluded-glob-pattern [excludedGlobPattern...]',
      'Excluded glob pattern',
    ],
    [
      '--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]',
      'Number of simultaneous file processed',
    ],
    ['--locales [locales...]', 'Locales'],
    ['--base-locale [baseLocale]', 'Base locale'],
    [
      '--custom-instructions [customInstructions]',
      'Custom instructions added to the prompt. Usefull to apply specific rules regarding formatting, urls translation, etc.',
    ],
    [
      '--skip-if-modified-before [skipIfModifiedBefore]',
      'Skip the file if it has been modified before the given time. Can be an absolute time as "2025-12-05" (string or Date) or a relative time in ms `1 * 60 * 60 * 1000` (1 hour). This option check update time of the file using the `fs.stat` method. So it could be impacted by Git or other tools that modify the file.',
    ],
    [
      '--skip-if-modified-after [skipIfModifiedAfter]',
      'Skip the file if it has been modified within the given time. Can be an absolute time as "2025-12-05" (string or Date) or a relative time in ms `1 * 60 * 60 * 1000` (1 hour). This option check update time of the file using the `fs.stat` method. So it could be impacted by Git or other tools that modify the file.',
    ],
  ];

  const docProgram = program
    .command('doc')
    .description('Documentation operations');

  const translateProgram = docProgram
    .command('translate')
    .description('Translate the documentation');

  applyConfigOptions(translateProgram);
  applyAIOptions(translateProgram);
  applyGitOptions(translateProgram);
  applyOptions(translateProgram, docParams);

  translateProgram.action((options) =>
    translateDoc({
      docPattern: options.docPattern,
      excludedGlobPattern: options.excludedGlobPattern,
      locales: options.locales,
      baseLocale: options.baseLocale,
      aiOptions: extractAiOptions(options),
      gitOptions: extractGitOptions(options),
      nbSimultaneousFileProcessed: options.nbSimultaneousFileProcessed,
      configOptions: extractConfigOptions(options),
      customInstructions: options.customInstructions,
      skipIfModifiedBefore: options.skipIfModifiedBefore,
      skipIfModifiedAfter: options.skipIfModifiedAfter,
    })
  );

  const reviewProgram = docProgram
    .command('review')
    .description('Review the documentation');

  applyConfigOptions(reviewProgram);
  applyAIOptions(reviewProgram);
  applyGitOptions(reviewProgram);
  applyOptions(reviewProgram, docParams);

  reviewProgram.action((options) =>
    reviewDoc({
      docPattern: options.docPattern,
      excludedGlobPattern: options.excludedGlobPattern,
      locales: options.locales,
      baseLocale: options.baseLocale,
      aiOptions: extractAiOptions(options),
      gitOptions: extractGitOptions(options),
      nbSimultaneousFileProcessed: options.nbSimultaneousFileProcessed,
      configOptions: extractConfigOptions(options),
      customInstructions: options.customInstructions,
      skipIfModifiedBefore: options.skipIfModifiedBefore,
      skipIfModifiedAfter: options.skipIfModifiedAfter,
    })
  );

  /**
   * LIVE SYNC
   */

  const liveOptions = [
    ['--process [process]', 'Start command in parallel with the live sync'],
  ];

  const liveCmd = program
    .command('live')
    .description(
      'Live sync - Watch for changes made on the CMS and update the application content accordingly'
    );

  applyOptions(liveCmd, liveOptions);

  liveCmd.action((options) => liveSync(options));

  program.parse(process.argv);

  return program;
};
