import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { EDITOR_SERVER_PORT_ENV_VAR } from '@intlayer/config/node';
import { detectPackageManager, findLockFileDir } from '@intlayer/engine/cli';
import { type Terminal, window } from 'vscode';

/** Time a reachability probe waits for the application. */
const PROBE_TIMEOUT = 1_500;

/**
 * Scripts "Start the app" runs, by preference: `start` serves frameworks
 * without `dev` (e.g. Angular, React Native).
 */
const APPLICATION_SCRIPTS = ['dev', 'start'] as const;

type ApplicationScript = (typeof APPLICATION_SCRIPTS)[number];

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

/**
 * First of {@link APPLICATION_SCRIPTS} the project `package.json` declares.
 *
 * @returns `undefined` when it declares none, or cannot be read.
 */
const getApplicationScript = async (
  projectDir: string
): Promise<ApplicationScript | undefined> => {
  try {
    const packageJson = JSON.parse(
      await readFile(join(projectDir, 'package.json'), 'utf8')
    ) as { scripts?: Record<string, string> };

    return APPLICATION_SCRIPTS.find(
      (script) => typeof packageJson.scripts?.[script] === 'string'
    );
  } catch {
    return undefined;
  }
};

/**
 * Runs the `dev` script of the project (else `start`) in an integrated
 * terminal, with the project package manager (`npm run dev` by default). Reveals the terminal
 * instead when the application was already started from it.
 *
 * @param editorServerURL - URL of the editor server shown in the panel: its
 * port turns the editor on for the application, at that URL.
 * @returns `false` when the project has neither a `dev` nor a `start` script.
 */
export const startApplication = async (
  projectDir: string,
  editorServerURL?: string
): Promise<boolean> => {
  const runningTerminal = applicationTerminals.get(projectDir);

  if (runningTerminal && runningTerminal.exitStatus === undefined) {
    runningTerminal.show();
    return true;
  }

  const applicationScript = await getApplicationScript(projectDir);

  if (!applicationScript) return false;

  const packageManager = detectPackageManager(
    findLockFileDir(projectDir) ?? projectDir
  );
  const editorServerPort = editorServerURL ? new URL(editorServerURL).port : '';
  const terminal = window.createTerminal({
    name: 'Intlayer app',
    cwd: projectDir,
    ...(editorServerPort && {
      env: { [EDITOR_SERVER_PORT_ENV_VAR]: editorServerPort },
    }),
  });

  applicationTerminals.set(projectDir, terminal);
  terminal.show(true);
  terminal.sendText(`${packageManager} run ${applicationScript}`);

  return true;
};
