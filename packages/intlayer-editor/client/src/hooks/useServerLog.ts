import { useEffect } from 'preact/hooks';

/** Mirrors `ClientLogBody` of the editor server `/api/log` route. */
export type ServerLogEntry = {
  level: 'info' | 'warn' | 'error';
  message: string;
};

/**
 * Prints a message in the editor server terminal. Never throws: logging must
 * not break the editor, and the server may itself be the one gone.
 */
export const logOnServer = async (entry: ServerLogEntry): Promise<void> => {
  try {
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
      // Still delivered when the error comes with a page unload
      keepalive: true,
    });
  } catch {
    // The terminal is unreachable, the editor UI still shows the error
  }
};

/**
 * Logs `entry` on the editor server each time its message changes, so a state
 * re-rendered or re-probed every few seconds is printed once, not repeatedly.
 * Pass `undefined` while there is nothing to report.
 */
export const useServerLog = (entry: ServerLogEntry | undefined): void => {
  const level = entry?.level;
  const message = entry?.message;

  useEffect(() => {
    if (!level || !message) return;

    void logOnServer({ level, message });
  }, [level, message]);
};
