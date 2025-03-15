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

let env = 'production'; // Default environment
let envFile = ''; // Default to no env file

// Check for --env or -e flag
const envIndex = args.findIndex(
  (arg) => arg === '---environment' || arg === '--env' || arg === '-e'
);
if (envIndex !== -1 && args[envIndex + 1]) {
  env = args[envIndex + 1]; // Get the next argument as the environment
}

// Check for --env-file or -f flag
const envFileIndex = args.findIndex(
  (arg) => arg === '---env-file' || arg === '--env-file' || arg === '-f'
);

if (args[0] === 'start') {
  // Start the server pointing to the package's 'dist' directory
  const command = `NODE_ENV=${env} ${envFileIndex !== -1 ? `ENV_FILE=${envFile}` : ''} node ${distPath}`;
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
    if (
      code === 255 // EADDRINUSE error when the port is already in use
    )
      return;

    console.info(`Child process exited with code ${code}`);
  });
} else {
  console.info('Usage: intlayer-editor start');
}
