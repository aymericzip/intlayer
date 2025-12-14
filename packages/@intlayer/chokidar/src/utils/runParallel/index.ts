import { delimiter, join } from 'node:path';
import { spawnPosix } from './spawnPosix';
import { spawnWin32 } from './spawnWin32';

export type ParallelHandle = {
  kill: () => void;
  result: Promise<any>;
  commandText: string;
};

/**
 * Start a cross-platform parallel process using npm-run-all approach.
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
    Object.keys(process.env).find((key) => key.toLowerCase() === 'path') ??
    'PATH';

  const extendedPath = [cwdBin, process.env[PATH_KEY] ?? '']
    .filter(Boolean)
    .join(delimiter);

  const childEnv = {
    ...process.env,
    [PATH_KEY]: extendedPath,
  } as NodeJS.ProcessEnv;

  const isWin = process.platform === 'win32';
  const spawnFunc = isWin ? spawnWin32 : spawnPosix;

  // Spawn options
  const spawnOptions = {
    cwd: process.cwd(),
    stdio: 'inherit' as const,
    env: childEnv,
    shell: isWin,
  };

  // Spawn the child process
  const child = isArray
    ? // If provided as a single string element that includes spaces, treat it like a shell command
      args.length === 0 && /\s/.test(command)
      ? isWin
        ? spawnFunc(
            process.env.ComSpec ?? 'cmd.exe',
            ['/d', '/s', '/c', command],
            spawnOptions
          )
        : spawnFunc(
            process.env.SHELL ?? '/bin/sh',
            ['-c', command],
            spawnOptions
          )
      : spawnFunc(command, args, spawnOptions)
    : isWin
      ? spawnFunc(
          process.env.ComSpec ?? 'cmd.exe',
          ['/d', '/s', '/c', commandText],
          spawnOptions
        )
      : spawnFunc(
          process.env.SHELL ?? '/bin/sh',
          ['-c', commandText],
          spawnOptions
        );

  const result = new Promise<void>((resolve, reject) => {
    child.on('error', (err) => {
      try {
        console.error(
          `[runParallel] Failed to start: ${err?.message ?? String(err)}`
        );
      } catch {}
      cleanupHandlers();
      reject(err);
    });

    child.on('exit', (code, signal) => {
      cleanupHandlers();

      // Treat common termination signals as graceful exits, not failures
      const gracefulSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGHUP'];
      if (code === 0 || (signal && gracefulSignals.includes(signal))) {
        resolve();
      } else {
        reject(
          Object.assign(new Error('Parallel process failed'), { code, signal })
        );
      }
    });
  });

  const cleanup = () => {
    try {
      child.kill('SIGTERM');
    } catch {
      // Best effort
    }
  };

  const signalHandlers: { event: string; handler: (...args: any[]) => void }[] =
    [
      { event: 'SIGINT', handler: cleanup },
      { event: 'SIGTERM', handler: cleanup },
      { event: 'SIGQUIT', handler: cleanup },
      { event: 'SIGHUP', handler: cleanup },
    ];

  // Register signal handlers
  signalHandlers.forEach(({ event, handler }) => {
    process.on(event as any, handler as any);
  });

  const cleanupHandlers = () => {
    signalHandlers.forEach(({ event, handler }) => {
      process.off(event as any, handler as any);
    });
  };

  const kill = () => {
    try {
      child.kill('SIGTERM');
    } catch {
      // Best effort
    }
  };

  return { kill, result, commandText };
};
