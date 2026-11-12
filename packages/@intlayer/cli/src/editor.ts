import { type ChildProcess, spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import {
  join,
  dirname as pathDirname,
  resolve as pathResolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { isESModule } from '@intlayer/config/utils';
import { getParentPackageJSON } from './utils/getParentPackageJSON';

type StartEditorOptions = {
  env?: string;
  envFile?: string;
};

/** Version of this CLI: `intlayer-editor` is released in lockstep with it. */
const getCliVersion = (): string | undefined =>
  getParentPackageJSON(
    isESModule ? pathDirname(fileURLToPath(import.meta.url)) : __dirname
  ).version;

/**
 * Package runners trying `intlayer-editor` without it being installed. The
 * editor is pinned to the CLI version, so both speak the same protocol.
 */
export const getRemoteEditorRunners = (
  cliVersion: string | undefined
): [command: string, args: string[]][] => {
  const editorPackage = cliVersion
    ? `intlayer-editor@${cliVersion}`
    : 'intlayer-editor';

  return [
    ['bun', ['x', editorPackage]],
    ['npx', ['-y', editorPackage]],
  ];
};

type InstalledEditor = {
  /** Path of the `intlayer-editor` binary. */
  binaryPath: string;
  version: string | undefined;
};

/**
 * The installed `intlayer-editor`: resolved from the project first (the CLI
 * may be hoisted elsewhere in a monorepo), then from the CLI.
 */
const resolveInstalledEditor = (): InstalledEditor | undefined => {
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

      const { version } = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

      return {
        binaryPath: pathResolve(
          pathDirname(packageJsonPath),
          'bin',
          'intlayer-editor.mjs'
        ),
        version,
      };
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
 * Starts the visual editor: the installed `intlayer-editor`, else one of the
 * CLI version run by `bun x` or `npx` (the next runner is tried when one is
 * not installed).
 */
export const startEditor = (options: StartEditorOptions): void => {
  const args: string[] = ['start'];
  const cliVersion = getCliVersion();
  const remoteRunners = getRemoteEditorRunners(cliVersion);

  if (options.env) args.push('--env', options.env);
  if (options.envFile) args.push('--env-file', options.envFile);

  const spawnInheriting = (command: string, commandArgs: string[]) =>
    spawn(command, commandArgs, {
      stdio: 'inherit',
      env: { ...process.env },
    });

  const runRemote = (runnerIndex: number): void => {
    const runner = remoteRunners[runnerIndex];

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

  const installedEditor = resolveInstalledEditor();

  if (!installedEditor) {
    runRemote(0);
    return;
  }

  if (
    cliVersion &&
    installedEditor.version &&
    installedEditor.version !== cliVersion
  ) {
    console.warn(
      `intlayer-editor ${installedEditor.version} is installed, but the ` +
        `Intlayer CLI is ${cliVersion}. Align their versions ` +
        '(`npx intlayer upgrade`) to avoid editor issues.'
    );
  }

  const child = spawnInheriting(process.execPath, [
    installedEditor.binaryPath,
    ...args,
  ]);

  child.on('error', () => runRemote(0));
  forwardExit(child);
};
