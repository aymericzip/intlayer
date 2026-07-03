import type { SpawnOptions } from 'node:child_process';
import * as os from 'node:os';
import { run } from './bin';

type ProcessList = [number, number][]; // [PPID, PID][]
type ProcessListCallback = (err: Error | null, list?: ProcessList) => void;

/**
 * Gets the list of all the pids of the system through the wmic command.
 * @param callback Callback function with error and process list.
 */
export const wmic = (callback: ProcessListCallback): void => {
  const args = ['PROCESS', 'get', 'ParentProcessId,ProcessId'];
  const options: SpawnOptions = {
    windowsHide: true,
    windowsVerbatimArguments: true,
  };
  run('wmic', args, options, (err, stdout, code) => {
    if (err) {
      callback(err);
      return;
    }

    if (code !== 0) {
      callback(new Error(`pidtree wmic command exited with code ${code}`));
      return;
    }

    // Example of stdout
    //
    // ParentProcessId  ProcessId
    // 0                777

    if (!stdout) {
      callback(new Error('No stdout received from wmic command'));
      return;
    }

    try {
      const lines = stdout.split(os.EOL);

      const list: ProcessList = [];
      for (let i = 1; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (!trimmed) continue;
        const parts = trimmed.split(/\s+/);
        const ppid = parseInt(parts[0], 10); // PPID
        const pid = parseInt(parts[1], 10); // PID
        if (!Number.isNaN(ppid) && !Number.isNaN(pid)) {
          list.push([ppid, pid]);
        }
      }

      callback(null, list);
    } catch (error) {
      callback(error instanceof Error ? error : new Error(String(error)));
    }
  });
};
