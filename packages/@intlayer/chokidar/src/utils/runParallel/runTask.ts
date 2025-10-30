//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { Writable } from 'node:stream';

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Remove the given value from the array.
 */
const remove = <T>(array: T[], x: T): void => {
  const index = array.indexOf(x);
  if (index !== -1) {
    array.splice(index, 1);
  }
};

const signals: Record<string, number> = {
  SIGABRT: 6,
  SIGALRM: 14,
  SIGBUS: 10,
  SIGCHLD: 20,
  SIGCONT: 19,
  SIGFPE: 8,
  SIGHUP: 1,
  SIGILL: 4,
  SIGINT: 2,
  SIGKILL: 9,
  SIGPIPE: 13,
  SIGQUIT: 3,
  SIGSEGV: 11,
  SIGSTOP: 17,
  SIGTERM: 15,
  SIGTRAP: 5,
  SIGTSTP: 18,
  SIGTTIN: 21,
  SIGTTOU: 22,
  SIGUSR1: 30,
  SIGUSR2: 31,
};

/**
 * Converts a signal name to a number.
 */
const convert = (signal: string): number => {
  return signals[signal] || 0;
};

/**
 * Simple in-memory writable stream
 */
class MemoryStream extends Writable {
  private chunks: Buffer[] = [];

  _write(
    chunk: Buffer,
    _encoding: string,
    callback: (error?: Error | null) => void
  ): void {
    this.chunks.push(chunk);
    callback();
  }

  toString(): string {
    return Buffer.concat(this.chunks).toString('utf8');
  }
}

//------------------------------------------------------------------------------
// Types
//------------------------------------------------------------------------------

interface TaskResult {
  name: string;
  code: number | null;
  signal?: string | null;
}

interface TaskQueueItem {
  name: string;
  index: number;
}

interface RunTaskOptions {
  stdout: NodeJS.WritableStream;
  stderr?: NodeJS.WritableStream;
  aggregateOutput?: boolean;
  continueOnError?: boolean;
  race?: boolean;
  maxParallel?: number;
}

interface TaskPromise extends Promise<TaskResult> {
  abort?: () => void;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Run npm-scripts of given names in parallel.
 *
 * If a npm-script exited with a non-zero code, this aborts other all npm-scripts.
 *
 * Note: This is a simplified version for our use case.
 * The full implementation would require the actual runTask function from npm-run-all.
 */
export const runTasks = (
  tasks: string[],
  options: RunTaskOptions
): Promise<TaskResult[]> => {
  return new Promise((resolve, reject) => {
    if (tasks.length === 0) {
      resolve([]);
      return;
    }

    const results: TaskResult[] = tasks.map((task) => ({
      name: task,
      code: undefined as any,
    }));
    const queue: TaskQueueItem[] = tasks.map((task, index) => ({
      name: task,
      index,
    }));
    const promises: TaskPromise[] = [];
    let error: Error | null = null;
    let aborted = false;

    /**
     * Done.
     */
    const done = (): void => {
      if (error == null) {
        resolve(results);
      } else {
        reject(error);
      }
    };

    /**
     * Aborts all tasks.
     */
    const abort = (): void => {
      if (aborted) {
        return;
      }
      aborted = true;

      if (promises.length === 0) {
        done();
      } else {
        for (const p of promises) {
          p.abort?.();
        }
        Promise.all(promises).then(done, reject);
      }
    };

    /**
     * Runs a next task.
     */
    const next = (): void => {
      if (aborted) {
        return;
      }
      if (queue.length === 0) {
        if (promises.length === 0) {
          done();
        }
        return;
      }

      const originalOutputStream = options.stdout;
      const optionsClone = { ...options };
      const writer = new MemoryStream();

      if (options.aggregateOutput) {
        optionsClone.stdout = writer as any;
      }

      const task = queue.shift()!;

      // Note: This requires the actual runTask implementation from npm-run-all
      // For now, this is a placeholder that would need to be implemented
      const promise = Promise.resolve({
        name: task.name,
        code: 0,
        signal: null,
      }) as TaskPromise;

      promises.push(promise);
      promise.then(
        (result) => {
          remove(promises, promise);
          if (aborted) {
            return;
          }

          if (options.aggregateOutput) {
            originalOutputStream.write(writer.toString());
          }

          // Check if the task failed as a result of a signal, and
          // amend the exit code as a result.
          if (
            result.code === null &&
            result.signal !== null &&
            result.signal !== undefined
          ) {
            // An exit caused by a signal must return a status code
            // of 128 plus the value of the signal code.
            // Ref: https://nodejs.org/api/process.html#process_exit_codes
            result.code = 128 + convert(result.signal);
          }

          // Save the result.
          results[task.index].code = result.code;

          // Aborts all tasks if it's an error.
          if (result.code) {
            error = new Error(
              `Task ${result.name} failed with code ${result.code}`
            );
            if (!options.continueOnError) {
              abort();
              return;
            }
          }

          // Aborts all tasks if options.race is true.
          if (options.race && !result.code) {
            abort();
            return;
          }

          // Call the next task.
          next();
        },
        (thisError: Error) => {
          remove(promises, promise);
          if (!options.continueOnError || options.race) {
            error = thisError;
            abort();
            return;
          }
          next();
        }
      );
    };

    const max = options.maxParallel;
    const end =
      typeof max === 'number' && max > 0
        ? Math.min(tasks.length, max)
        : tasks.length;
    for (let i = 0; i < end; ++i) {
      next();
    }
  });
};
