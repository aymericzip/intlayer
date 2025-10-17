export type ParallelHandle = {
  kill: () => void;
  result: Promise<any>;
  commandText: string;
};

/**
 * Start a cross-platform parallel process using `concurrently`.
 * Accepts either a single string (e.g., 'next start') or an array of tokens (e.g., ['next', 'start']).
 */
export const runParallel = async (
  proc?: string | string[]
): Promise<ParallelHandle | null> => {
  if (!proc || (Array.isArray(proc) && proc.length === 0)) return null;

  const commandText = Array.isArray(proc) ? proc.join(' ') : proc;

  // Dynamic import to avoid loading concurrently at module initialization
  const { concurrently } = await import('concurrently');

  const { result, commands } = concurrently(
    [
      {
        command: commandText,
        name: 'parallel',
        cwd: process.cwd(),
      },
    ],
    {
      prefix: 'none',
      killOthersOn: [],
      restartTries: 0,
      raw: true,
    }
  );

  result.catch(() => {
    // Error already printed by concurrently; keep logging minimal
  });

  const kill = () => {
    try {
      commands.forEach((cmd) => cmd.kill('SIGTERM'));
    } catch {}
    setTimeout(() => {
      try {
        commands.forEach((cmd) => cmd.kill('SIGKILL' as any));
      } catch {}
    }, 5000);
  };

  // Ensure cleanup on exit
  const cleanup = () => kill();

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);

  return { kill, result, commandText };
};
