import { afterEach, describe, expect, it, vi } from 'vitest';
import { createReviewProgressLogger } from './reviewDocProgress';

/** Remove the ANSI escape sequences so assertions stay readable. */
const stripAnsi = (text: string): string =>
  // biome-ignore lint/suspicious/noControlCharactersInRegex: matching ANSI escapes
  text.replace(/\x1b\[[0-9;]*[A-Za-z]/g, '');

const initialIsTTY = process.stdout.isTTY;

/** Spy on the standard output and pretend it is (or is not) a terminal. */
const mockStdout = (isTTY: boolean) => {
  process.stdout.isTTY = isTTY;

  return vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
};

afterEach(() => {
  process.stdout.isTTY = initialIsTTY;
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('createReviewProgressLogger', () => {
  it('stays silent until it is started', () => {
    const writeSpy = mockStdout(true);

    const progressLogger = createReviewProgressLogger(2);
    progressLogger.increment();
    progressLogger.stop();

    expect(writeSpy).not.toHaveBeenCalled();
  });

  it('prints a single static line on a non-interactive output', () => {
    const writeSpy = mockStdout(false);

    const progressLogger = createReviewProgressLogger(46);
    progressLogger.start();
    progressLogger.increment();
    progressLogger.increment();
    progressLogger.stop();

    expect(writeSpy).toHaveBeenCalledTimes(1);
    expect(stripAnsi(writeSpy.mock.calls[0]![0] as string)).toBe(
      'Processing 46 document/locale pair(s)…\n'
    );
  });

  it('rewrites the progress line on every increment of a terminal', () => {
    const writeSpy = mockStdout(true);

    const progressLogger = createReviewProgressLogger(3);
    progressLogger.start();
    progressLogger.increment();
    progressLogger.increment();

    const renderedLines = writeSpy.mock.calls.map((call) =>
      stripAnsi(call[0] as string)
    );

    expect(renderedLines[0]).toContain('Processing 0/3…');
    expect(renderedLines[1]).toContain('Processing 1/3…');
    expect(renderedLines[2]).toContain('Processing 2/3…');
    expect(renderedLines.every((line) => line.startsWith('\r'))).toBe(true);

    progressLogger.stop();
  });

  it('erases the progress line and clears the spinner on stop', () => {
    vi.useFakeTimers();
    const writeSpy = mockStdout(true);

    const progressLogger = createReviewProgressLogger(1);
    progressLogger.start();
    progressLogger.stop();

    expect(stripAnsi(writeSpy.mock.calls.at(-1)![0] as string)).toBe('\r');

    // Once stopped, the spinner must not render anything anymore.
    const writeCountAfterStop = writeSpy.mock.calls.length;
    vi.advanceTimersByTime(1000);

    expect(writeSpy.mock.calls.length).toBe(writeCountAfterStop);
  });
});
