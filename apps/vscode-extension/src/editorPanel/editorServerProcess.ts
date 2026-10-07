import { type ChildProcess, spawn } from 'node:child_process';
import { relative } from 'node:path';
import { getEditorURLForPort } from '@intlayer/config/node';
import {
  type BuiltEditorOverride,
  overrideBuiltEditorConfiguration,
} from '@intlayer/engine/build';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type OutputChannel, window } from 'vscode';
import { getInstalledIntlayerVersion } from '../utils/getInstalledIntlayerVersion';
import {
  getIntlayerCliCommand,
  runIntlayerCliInTerminal,
} from '../utils/runIntlayerCli';
import { parseEditorServerUrl } from './parseEditorServerUrl';

/** Editor servers started by the extension, per project directory. */
const editorServerProcesses = new Map<string, ChildProcess>();

/** URL each started editor server announced (its port may be shifted). */
const editorServerUrls = new Map<string, string>();

/**
 * URL the editor server started for a project listens at, once announced.
 * Differs from `editor.editorURL` when its port was taken.
 */
export const getEditorServerUrl = (projectDir: string): string | undefined =>
  editorServerUrls.get(projectDir);

/** Output lines kept per project, to explain a failed start in the panel. */
const MAX_RECENT_OUTPUT_LINES = 10;
const recentOutputLines = new Map<string, string[]>();

/** Strips terminal color codes from CLI output. */
const stripAnsiCodes = (text: string): string =>
  // biome-ignore lint/suspicious/noControlCharactersInRegex: ANSI escapes
  text.replace(/\u001b\[[0-9;]*m/g, '');

/** Last output lines of the editor server started for a project. */
export const getRecentEditorServerOutput = (projectDir: string): string[] =>
  recentOutputLines.get(projectDir) ?? [];

let outputChannel: OutputChannel | undefined;

const getOutputChannel = (): OutputChannel => {
  outputChannel ??= window.createOutputChannel('Intlayer Editor');
  return outputChannel;
};

/** Reveals the editor servers' output. */
export const showEditorServerLogs = (): void => getOutputChannel().show(true);

/** Whether the editor server started for a project is still alive. */
export const isEditorServerRunning = (projectDir: string): boolean => {
  const editorServerProcess = editorServerProcesses.get(projectDir);

  return (
    editorServerProcess !== undefined &&
    editorServerProcess.exitCode === null &&
    editorServerProcess.signalCode === null
  );
};

/**
 * Kills a process and its descendants: the shell runs the package runner,
 * which runs the CLI, which spawns the server.
 */
const killProcessTree = (childProcess: ChildProcess): void => {
  if (!childProcess.pid) return;

  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(childProcess.pid), '/T', '/F']);
    } else {
      // Started detached: its pid leads its own process group
      process.kill(-childProcess.pid, 'SIGTERM');
    }
  } catch {
    // Already exited
  }
};

/** Projects already warned about a version mismatch this session. */
const versionMismatchWarnedProjects = new Set<string>();

/**
 * Warns once per project that its Intlayer packages and the extension differ:
 * the editor and the extension exchange messages that change across versions.
 */
const warnVersionMismatch = async (
  projectDir: string,
  installedVersion: string,
  extensionVersion: string
): Promise<void> => {
  const message =
    `Intlayer ${installedVersion} is installed in this project, but the ` +
    `extension is ${extensionVersion}. The visual editor may misbehave ` +
    'until their versions match.';

  getOutputChannel().appendLine(`[${projectDir}] ${message}`);

  if (versionMismatchWarnedProjects.has(projectDir)) return;

  versionMismatchWarnedProjects.add(projectDir);

  const upgradeAction = 'Upgrade Intlayer packages';
  const selectedAction = await window.showWarningMessage(
    message,
    upgradeAction
  );

  if (selectedAction !== upgradeAction) return;

  runIntlayerCliInTerminal(projectDir, {
    terminalName: 'Intlayer upgrade',
    args: ['upgrade'],
    // `upgrade` takes no configuration options
    forwardEnvironment: false,
  });
};

/**
 * Builds `intlayer editor start` for a project: the project's installed CLI
 * (which runs the `intlayer-editor` of its own version), else the CLI of the
 * extension version, so the CLI, the editor and the extension stay aligned.
 */
const getEditorStartCommand = (
  projectDir: string,
  extensionVersion: string
): string => {
  const args = ['editor', 'start'];
  const installedVersion = getInstalledIntlayerVersion(projectDir);

  if (!installedVersion) {
    return getIntlayerCliCommand(projectDir, {
      args,
      remote: true,
      version: extensionVersion,
      forwardEnvironment: true,
    });
  }

  if (installedVersion !== extensionVersion) {
    void warnVersionMismatch(projectDir, installedVersion, extensionVersion);
  }

  return getIntlayerCliCommand(projectDir, { args });
};

