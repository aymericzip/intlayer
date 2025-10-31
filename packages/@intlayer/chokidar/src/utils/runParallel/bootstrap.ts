//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

export const bootstrap = (_name: string): void | Promise<void> => {
  const argv = process.argv.slice(2);

  switch (argv[0]) {
    case undefined:
    case '-h':
    case '--help':
      // Not needed for our use case
      console.log('Help not implemented');
      return;

    case '-v':
    case '--version':
      // Not needed for our use case
      console.log('Version not implemented');
      return;

    default:
      // https://github.com/mysticatea/npm-run-all/issues/105
      // Avoid MaxListenersExceededWarnings.
      process.stdout.setMaxListeners(0);
      process.stderr.setMaxListeners(0);
      process.stdin.setMaxListeners(0);
      return;
  }
};
