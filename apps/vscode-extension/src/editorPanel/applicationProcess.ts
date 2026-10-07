import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { detectPackageManager, findLockFileDir } from '@intlayer/engine/cli';
import { type Terminal, window } from 'vscode';

/** Time a reachability probe waits for the application. */
const PROBE_TIMEOUT = 1_500;

/** Script started by "Start the app". */
const DEV_SCRIPT = 'dev';

/** Terminals running the application, by project directory. */
const applicationTerminals = new Map<string, Terminal>();

/**
 * Whether the application answers at its URL. Any HTTP response counts: a
 * dev server may answer the root with a redirect or a 404.
 */
export const isApplicationRunning = async (
  applicationURL: string
): Promise<boolean> => {
  try {
    await fetch(applicationURL, {
      signal: AbortSignal.timeout(PROBE_TIMEOUT),
      redirect: 'manual',
    });

    return true;
  } catch {
    return false;
  }
};

/** Whether the project `package.json` declares the `dev` script. */
const hasDevScript = async (projectDir: string): Promise<boolean> => {
  try {
    const packageJson = JSON.parse(
      await readFile(join(projectDir, 'package.json'), 'utf8')
    ) as { scripts?: Record<string, string> };

    return typeof packageJson.scripts?.[DEV_SCRIPT] === 'string';
  } catch {
    return false;
  }
};

/**
 * Runs the `dev` script of the project in an integrated terminal, with the
 * project package manager (`npm run dev` by default). Reveals the terminal
 * instead when the application was already started from it.
 *
 * @returns `false` when the project has no `dev` script.
 */
export const startApplication = async (
  projectDir: string
): Promise<boolean> => {
  const runningTerminal = applicationTerminals.get(projectDir);

  if (runningTerminal && runningTerminal.exitStatus === undefined) {
    runningTerminal.show();
    return true;
  }

  if (!(await hasDevScript(projectDir))) return false;

  const packageManager = detectPackageManager(
    findLockFileDir(projectDir) ?? projectDir
  );
  const terminal = window.createTerminal({
    name: 'Intlayer app',
    cwd: projectDir,
  });

  applicationTerminals.set(projectDir, terminal);
  terminal.show(true);
  terminal.sendText(`${packageManager} run ${DEV_SCRIPT}`);

  return true;
};
