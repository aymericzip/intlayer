import { type ChildProcess, spawn } from 'node:child_process';
import { type OutputChannel, window } from 'vscode';
import { getIntlayerCliCommand } from '../utils/runIntlayerCli';

/** Editor servers started by the extension, per project directory. */
const editorServerProcesses = new Map<string, ChildProcess>();

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

/**
 * Starts `intlayer editor start` in the background for a project, unless the
 * extension already did. The CLI runs the project's `intlayer-editor`, else
 * downloads it. Output goes to the "Intlayer Editor" output channel.
 */
export const startEditorServer = (projectDir: string): void => {
  if (isEditorServerRunning(projectDir)) return;

  const channel = getOutputChannel();
  const command = getIntlayerCliCommand(projectDir, {
    args: ['editor', 'start'],
  });

  channel.appendLine(`[${projectDir}] > ${command}`);
  recentOutputLines.set(projectDir, []);

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
    }
  });

  editorServerProcesses.set(projectDir, editorServerProcess);
};

/** Stops the editor server the extension started for a project, if any. */
export const stopEditorServer = (projectDir: string): void => {
  const editorServerProcess = editorServerProcesses.get(projectDir);

  if (!editorServerProcess) return;

  editorServerProcesses.delete(projectDir);
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
