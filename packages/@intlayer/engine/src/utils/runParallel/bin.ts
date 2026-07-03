import type { ChildProcess } from 'node:child_process';
import { type SpawnOptions, spawn } from 'node:child_process';

type BinCallback = (err: Error | null, stdout?: string, code?: number) => void;

const stripStderr = (stderr: string | undefined): string | undefined => {
  if (!stderr) return;
  let cleaned = stderr.trim();
  // Strip bogus screen size error.
  // See https://github.com/microsoft/vscode/issues/98590
  const regex = /your \d+x\d+ screen size is bogus\. expect trouble/gi;
  cleaned = cleaned.replace(regex, '');

  return cleaned.trim() || undefined;
};

/**
 * Spawn a binary and read its stdout.
 * @param cmd The name of the binary to spawn.
 * @param args The arguments for the binary.
 * @param options Optional option for the spawn function.
 * @param done Callback function.
 */
export const run = (
  cmd: string,
  args: string[],
  options: SpawnOptions | BinCallback | undefined,
  done?: BinCallback
): void => {
  let normalizedOptions: SpawnOptions | undefined;
  let normalizedDone: BinCallback;

  if (typeof options === 'function') {
    normalizedDone = options;
    normalizedOptions = undefined;
  } else {
    normalizedDone = done!;
    normalizedOptions = options;
  }

  let executed = false;
  const ch: ChildProcess = spawn(cmd, args, normalizedOptions ?? {});
  let stdout = '';
  let stderr = '';

  if (ch.stdout) {
    ch.stdout.on('data', (d: Buffer) => {
      stdout += d.toString();
    });
  }

  if (ch.stderr) {
    ch.stderr.on('data', (d: Buffer) => {
      stderr += d.toString();
    });
  }

  ch.on('error', (err: Error) => {
    if (executed) return;
    executed = true;
    normalizedDone(new Error(String(err)));
  });

  ch.on('close', (code: number | null) => {
    if (executed) return;
    executed = true;

    const cleanedStderr = stripStderr(stderr);
    if (cleanedStderr) {
      return normalizedDone(new Error(cleanedStderr));
    }

    normalizedDone(null, stdout, code ?? undefined);
  });
};
