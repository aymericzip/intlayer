import { Command } from 'commander';
import { build } from './build';
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
    .action((options) => build(options));

  program
    .command('push')
    .description(
      'Push all dictionaries. Create or update the pushed dictionaries'
    )
    .option('-d, --dictionaries [ids...]', 'List of dictionary IDs to push')
    .option(
      '-r, --deleteLocaleDir',
      'Delete the local dictionaries directory after pushing'
    )
    .option(
      '-k, --keepLocaleDir',
      'Keep the local dictionaries directory after pushing'
    )
    .action((options) => push(options));

  program
    .command('pull')
    .option('-d, --dictionaries [ids...]', 'List of dictionary IDs to pull')
    .option('--newDictionariesPath [path]', 'Path to save the new dictionaries')
    .action((options) => pull(options));

  program.parse(process.argv);

  return program;
};
