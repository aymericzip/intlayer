import { type ChildProcess, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import {
  join,
  dirname as pathDirname,
  resolve as pathResolve,
} from 'node:path';
import { isESModule } from '@intlayer/config/utils';

type StartEditorOptions = {
  env?: string;
  envFile?: string;
};

/** Package runners trying `intlayer-editor` without it being installed. */
const REMOTE_RUNNERS: [command: string, args: string[]][] = [
  ['bun', ['x', 'intlayer-editor']],
  ['npx', ['-y', 'intlayer-editor']],
];

/**
 * Path of the installed `intlayer-editor` binary: resolved from the project
 * first (the CLI may be hoisted elsewhere in a monorepo), then from the CLI.
 */
const resolveInstalledEditorBinary = (): string | undefined => {
  const cliRequire = isESModule ? createRequire(import.meta.url) : require;
  const requireFunctions = [
    createRequire(join(process.cwd(), 'package.json')),
    cliRequire,
  ];

  for (const requireFunction of requireFunctions) {
    try {
      const packageJsonPath = requireFunction.resolve(
        'intlayer-editor/package.json'
      );

      return pathResolve(
        pathDirname(packageJsonPath),
        'bin',
        'intlayer-editor.mjs'
      );
    } catch {
      // Not resolvable from there
    }
  }

  return undefined;
};

/** Exits with the editor's exit code, so callers notice a failed start. */
const forwardExit = (child: ChildProcess): void => {
  child.on('exit', (code, signal) => process.exit(code ?? (signal ? 1 : 0)));
};

/**
 * Starts the visual editor: the installed `intlayer-editor`, else one run by
 * `bun x` or `npx` (the next runner is tried when one is not installed).
 */
export const startEditor = (options: StartEditorOptions): void => {
  const args: string[] = ['start'];

  if (options.env) args.push('--env', options.env);
  if (options.envFile) args.push('--env-file', options.envFile);

  const spawnInheriting = (command: string, commandArgs: string[]) =>
    spawn(command, commandArgs, {
      stdio: 'inherit',
      env: { ...process.env },
    });

  const runRemote = (runnerIndex: number): void => {
    const runner = REMOTE_RUNNERS[runnerIndex];

    if (!runner) {
      console.error(
        'Unable to run intlayer-editor: install it, or install bun or npm.'
      );
      process.exit(1);
    }

    const [command, runnerArgs] = runner;
    const child = spawnInheriting(command, [...runnerArgs, ...args]);

    // `error` only fires when the runner itself cannot be spawned
    child.on('error', () => runRemote(runnerIndex + 1));
    forwardExit(child);
  };

  const binaryPath = resolveInstalledEditorBinary();

  if (!binaryPath) {
    runRemote(0);
    return;
  }

  const child = spawnInheriting(process.execPath, [binaryPath, ...args]);

  child.on('error', () => runRemote(0));
  forwardExit(child);
};
