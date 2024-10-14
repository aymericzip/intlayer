import { Command } from 'commander';
import { build } from './build';
import { push } from './push';
import { watch } from './watch';

/**
 * Set the API for the CLI
 *
 * Example of commands:
 *
 * npm run dev
 * npm run transpile
 */
export const setAPI = (): Command => {
  const program = new Command();

  program.version('1.0.0').description('Intlayer CLI');

  program.command('build').description('Build the dictionaries').action(build);
  program
    .command('transpile')
    .description('Build the dictionaries')
    .action(build);

  program
    .command('watch')
    .description('Build the dictionaries and watch for changes')
    .action(watch);

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

  program.parse(process.argv);

  return program;
};
