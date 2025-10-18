import { spawn } from 'node:child_process';
import { delimiter, join } from 'node:path';

export type ParallelHandle = {
  kill: () => void;
  result: Promise<any>;
  commandText: string;
};

/**
 * Start a cross-platform parallel process without external deps.
 * Accepts either a single string (e.g., 'next start') or an array of tokens (e.g., ['next', 'start']).
 */
export const runParallel = (proc?: string | string[]): ParallelHandle => {
  if (!proc || (Array.isArray(proc) && proc.length === 0))
    throw new Error('Invalid command');

  const commandText = Array.isArray(proc) ? proc.join(' ') : proc;

  const isArray = Array.isArray(proc);
  const command = isArray ? (proc as string[])[0] : commandText;
  const args = isArray ? (proc as string[]).slice(1) : [];

  // Ensure local binaries (node_modules/.bin) are resolvable
  const cwdBin = join(process.cwd(), 'node_modules', '.bin');
  const PATH_KEY =
    Object.keys(process.env).find((k) => k.toLowerCase() === 'path') ?? 'PATH';
  const extendedPath = [cwdBin, process.env[PATH_KEY] ?? '']
    .filter(Boolean)
    .join(delimiter);
  const childEnv = {
    ...process.env,
    [PATH_KEY]: extendedPath,
  } as NodeJS.ProcessEnv;

  const isWin = process.platform === 'win32';

  // Prefer explicit shell invocation for string commands for Bun/mac compatibility
  const child = isArray
    ? // If provided as a single string element that includes spaces, treat it like a shell command
      args.length === 0 && /\s/.test(command)
      ? isWin
        ? spawn(process.env.ComSpec ?? 'cmd.exe', ['/d', '/s', '/c', command], {
            cwd: process.cwd(),
            stdio: 'inherit',
            shell: false,
            detached: false,
            env: childEnv,
          })
        : spawn(process.env.SHELL ?? '/bin/bash', ['-lc', command], {
            cwd: process.cwd(),
            stdio: 'inherit',
            shell: false,
            detached: false,
            env: childEnv,
          })
      : spawn(command, args, {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: false,
          detached: false,
          env: childEnv,
        })
    : isWin
      ? spawn(
          process.env.ComSpec ?? 'cmd.exe',
          ['/d', '/s', '/c', commandText],
          {
            cwd: process.cwd(),
            stdio: 'inherit',
            shell: false,
            detached: false,
            env: childEnv,
          }
        )
      : spawn(process.env.SHELL ?? '/bin/bash', ['-lc', commandText], {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: false,
          detached: false,
          env: childEnv,
        });

  let terminated = false;

  const terminateTree = (signal: NodeJS.Signals = 'SIGTERM') => {
    if (terminated) return;
    terminated = true;

    try {
      if (process.platform === 'win32') {
        // Kill the whole tree on Windows
        spawn('taskkill', ['/PID', String(child.pid), '/T', '/F']);
      } else {
        // Send signal to child; shell should forward to its children
        if (child.pid)
          try {
            process.kill(child.pid, signal);
          } catch {}
      }
    } catch {}

    // Escalate after grace period if still alive
    setTimeout(() => {
      try {
        if (process.platform === 'win32') {
          spawn('taskkill', ['/PID', String(child.pid), '/T', '/F']);
        } else if (child.pid) {
          try {
            process.kill(child.pid, 'SIGKILL');
          } catch {}
        }
      } catch {}
    }, 5000);
  };

  const result = new Promise<void>((resolve, reject) => {
    child.on('error', (err) => {
      try {
        console.error(
          `[runParallel] Failed to start: ${err?.message ?? String(err)}`
        );
      } catch {}
      reject(err);
    });
    child.on('exit', (code, signal) => {
      // Clean up listeners upon child exit
      signalHandlers.forEach(({ event, handler }) => {
        process.off(event as any, handler as any);
      });
      if (code === 0) resolve();
      else
        reject(
          Object.assign(new Error('Parallel process failed'), { code, signal })
        );
    });
  });

  const cleanup = () => terminateTree('SIGTERM');

  const signalHandlers: { event: string; handler: (...args: any[]) => void }[] =
    [
      { event: 'SIGINT', handler: cleanup },
      { event: 'SIGTERM', handler: cleanup },
      { event: 'SIGQUIT', handler: cleanup },
      { event: 'SIGHUP', handler: cleanup },
      { event: 'beforeExit', handler: cleanup },
      { event: 'exit', handler: cleanup },
      {
        event: 'uncaughtException',
        handler: () => {
          cleanup();
        },
      },
      {
        event: 'unhandledRejection',
        handler: () => {
          cleanup();
        },
      },
    ];

  signalHandlers.forEach(({ event, handler }) => {
    process.on(event as any, handler as any);
  });

  const kill = () => terminateTree('SIGTERM');

  return { kill, result, commandText };
};
