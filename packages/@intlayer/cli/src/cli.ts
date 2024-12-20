import { Command } from 'commander';
import { audit } from './audit';
import { build } from './build';
import { getConfig } from './config';
import { listContentDeclaration } from './listContentDeclaration';
import { pull } from './pull';
import { push } from './push';

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

  program
    .command('build')
    .description('Build the dictionaries')
    .option('-w, --watch', 'Watch for changes')
    .action(build);

  program
    .command('push')
    .description(
      'Push all dictionaries. Create or update the pushed dictionaries'
    )
    .option('-d, --dictionaries [ids...]', 'List of dictionary IDs to push')
    .option(
      '-r, --deleteLocaleDictionary',
      'Delete the local dictionaries after pushing'
    )
    .option(
      '-k, --keepLocaleDictionary',
      'Keep the local dictionaries after pushing'
    )
    .action(push);

  program
    .command('pull')
    .option('-d, --dictionaries [ids...]', 'List of dictionary IDs to pull')
    .option('--newDictionariesPath [path]', 'Path to save the new dictionaries')
    .action(pull);

  program
    .command('get config')
    .description('Get the configuration')
    .action(getConfig);

  program
    .command('content list')
    .description('List the content declaration files')
    .action(listContentDeclaration);

  program
    .command('audit')
    .description('Audit the dictionaries')
    .option(
      '-f, --files [files...]',
      'List of Content Declaration files to audit'
    )
    .option(
      '--exclude [excludedGlobs...]',
      'Globs pattern to exclude from the audit'
    )
    .option('-m, --model [model]', 'Model')
    .option('-p, --custom-prompt [prompt]', 'Custom prompt')
    .option('-l, --async-limit [asyncLimit]', 'Async limit')
    .option('-k, --open-ai-api-key [openAiApiKey]', 'OpenAI API key')
    .action(audit);

  program.parse(process.argv);

  return program;
};