/** Built configuration overrides already logged, per project directory. */
const reportedEditorOverrides = new Map<string, Set<string>>();

/**
 * Adapts the project's built configuration (`.intlayer` only): turns
 * `editor.enabled` on, so the application loads the editor client, and once
 * the editor server announced its URL, points `editor.editorURL` at its port.
 * Logged to the "Intlayer Editor" output channel.
 *
 * @param editorServerURL - URL the started editor server announced.
 */
export const adaptBuiltEditorConfiguration = async (
  projectDir: string,
  configuration: IntlayerConfig,
  editorServerURL?: string
): Promise<void> => {
  const editorServerPort = editorServerURL
    ? Number(new URL(editorServerURL).port)
    : undefined;

  const editorOverride: BuiltEditorOverride = {
    // Kept on when adapting the URL: the write starts from the configuration
    enabled: true,
    editorURL: editorServerPort
      ? getEditorURLForPort(configuration.editor.editorURL, editorServerPort)
      : undefined,
  };

  const overriddenKeys = await overrideBuiltEditorConfiguration(
    configuration,
    editorOverride
  ).catch(() => []);

  const reportedOverrides =
    reportedEditorOverrides.get(projectDir) ?? new Set<string>();
  const reportedKeys = overriddenKeys.filter((key) => {
    const override = `${key}=${editorOverride[key]}`;
    const isReported = reportedOverrides.has(override);

    reportedOverrides.add(override);

    return !isReported;
  });

  reportedEditorOverrides.set(projectDir, reportedOverrides);

  if (reportedKeys.length === 0) return;

  getOutputChannel().appendLine(
    `[${projectDir}] ${reportedKeys.map((key) => `editor.${key}`).join(' and ')} ` +
      `temporarily adapted in ${relative(projectDir, configuration.system.configDir)}. ` +
      'Set it in ' +
      'the Intlayer configuration to keep it after the next build.'
  );
};

/**
 * Starts `intlayer editor start` in the background for a project, unless the
 * extension already did. The CLI runs the project's `intlayer-editor`, else
 * downloads the one of its version. Output goes to the "Intlayer Editor"
 * output channel.
 */
export const startEditorServer = (
  projectDir: string,
  extensionVersion: string
): void => {
  if (isEditorServerRunning(projectDir)) return;

  const channel = getOutputChannel();
  const command = getEditorStartCommand(projectDir, extensionVersion);

  channel.appendLine(`[${projectDir}] > ${command}`);
  recentOutputLines.set(projectDir, []);
  editorServerUrls.delete(projectDir);

  const editorServerProcess = spawn(command, {
    cwd: projectDir,
    shell: true,
    detached: process.platform !== 'win32',
    env: process.env,
  });

  const appendOutput = (chunk: Buffer) => {
    const text = stripAnsiCodes(chunk.toString());
    const lines = text.split('\n').filter((line) => line.trim() !== '');

    channel.append(text);

    const announcedUrl = parseEditorServerUrl(text);

    if (announcedUrl) editorServerUrls.set(projectDir, announcedUrl);
    recentOutputLines.set(
      projectDir,
      [...getRecentEditorServerOutput(projectDir), ...lines].slice(
        -MAX_RECENT_OUTPUT_LINES
      )
    );
  };

  editorServerProcess.stdout?.on('data', appendOutput);
  editorServerProcess.stderr?.on('data', appendOutput);
  editorServerProcess.on('error', (error) =>
    channel.appendLine(`[${projectDir}] ${error.message}`)
  );
  editorServerProcess.on('exit', (code, signal) => {
    channel.appendLine(
      `[${projectDir}] Editor exited (${signal ?? `code ${code}`})`
    );

    if (editorServerProcesses.get(projectDir) === editorServerProcess) {
      editorServerProcesses.delete(projectDir);
      editorServerUrls.delete(projectDir);
    }
  });

  editorServerProcesses.set(projectDir, editorServerProcess);
};

/** Stops the editor server the extension started for a project, if any. */
export const stopEditorServer = (projectDir: string): void => {
  const editorServerProcess = editorServerProcesses.get(projectDir);

  if (!editorServerProcess) return;

  editorServerProcesses.delete(projectDir);
  editorServerUrls.delete(projectDir);
  killProcessTree(editorServerProcess);
};

/** Stops every editor server the extension started. */
export const stopAllEditorServers = (): void => {
  for (const projectDir of [...editorServerProcesses.keys()]) {
    stopEditorServer(projectDir);
  }

  outputChannel?.dispose();
  outputChannel = undefined;
};
