import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadPrompts } from './loadPrompts';

/** Setup modes understood by the hosted installer. */
export const INFRA_MODES = ['desktop', 'docker', 'compose'] as const;

export type InfraMode = (typeof INFRA_MODES)[number];

/**
 * The hosted installers are the single source of truth for the infrastructure
 * setup flow (desktop app, all-in-one container, Compose stack). The CLI runs
 * them rather than re-implementing the same steps in JavaScript.
 */
export const INSTALL_SCRIPT_URL = 'https://intlayer.org/install.sh';
export const INSTALL_SCRIPT_URL_WINDOWS = 'https://intlayer.org/install.ps1';

export type InitInfraOptions = {
  /** Skip the interactive menu and run this mode directly. */
  mode?: InfraMode;
  /** Installer URL override (forks, staging). Defaults to the platform's script. */
  scriptUrl?: string;
};

/** How to fetch and execute the installer on the current platform. */
type InstallerRunner = {
  url: string;
  fileName: string;
  /** Builds the command and arguments that execute the downloaded script. */
  command: (scriptPath: string, mode?: InfraMode) => [string, string[]];
};

const POSIX_RUNNER: InstallerRunner = {
  url: INSTALL_SCRIPT_URL,
  fileName: 'install.sh',
  command: (scriptPath, mode) => [
    'sh',
    [scriptPath, ...(mode ? ['--mode', mode] : [])],
  ],
};

const WINDOWS_RUNNER: InstallerRunner = {
  url: INSTALL_SCRIPT_URL_WINDOWS,
  fileName: 'install.ps1',
  command: (scriptPath, mode) => [
    'powershell',
    [
      '-NoProfile',
      '-ExecutionPolicy',
      'Bypass',
      '-File',
      scriptPath,
      ...(mode ? ['-Mode', mode] : []),
    ],
  ],
};

const getInstallerRunner = (): InstallerRunner =>
  process.platform === 'win32' ? WINDOWS_RUNNER : POSIX_RUNNER;

/**
 * Validates a user-provided mode against {@link INFRA_MODES}.
 *
 * @throws When the value is not a known mode.
 */
export const parseInfraMode = (value: string): InfraMode => {
  if ((INFRA_MODES as readonly string[]).includes(value)) {
    return value as InfraMode;
  }

  throw new Error(
    `Unknown infra mode "${value}". Expected one of: ${INFRA_MODES.join(', ')}`
  );
};

/**
 * Runs the installer with the terminal attached, so its own prompts and
 * progress bars reach the user unchanged.
 *
 * @returns The script's exit code.
 */
const runInstaller = (command: string, args: string[]): Promise<number> =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });

    child.on('error', reject);
    child.on('close', (code) => resolve(code ?? 1));
  });

/**
 * Downloads the hosted installer and runs it: desktop app, all-in-one Docker
 * container or Docker Compose stack, chosen interactively unless `mode` is set.
 *
 * Exposed as `intlayer init infra` and as a step of `intlayer init --interactive`.
 */
export const initInfra = async (
  options: InitInfraOptions = {}
): Promise<void> => {
  const p = await loadPrompts();
  const runner = getInstallerRunner();
  const scriptUrl = options.scriptUrl ?? runner.url;

  const spinner = p.spinner();
  spinner.start(`Fetching ${scriptUrl}`);

  let script: string;

  try {
    const response = await fetch(scriptUrl);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    script = await response.text();
  } catch (error) {
    spinner.stop('Could not download the installer', 1);
    p.log.error(
      `${(error as Error).message}\nRun it directly: ${
        process.platform === 'win32'
          ? `irm ${scriptUrl} | iex`
          : `curl -fsSL ${scriptUrl} | sh`
      }`
    );
    process.exitCode = 1;
    return;
  }

  spinner.stop('Installer downloaded');

  const directory = await mkdtemp(join(tmpdir(), 'intlayer-install-'));
  const scriptPath = join(directory, runner.fileName);

  try {
    await writeFile(scriptPath, script, { mode: 0o700 });

    const [command, args] = runner.command(scriptPath, options.mode);
    const exitCode = await runInstaller(command, args);

    if (exitCode !== 0) {
      process.exitCode = exitCode;
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
};
