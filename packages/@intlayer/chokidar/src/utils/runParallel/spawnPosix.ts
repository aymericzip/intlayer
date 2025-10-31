//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import type { SpawnOptions } from 'node:child_process';
import { type ChildProcess, spawn as nodeSpawn } from 'node:child_process';
import { list } from './pidTree';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Kills the new process and its sub processes.
 */
const createKillHandler = (
  child: ChildProcess
): ((signal?: NodeJS.Signals | number) => boolean) => {
  return (signal?: NodeJS.Signals | number): boolean => {
    if (!child.pid) return false;

    // Try using list if available
    try {
      list(child.pid, { root: true }, (err: Error | null, pids?: number[]) => {
        if (err) {
          // Fallback to process group kill
          try {
            process.kill(-child.pid!, signal ?? 'SIGTERM');
          } catch {
            // ignore
          }
          return;
        }

        if (!pids) {
          // Fallback to process group kill if no pids returned
          try {
            process.kill(-child.pid!, signal ?? 'SIGTERM');
          } catch {
            // ignore
          }
          return;
        }

        for (const pid of pids) {
          try {
            process.kill(pid, signal ?? 'SIGTERM');
          } catch (_err) {
            // ignore.
          }
        }
      });
    } catch {
      // pidtree not available, use process group kill
      try {
        process.kill(-child.pid, signal ?? 'SIGTERM');
      } catch {
        // ignore
      }
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
 * `kill` method of the instance kills the new process and its sub processes.
 *
 * @param command - The command to run.
 * @param args - List of string arguments.
 * @param options - Options.
 * @returns A ChildProcess instance of new process.
 * @private
 */
export const spawnPosix = (
  command: string,
  args: string[],
  options: SpawnOptions
): ChildProcess => {
  const child = nodeSpawn(command, args, options);
  child.kill = createKillHandler(child);

  return child;
};
