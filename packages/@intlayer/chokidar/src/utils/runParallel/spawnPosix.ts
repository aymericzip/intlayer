//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import type { SpawnOptions } from 'node:child_process';
import { type ChildProcess, spawn as nodeSpawn } from 'node:child_process';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Kills the new process and its sub processes synchronously using
 * process group kill (negative PID). This ensures all descendants
 * are terminated before the parent calls process.exit().
 */
const createKillHandler = (
  child: ChildProcess
): ((signal?: NodeJS.Signals | number) => boolean) => {
  return (signal?: NodeJS.Signals | number): boolean => {
    if (!child.pid) return false;

    const killSignal = signal ?? 'SIGTERM';

    // Use synchronous process group kill (negative PID) as primary strategy.
    // This kills the entire process group (shell + all descendants) immediately.
    try {
      process.kill(-child.pid, killSignal);
      return true;
    } catch {
      // Process group kill failed (e.g., process not a group leader).
    }

    // Fallback: kill the child process directly.
    try {
      process.kill(child.pid, killSignal);
    } catch {
      // ignore — process may have already exited.
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
  // Spawn detached so the child becomes its own process group leader.
  // This allows killing the entire tree via process.kill(-pid, signal).
  const child = nodeSpawn(command, args, { ...options, detached: true });
  child.kill = createKillHandler(child);

  return child;
};
