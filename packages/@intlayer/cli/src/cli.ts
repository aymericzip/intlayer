import type { AIOptions } from '@intlayer/api';
import configuration from '@intlayer/config/built';
import { Command } from 'commander';
import { build } from './build';
import { getConfig } from './config';
import { fill, FillOptions } from './fill';
import { listContentDeclaration } from './listContentDeclaration';
import { pull } from './pull';
import { push } from './push';
import { pushConfig } from './pushConfig';

const logOptions = [['--verbose', 'Verbose']];

const configurationOptions = [
  ['--env-file [envFile]', 'Environment file'],
  ['-e, --env [env]', 'Environment'],
];

const aiOptions = [
  ['--provider [provider]', 'Provider'],
  ['--temperature [temperature]', 'Temperature'],
  ['--model [model]', 'Model'],
  ['--api-key [apiKey]', 'Provider API key'],
  ['--custom-prompt [prompt]', 'Custom prompt'],
];

/**
 * Helper functions to apply common options to commands
 */
const applyOptions = (command: Command, options: string[][]) => {
  options.forEach(([flag, description]) => command.option(flag, description));
  return command;
};

const applyLogOptions = (command: Command) => applyOptions(command, logOptions);
const applyConfigOptions = (command: Command) =>
  applyOptions(command, configurationOptions);
const applyAIOptions = (command: Command) => applyOptions(command, aiOptions);

const enrichAiOptionsWithConfiguration = (aiOptions?: AIOptions) => ({
  ...aiOptions,
  apiKey: aiOptions?.apiKey ?? configuration.ai?.apiKey,
  provider: aiOptions?.provider ?? configuration.ai?.provider,
  model: aiOptions?.model ?? configuration.ai?.model,
  temperature: aiOptions?.temperature ?? configuration.ai?.temperature,
});

const extractAiOptions = ({
  provider,
  temperature,
  model,
  apiKey,
  customPrompt,
  ...options
}: AIOptions) => ({
  aiOptions: enrichAiOptionsWithConfiguration({
    provider,
    temperature,
    model,
    apiKey,
    customPrompt,
  }),
  ...options,
});

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

  program.version('1.0.0').description('Intlayer CLI');

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
    action: build,
  };

  // Add build command to dictionaries program
  const dictionariesBuildCmd = dictionariesProgram
    .command('build')
    .description(buildOptions.description);

  applyOptions(dictionariesBuildCmd, buildOptions.options);
  applyConfigOptions(dictionariesBuildCmd);
  dictionariesBuildCmd.action(buildOptions.action);

  // Add build command to root program as well
  const rootBuildCmd = program
    .command('build')
    .description(buildOptions.description);

  applyOptions(rootBuildCmd, buildOptions.options);
  applyConfigOptions(rootBuildCmd);
  rootBuildCmd.action(buildOptions.action);

  // Dictionary pull command
  const pullOptions = {
    description: 'Pull dictionaries from the server',
    options: [
      ['-d, --dictionaries [ids...]', 'List of dictionary IDs to pull'],
      ['--newDictionariesPath [path]', 'Path to save the new dictionaries'],
    ],
    action: pull,
  };

  // Add pull command to dictionaries program
  const dictionariesPullCmd = dictionariesProgram
    .command('pull')
    .description(pullOptions.description);

  applyOptions(dictionariesPullCmd, pullOptions.options);
  applyConfigOptions(dictionariesPullCmd);
  dictionariesPullCmd.action(pullOptions.action);

  // Add pull command to root program as well
  const rootPullCmd = program
    .command('pull')
    .description(pullOptions.description);

  applyOptions(rootPullCmd, pullOptions.options);
  applyConfigOptions(rootPullCmd);
  rootPullCmd.action(pullOptions.action);

  // Dictionary push command
  const pushOptions = {
    description:
      'Push all dictionaries. Create or update the pushed dictionaries',
    options: [
      ['-d, --dictionaries [ids...]', 'List of dictionary IDs to push'],
      [
        '-r, --deleteLocaleDictionary',
        'Delete the local dictionaries after pushing',
      ],
      [
        '-k, --keepLocaleDictionary',
        'Keep the local dictionaries after pushing',
      ],
    ],
    action: push,
  };

  // Add push command to dictionaries program
  const dictionariesPushCmd = dictionariesProgram
    .command('push')
    .description(pushOptions.description);

  applyOptions(dictionariesPushCmd, pushOptions.options);
  applyConfigOptions(dictionariesPushCmd);
  dictionariesPushCmd.action(pushOptions.action);

  // Add push command to root program as well
  const rootPushCmd = program
    .command('push')
    .description(pushOptions.description);

  applyOptions(rootPushCmd, pushOptions.options);
  applyConfigOptions(rootPushCmd);
  rootPushCmd.action(pushOptions.action);

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
  applyLogOptions(configGetCmd);
  configGetCmd.action(getConfig);

  // Define the `push config` subcommand and add it to the `push` command
  const configPushCmd = configurationProgram
    .command('push')
    .description('Push the configuration');

  applyConfigOptions(configPushCmd);
  applyLogOptions(configPushCmd);
  configPushCmd.action(pushConfig);

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
      'Translation mode: complete, review, or missing-only',
      'missing-only'
    )
    .option('--git-diff', 'Only run on dictionaries with unpushed changes')
    .option('--keys [keys...]', 'Filter dictionaries based on keys')
    .option(
      '--excluded-keys [excludedKeys...]',
      'Filter out dictionaries based on keys'
    )
    .option(
      '--path-filter [pathFilters...]',
      'Filter dictionaries based on glob pattern'
    );

  applyLogOptions(fillProgram);
  applyConfigOptions(fillProgram);
  applyAIOptions(fillProgram);

  fillProgram.action((options) =>
    fill(extractAiOptions(options) as FillOptions)
  );

  program.parse(process.argv);

  return program;
};
