import * as ANSIColors from '@intlayer/config/colors';
import {
  colorize,
  colorizeNumber,
  spinnerFrames,
} from '@intlayer/config/logger';

/** Refresh rate of the spinner, in milliseconds. */
const SPINNER_INTERVAL_MS = 100;

export type ReviewProgressLogger = {
  /** Show the progress line and start animating the spinner. */
  start: () => void;
  /** Count one processed document/locale pair and refresh the progress line. */
  increment: () => void;
  /** Stop the spinner and erase the progress line. */
  stop: () => void;
};

/**
 * Single-line progress indicator used while the documents are compared with
 * their translations.
 *
 * The line is rewritten in place on an interactive terminal, then erased so the
 * final synthesis is printed on a clean line. On a non-interactive output (a
 * file, a CI log) a single static line is printed instead of the animation, to
 * avoid flooding the log with escape sequences.
 *
 * @param totalCount - Number of document/locale pairs to process.
 * @returns The progress logger handles.
 */
export const createReviewProgressLogger = (
  totalCount: number
): ReviewProgressLogger => {
  const isInteractive = Boolean(process.stdout.isTTY);

  let spinnerTimer: NodeJS.Timeout | null = null;
  let spinnerIndex = 0;
  let processedCount = 0;
  // Until `start` is called the logger stays silent, so the caller can create it
  // unconditionally and only display it when relevant.
  let isStarted = false;

  const render = (): void => {
    const frame = spinnerFrames[spinnerIndex] ?? '';

    process.stdout.write(
      `\r\x1b[2K${colorize(frame, ANSIColors.BLUE)} Processing ${colorizeNumber(processedCount)}/${colorizeNumber(totalCount)}…`
    );
  };

  const start = (): void => {
    isStarted = true;

    if (!isInteractive) {
      process.stdout.write(
        `Processing ${colorizeNumber(totalCount)} document/locale pair(s)…\n`
      );
      return;
    }

    if (spinnerTimer) return;

    render();

    spinnerTimer = setInterval(() => {
      spinnerIndex = (spinnerIndex + 1) % spinnerFrames.length;
      render();
    }, SPINNER_INTERVAL_MS);
  };

  const increment = (): void => {
    processedCount += 1;

    if (isStarted && isInteractive) render();
  };

  const stop = (): void => {
    if (spinnerTimer) {
      clearInterval(spinnerTimer);
      spinnerTimer = null;
    }

    if (isStarted && isInteractive) process.stdout.write('\r\x1b[2K');

    isStarted = false;
  };

  return { start, increment, stop };
};
