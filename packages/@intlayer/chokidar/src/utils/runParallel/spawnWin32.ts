//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import type { SpawnOptions } from 'node:child_process';
import { type ChildProcess, spawn as nodeSpawn } from 'node:child_process';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Kills the new process and its sub processes forcibly.
 */
const createKillHandler = (child: ChildProcess) => {
  return (): boolean => {
    if (!child.pid) return false;

    try {
      nodeSpawn('taskkill', ['/F', '/T', '/PID', String(child.pid)], {
        stdio: 'ignore',
      });
    } catch {
      // ignore
    }

    return true;
  };
};

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Launches a new process with the given command.
 * This is almost same as `child_process.spawn`.
 *
 * This returns a `ChildProcess` instance.
 * `kill` method of the instance kills the new process and its sub processes forcibly.
 *
 * @param command - The command to run.
 * @param args - List of string arguments.
 * @param options - Options.
 * @returns A ChildProcess instance of new process.
 * @private
 */
export const spawnWin32 = (
  command: string,
  args: string[],
  options: SpawnOptions
): ChildProcess => {
  const child = nodeSpawn(command, args, options);
  child.kill = createKillHandler(child);

  return child;
};
