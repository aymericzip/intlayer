import { Command } from 'commander';

type ServeParams = {
  version: string;
  serve: () => void;
  build: () => void;
};

export const setAPI = ({ serve, build }: ServeParams): Command => {
  const program = new Command();

  program.version('1.0.0').description('Intlayer CLI');

  program.command('serve').description('Start the application').action(serve);
  program.command('start').description('Start the application').action(serve);
  program.command('dev').description('Start the application').action(serve);

  program.command('build').description('Build the dictionaries').action(build);

  program.parse(process.argv);

  return program;
};
