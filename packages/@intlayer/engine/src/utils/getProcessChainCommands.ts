import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { promisify } from 'node:util';

/** Process as listed by the OS: its parent and the command line it runs. */
export type ProcessEntry = {
  parentPid: number;
  command: string;
};

/** How long listing the processes may take before giving up. */
const PROCESS_LIST_TIMEOUT_MS = 2000;

/**
 * Parses the output of `ps -A -o pid=,ppid=,command=`.
 *
 * @param output - One `<pid> <ppid> <command>` row per line.
 * @returns The processes, keyed by PID.
 */
export const parseProcessTable = (
  output: string
): Map<number, ProcessEntry> => {
  const processes = new Map<number, ProcessEntry>();

  for (const line of output.split('\n')) {
    const match = /^\s*(\d+)\s+(\d+)\s+(.*)$/.exec(line);

    if (!match) continue;

    processes.set(Number(match[1]), {
      parentPid: Number(match[2]),
      command: match[3]!.trim(),
    });
  }

  return processes;
};

/** Reads one process from `/proc` (Linux): no subprocess needed. */
const readLinuxProcess = async (
  pid: number
): Promise<ProcessEntry | undefined> => {
  try {
    const stat = await readFile(`/proc/${pid}/stat`, 'utf8');
    // The command name is wrapped in parentheses and may contain spaces, so the
    // fields are read after the last `)`: `<state> <ppid> …`.
    const [, parentPidField] = stat.slice(stat.lastIndexOf(')') + 2).split(' ');
    const commandLine = await readFile(`/proc/${pid}/cmdline`, 'utf8');

    return {
      parentPid: Number(parentPidField),
      command: commandLine.split('\0').join(' ').trim(),
    };
  } catch {
    return undefined;
  }
};

/** Lists every process through one `ps` call (macOS, BSD). */
const readProcessTable = async (): Promise<Map<number, ProcessEntry>> => {
  try {
    const { stdout } = await promisify(execFile)(
      'ps',
      ['-A', '-o', 'pid=,ppid=,command='],
      { timeout: PROCESS_LIST_TIMEOUT_MS, maxBuffer: 16 * 1024 * 1024 }
    );

    return parseProcessTable(stdout);
  } catch {
    return new Map();
  }
};

type DenoPermissionState = 'granted' | 'prompt' | 'denied';

type DenoPermissions = {
  querySync?: (descriptor: {
    name: 'run' | 'read';
    command?: string;
    path?: string;
  }) => { state: DenoPermissionState };
};

/**
 * Whether reading the process list is allowed without side effects.
 *
 * Under Deno, a missing permission makes an interactive process stop and
 * prompt the user, so the list is only read when access is already granted.
 * Node and Bun have no permission model on these calls.
 */
const getCanReadProcessList = (): boolean => {
  const permissions = (
    globalThis as { Deno?: { permissions?: DenoPermissions } }
  ).Deno?.permissions;

  if (!permissions) return true;

  try {
    const descriptor =
      process.platform === 'linux'
        ? ({ name: 'read', path: '/proc' } as const)
        : ({ name: 'run', command: 'ps' } as const);

    return permissions.querySync?.(descriptor).state === 'granted';
  } catch {
    return false;
  }
};

/**
 * Command lines of this process and of the processes above it, closest first.
 *
 * This process is included because some runtimes restart the script inside
 * the same process, leaving their watch flag only on their own command line
 * (`deno run --watch`).
 *
 * Best effort: resolves to an empty list on Windows, or when the process list
 * cannot be read (sandbox, missing `ps`, Deno without the permission), and
 * never throws.
 *
 * @param maxDepth - How many processes to read at most, this one included.
 *
 * @example
 * ```ts
 * await getProcessChainCommands();
 * // → ['node src/index.js', 'node …/nodemon src/index.js', 'npm run dev']
 * ```
 */
export const getProcessChainCommands = async (
  maxDepth = 6
): Promise<string[]> => {
  if (process.platform === 'win32') return [];
  if (!getCanReadProcessList()) return [];

  const getProcess: (pid: number) => Promise<ProcessEntry | undefined> =
    process.platform === 'linux'
      ? readLinuxProcess
      : await readProcessTable().then(
          (processes) => async (pid: number) => processes.get(pid)
        );

  const commands: string[] = [];
  let pid = process.pid;

  // PID 1 is init/launchd: nothing above it is a dev tool.
  while (pid > 1 && commands.length < maxDepth) {
    const entry = await getProcess(pid);

    if (!entry) break;

    commands.push(entry.command);
    pid = entry.parentPid;
  }

  return commands;
};
