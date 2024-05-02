#!/usr/bin/env node

const { program } = require('commander');
const { startIntlayerEditor } = require('../dist/cjs/server/index.cjs');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .description('Command-line interface to start the Intlayer Editor server');

program
  .command('start')
  .description('Start the Intlayer editor server')
  .action(() => startIntlayerEditor());

program.parse(process.argv);
