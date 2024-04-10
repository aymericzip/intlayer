import { Command } from 'commander';

type ServeParams = {
  version: string;
  transpile: () => void;
  serve: () => void;
  watch: () => void;
};

export const setAPI = ({ serve, transpile, watch }: ServeParams): Command => {
  const program = new Command();

  program.version('1.0.0').description('Intlayer CLI');

  program.command('serve').description('Start the application').action(serve);
  program.command('start').description('Start the application').action(serve);
  program.command('dev').description('Start the application').action(serve);

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
