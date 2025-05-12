import { Command } from 'commander';
import { audit } from './audit';
import { build } from './build';
import { getConfig } from './config';
import { listContentDeclaration } from './listContentDeclaration';
import { pull } from './pull';
import { push } from './push';
import { pushConfig } from './pushConfig';

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
    .alias('')
    .description('Dictionaries operations');

  // Dictionary build command
  const buildOptions = {
    description: 'Build the dictionaries',
    options: [
      ['-w, --watch', 'Watch for changes'],
      ['-e, --env [env]', 'Environment'],
    ],
    action: build,
  };

  // Add build command to dictionaries program
  const dictionariesBuildCmd = dictionariesProgram
    .command('build')
    .description(buildOptions.description);
  buildOptions.options.forEach((opt) =>
    dictionariesBuildCmd.option(opt[0], opt[1])
  );
  dictionariesBuildCmd.action(buildOptions.action);

  // Add build command to root program as well
  const rootBuildCmd = program
    .command('build')
    .description(buildOptions.description);
  buildOptions.options.forEach((opt) => rootBuildCmd.option(opt[0], opt[1]));
  rootBuildCmd.action(buildOptions.action);

  // Dictionary pull command
  const pullOptions = {
    description: 'Pull dictionaries from the server',
    options: [
      ['-d, --dictionaries [ids...]', 'List of dictionary IDs to pull'],
      ['--newDictionariesPath [path]', 'Path to save the new dictionaries'],
      ['-e, --env [env]', 'Environment'],
    ],
    action: pull,
  };

  // Add pull command to dictionaries program
  const dictionariesPullCmd = dictionariesProgram
    .command('pull')
    .description(pullOptions.description);
  pullOptions.options.forEach((opt) =>
    dictionariesPullCmd.option(opt[0], opt[1])
  );
  dictionariesPullCmd.action(pullOptions.action);

  // Add pull command to root program as well
  const rootPullCmd = program
    .command('pull')
    .description(pullOptions.description);
  pullOptions.options.forEach((opt) => rootPullCmd.option(opt[0], opt[1]));
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
      ['-e, --env [env]', 'Environment'],
    ],
    action: push,
  };

  // Add push command to dictionaries program
  const dictionariesPushCmd = dictionariesProgram
    .command('push')
    .description(pushOptions.description);
  pushOptions.options.forEach((opt) =>
    dictionariesPushCmd.option(opt[0], opt[1])
  );
  dictionariesPushCmd.action(pushOptions.action);

  // Add push command to root program as well
  const rootPushCmd = program
    .command('push')
    .description(pushOptions.description);
  pushOptions.options.forEach((opt) => rootPushCmd.option(opt[0], opt[1]));
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

  configurationProgram
    .command('get')
    .description('Get the configuration')
    .option('--env-file [envFile]', 'Environment file')
    .option('--verbose', 'Verbose')
    .option('-e, --env [env]', 'Environment')
    .action(getConfig);

  // Define the `push config` subcommand and add it to the `push` command
  configurationProgram
    .command('push')
    .description('Push the configuration')
    .option('--env-file [envFile]', 'Environment file')
    .option('--verbose', 'Verbose')
    .option('-e, --env [env]', 'Environment')
    .action(pushConfig);

  /**
   * CONTENT DECLARATION
   */

  program
    .command('content list')
    .description('List the content declaration files')
    .action(listContentDeclaration);

  const aiOptions = [
    ['--provider [provider]', 'Provider'],
    ['--temperature [temperature]', 'Temperature'],
    ['--model [model]', 'Model'],
    ['--api-key [apiKey]', 'Provider API key'],
    ['--custom-prompt [prompt]', 'Custom prompt'],
  ];

  const auditProgram = program
    .command('audit')
    .description('Audit the dictionaries')
    .option('-f, --files [files...]', 'List of Dictionary files to audit')
    .option(
      '--exclude [excludedGlobs...]',
      'Globs pattern to exclude from the audit'
    )
    .option('-l, --async-limit [asyncLimit]', 'Async limit')
    .option('-e, --env [env]', 'Environment');

  aiOptions.forEach((opt) => auditProgram.option(opt[0], opt[1]));
  auditProgram.action(audit);

  program.parse(process.argv);

  return program;
};
