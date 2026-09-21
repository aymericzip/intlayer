import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadPrompts } from './loadPrompts';

/** Setup modes understood by the hosted installer. */
export const INFRA_MODES = ['desktop', 'docker', 'compose'] as const;

export type InfraMode = (typeof INFRA_MODES)[number];

/**
 * The hosted installer is the single source of truth for the infrastructure
 * setup flow (desktop app, all-in-one container, Compose stack). The CLI runs
 * it rather than re-implementing the same steps in JavaScript.
 */
export const INSTALL_SCRIPT_URL = 'https://intlayer.org/install.sh';

export type InitInfraOptions = {
  /** Skip the interactive menu and run this mode directly. */
  mode?: InfraMode;
  /** Installer URL override (forks, staging). Defaults to {@link INSTALL_SCRIPT_URL}. */
  scriptUrl?: string;
};

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
 * Runs a shell script with the terminal attached, so the installer's own
 * prompts and progress bars reach the user unchanged.
 *
 * @returns The script's exit code.
 */
const runShellScript = (scriptPath: string, args: string[]): Promise<number> =>
  new Promise((resolve, reject) => {
    const child = spawn('sh', [scriptPath, ...args], { stdio: 'inherit' });

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
  const scriptUrl = options.scriptUrl ?? INSTALL_SCRIPT_URL;

  if (process.platform === 'win32') {
    p.log.error(
      'The infrastructure installer is a POSIX shell script. On Windows, run it from WSL, or download the desktop app from https://github.com/aymericzip/intlayer/releases/latest'
    );
    process.exitCode = 1;
    return;
  }

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
      `${(error as Error).message}\nRun it directly: curl -fsSL ${scriptUrl} | sh`
    );
    process.exitCode = 1;
    return;
  }

  spinner.stop('Installer downloaded');

  const directory = await mkdtemp(join(tmpdir(), 'intlayer-install-'));
  const scriptPath = join(directory, 'install.sh');

  try {
    await writeFile(scriptPath, script, { mode: 0o700 });

    const args = options.mode ? ['--mode', options.mode] : [];
    const exitCode = await runShellScript(scriptPath, args);

    if (exitCode !== 0) {
      process.exitCode = exitCode;
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
};
