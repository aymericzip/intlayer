import * as os from 'node:os';
import { run } from './bin';

type ProcessList = [number, number][]; // [PPID, PID][]
type ProcessListCallback = (err: Error | null, list?: ProcessList) => void;

/**
 * Gets the list of all the pids of the system through the ps command.
 * @param callback Callback function with error and process list.
 */
export const ps = (callback: ProcessListCallback): void => {
  const args = ['-A', '-o', 'ppid,pid'];

  run('ps', args, (err, stdout, code) => {
    if (err) {
      callback(err);
      return;
    }
    if (code !== 0) {
      callback(new Error(`pidtree ps command exited with code ${code}`));
      return;
    }

    // Example of stdout
    //
    // PPID   PID
    //    1   430
    //  430   432
    //    1   727
    //    1  7166

    if (!stdout) {
      callback(new Error('No stdout received from ps command'));
      return;
    }

    try {
      const lines = stdout.split(os.EOL);

      const list: ProcessList = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        if (!line) continue;

        const trimmed = line.trim();

        if (!trimmed) continue;

        const parts = trimmed.split(/\s+/);
        const p0 = parts[0];
        const p1 = parts[1];

        if (!p0 || !p1) continue;

        const ppid = parseInt(p0, 10); // PPID
        const pid = parseInt(p1, 10); // PID

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
