import { Command } from 'commander';

type ServeParams = {
  version: string;
  transpile: () => void;
  watch: () => void;
};

/**
 * Set the API for the CLI
 *
 * Example of commands:
 *
 * npm run dev
 * npm run transpile
 */
export const setAPI = ({ transpile, watch }: ServeParams): Command => {
  const program = new Command();

  program.version('1.0.0').description('Intlayer CLI');

  program
    .command('build')
    .description('Build the dictionaries')
    .action(transpile);
  program
    .command('transpile')
    .description('Build the dictionaries')
    .action(transpile);

  program
    .command('watch')
    .description('Build the dictionaries and watch for changes')
    .action(watch);

  program.parse(process.argv);

  return program;
};
