import { dirname as pathDirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AIOptions as BaseAIOptions } from '@intlayer/api';
import type { GetConfigurationOptions } from '@intlayer/config';
import { getConfiguration } from '@intlayer/config';
import { Command } from 'commander';
import type {
  DiffMode,
  ListGitFilesOptions,
} from '../../chokidar/dist/types/listGitFiles';
import { build } from './build';
import { getConfig } from './config';
import { startEditor } from './editor';
import { type FillOptions, fill } from './fill/fill';
import { listContentDeclaration } from './listContentDeclaration';
import { liveSync } from './liveSync';
import { pull } from './pull';
import { push } from './push/push';
import { pushConfig } from './pushConfig';
import { reviewDoc } from './reviewDoc';
import { testMissingTranslations } from './test';
import { transform } from './transform';
import { translateDoc } from './translateDoc';
import { getParentPackageJSON } from './utils/getParentPackageJSON';
import { watchContentDeclaration } from './watch';

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
  ['--verbose', 'Verbose (default to true using CLI)'],
  ['--prefix [prefix]', 'Prefix'],
];

const configurationOptions = [
  ['--env-file [envFile]', 'Environment file'],
  ['-e, --env [env]', 'Environment'],
  ['--base-dir [baseDir]', 'Base directory'],
  ['--no-cache [noCache]', 'No cache'],
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
  options.forEach(([flag, description]) => {
    command.option(flag, description);
  });
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

  const configuration = getConfiguration();

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
  noCache?: boolean;
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
  const configuration = getConfiguration(options);
  const filteredOptions = extractKeysFromOptions(
    options,
    configurationOptionKeys
  );

  const isOptionEmpty = !Object.values(filteredOptions).some(Boolean);

  if (isOptionEmpty) {
    return undefined;
  }

  const { baseDir, env, envFile, verbose, prefix, noCache } = options;

  const addPrefix: boolean = Boolean((options as any).with); // Hack to add the prefix when the command is run in parallel
  const log = {
    prefix: (prefix ?? addPrefix) ? configuration.log.prefix : '', // Should not consider the prefix set in the intlayer configuration file
    verbose: verbose ?? true,
  };

  const override = {
    log,
  };

  return removeUndefined({
    baseDir,
    env,
    envFile,
    override,
    cache: !noCache,
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

  // Explicit version subcommand for convenience: `npx intlayer version`
  program
    .command('version')
    .description('Print the Intlayer CLI version')
    .action(() => {
      // Prefer the resolved package.json version; fallback to unknown
      // Keeping output minimal to align with common CLI behavior
      console.log(packageJson.version ?? 'unknown');
    });

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
    options: [
      ['-w, --watch', 'Watch for changes'],
      ['--skip-prepare', 'Skip the prepare step'],
      ['--with [with...]', 'Start command in parallel with the build'],
    ],
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

  const watchOptions = {
    description: 'Watch the dictionaries changes',
    options: [['--with [with...]', 'Start command in parallel with the build']],
  };

  // Add build command to dictionaries program
  const dictionariesWatchCmd = dictionariesProgram
    .command('watch')
    .description(buildOptions.description);

  applyOptions(dictionariesWatchCmd, watchOptions.options);
  applyConfigOptions(dictionariesWatchCmd);
  dictionariesWatchCmd.action((options) => {
    watchContentDeclaration({
      ...options,
      configOptions: extractConfigOptions(options),
    });
  });

  // Add build command to root program as well
  const rootWatchCmd = program
    .command('watch')
    .description(buildOptions.description);

  applyOptions(rootWatchCmd, watchOptions.options);
  applyConfigOptions(rootWatchCmd);
  rootWatchCmd.action((options) => {
    watchContentDeclaration({
      ...options,
      configOptions: extractConfigOptions(options),
    });
  });

  // Dictionary pull command
  const pullOptions = {
    description: 'Pull dictionaries from the server',
    options: [
      ['-d, --dictionaries [ids...]', 'List of dictionary IDs to pull'],
      [
        '--dictionary [ids...]',
        'List of dictionary IDs to pull (alias for --dictionaries)',
      ],
      ['--new-dictionaries-path [path]', 'Path to save the new dictionaries'],
      // Backward-compatibility for older tests/flags (camelCase)
      [
        '--newDictionariesPath [path]',
        '[alias] Path to save the new dictionaries',
      ],
    ],
  };

  // Add pull command to dictionaries program
  const dictionariesPullCmd = dictionariesProgram
    .command('pull')
    .description(pullOptions.description);

  applyOptions(dictionariesPullCmd, pullOptions.options);
  applyConfigOptions(dictionariesPullCmd);
  dictionariesPullCmd.action((options) => {
    // Merge dictionary aliases
    const dictionaries = [
      ...(options.dictionaries ?? []),
      ...(options.dictionary ?? []),
    ];

    pull({
      ...options,
      dictionaries: dictionaries.length > 0 ? dictionaries : undefined,
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
    // Merge dictionary aliases
    const dictionaries = [
      ...(options.dictionaries ?? []),
      ...(options.dictionary ?? []),
    ];

    pull({
      ...options,
      dictionaries: dictionaries.length > 0 ? dictionaries : undefined,
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
        '--dictionary [ids...]',
        'List of dictionary IDs to push (alias for --dictionaries)',
      ],
      [
        '-r, --delete-locale-dictionary',
        'Delete the local dictionaries after pushing',
      ],
      [
        '-k, --keep-locale-dictionary',
        'Keep the local dictionaries after pushing',
      ],
      // Backward-compatibility for older tests/flags (camelCase)
      [
        '--deleteLocaleDictionary',
        '[alias] Delete the local dictionaries after pushing',
      ],
      [
        '--keepLocaleDictionary',
        '[alias] Keep the local dictionaries after pushing',
      ],
      [
        '--build [build]',
        'Build the dictionaries before pushing to ensure the content is up to date. True will force the build, false will skip the build, undefined will allow using the cache of the build',
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

  dictionariesPushCmd.action((options) => {
    // Merge dictionary aliases
    const dictionaries = [
      ...(options.dictionaries || []),
      ...(options.dictionary || []),
    ];

    return push({
      ...options,
      dictionaries: dictionaries.length > 0 ? dictionaries : undefined,
      gitOptions: extractGitOptions(options),
      configOptions: extractConfigOptions(options),
    } as FillOptions);
  });

  // Add push command to root program as well
  const rootPushCmd = program
    .command('push')
    .description(pushOptions.description);

  applyOptions(rootPushCmd, pushOptions.options);
  applyConfigOptions(rootPushCmd);
  applyGitOptions(rootPushCmd);

  rootPushCmd.action((options) => {
    // Merge dictionary aliases
    const dictionaries = [
      ...(options.dictionaries || []),
      ...(options.dictionary || []),
    ];

    return push({
      ...options,
      dictionaries: dictionaries.length > 0 ? dictionaries : undefined,
      gitOptions: extractGitOptions(options),
      configOptions: extractConfigOptions(options),
    } as FillOptions);
  });

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

  const contentProgram = program
    .command('content')
    .description('Content declaration operations');

  contentProgram
    .command('list')
    .description('List the content declaration files')
    .action(listContentDeclaration);

  // Add alias for content list command
  program
    .command('list')
    .description('List the content declaration files')
    .action(listContentDeclaration);

  const testProgram = contentProgram
    .command('test')
    .description('Test if there are missing translations')
    .option(
      '--build [build]',
      'Build the dictionaries before testing to ensure the content is up to date. True will force the build, false will skip the build, undefined will allow using the cache of the build'
    );

  applyConfigOptions(testProgram);
  testProgram.action((options) => {
    testMissingTranslations({
      ...options,
      configOptions: extractConfigOptions(options),
    });
  });

  // Add alias for content test command
  const rootTestCmd = program
    .command('test')
    .description('Test if there are missing translations')
    .option(
      '--build [build]',
      'Build the dictionaries before testing to ensure the content is up to date. True will force the build, false will skip the build, undefined will allow using the cache of the build'
    );

  applyConfigOptions(rootTestCmd);
  rootTestCmd.action((options) => {
    testMissingTranslations({
      ...options,
      configOptions: extractConfigOptions(options),
    });
  });

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
      'complete'
    )
    .option('-k, --keys [keys...]', 'Filter dictionaries based on keys')
    .option(
      '--key [keys...]',
      'Filter dictionaries based on keys (alias for --keys)'
    )
    .option(
      '--excluded-keys [excludedKeys...]',
      'Filter out dictionaries based on keys'
    )
    .option(
      '--excluded-key [excludedKeys...]',
      'Filter out dictionaries based on keys (alias for --excluded-keys)'
    )
    .option(
      '--path-filter [pathFilters...]',
      'Filter dictionaries based on glob pattern'
    )
    .option(
      '--build [build]',
      'Build the dictionaries before filling to ensure the content is up to date. True will force the build, false will skip the build, undefined will allow using the cache of the build'
    )
    .option(
      '--skip-metadata',
      'Skip filling missing metadata (description, title, tags) for dictionaries'
    );

  applyConfigOptions(fillProgram);
  applyAIOptions(fillProgram);
  applyGitOptions(fillProgram);

  fillProgram.action((options) => {
    // Merge key aliases
    const keys = [...(options.keys ?? []), ...(options.key ?? [])];
    const excludedKeys = [
      ...(options.excludedKeys ?? []),
      ...(options.excludedKey ?? []),
    ];
    // Merge dictionary aliases
    const dictionaries = [
      ...(options.dictionaries ?? []),
      ...(options.dictionary ?? []),
    ];

    return fill({
      ...options,
      keys: keys.length > 0 ? keys : undefined,
      excludedKeys: excludedKeys.length > 0 ? excludedKeys : undefined,
      dictionaries: dictionaries.length > 0 ? dictionaries : undefined,
      aiOptions: extractAiOptions(options),
      gitOptions: extractGitOptions(options),
      configOptions: extractConfigOptions(options),
    } as FillOptions);
  });

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
    ['--skip-if-exists', 'Skip the file if it already exists'],
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
      skipIfExists: options.skipIfExists,
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
      skipIfExists: options.skipIfExists,
    })
  );

  /**
   * LIVE SYNC
   */

  const liveOptions = [
    ['--with [with...]', 'Start command in parallel with the live sync'],
  ];

  const liveCmd = program
    .command('live')
    .description(
      'Live sync - Watch for changes made on the CMS and update the application content accordingly'
    );

  applyOptions(liveCmd, liveOptions);
  applyConfigOptions(liveCmd);

  liveCmd.action((options) => liveSync(options));

  /**
   * EDITOR
   */

  const editorProgram = program
    .command('editor')
    .description('Visual editor operations');

  const editorStartCmd = editorProgram
    .command('start')
    .description('Start the Intlayer visual editor');

  applyConfigOptions(editorStartCmd);

  editorStartCmd.action((options) => {
    startEditor({
      env: options.env,
      envFile: options.envFile,
    });
  });

  /**
   * TRANSFORM
   */
  const transformProgram = program
    .command('transform')
    .alias('trans')
    .description('Transform components to use Intlayer');

  transformProgram
    .option('-f, --file [files...]', 'List of files to transform')
    .action((options) => {
      transform({
        files: options.file,
        configOptions: extractConfigOptions(options),
      });
    });

  applyConfigOptions(transformProgram);

  program.parse(process.argv);

  return program;
};
