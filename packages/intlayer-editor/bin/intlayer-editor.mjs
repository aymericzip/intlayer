#!/usr/bin/env node
// bin/intlayer-editor.mjs

import { exec } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construct the path to the 'dist' directory
const distPath = join(__dirname, '../server/dist/index.mjs');

// Get arguments passed to the command (ignoring "node" and the script name)
const args = process.argv.slice(2);

if (args[0] === 'start') {
  // Start the server pointing to the package's 'dist' directory
  const command = `NODE_ENV=production node ${distPath}`;
  const child = exec(command);

  // Pipe child's stdout and stderr to the parent process
  child.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  child.stderr.on('data', (data) => {
    process.stderr.write(data);
  });

  child.on('error', (error) => {
    console.error(`Error starting the editor: ${error.message}`);
    process.exit(1);
  });

  child.on('close', (code) => {
    console.info(`Child process exited with code ${code}`);
  });
} else {
  console.info('Usage: intlayer-editor start');
}
