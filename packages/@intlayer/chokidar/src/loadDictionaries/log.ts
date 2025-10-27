import {
  ANSIColors,
  colorize,
  extractErrorMessage,
  getConfiguration,
  spinnerFrames,
  v,
  x,
} from '@intlayer/config';
import type { DictionariesStatus } from './loadDictionaries';

export class DictionariesLogger {
  private statuses: DictionariesStatus[] = [];
  private spinnerTimer: NodeJS.Timeout | null = null;
  private spinnerIndex = 0;
  private renderedLines = 0;
  private readonly spinnerFrames = spinnerFrames;
  private isFinished = false;
  private readonly prefix: string;
  private lastRenderedState: string = '';
  private remoteCheckInProgress = false;
  private expectRemote = false;
  private remoteError: string | undefined;

  constructor() {
    const configuration = getConfiguration();
    this.prefix = configuration.log.prefix;
  }

  setExpectRemote(expect: boolean) {
    this.expectRemote = expect;
  }

  startRemoteCheck() {
    if (this.isFinished) return;
    this.remoteCheckInProgress = true;
    this.startSpinner();
    this.render();
  }

  stopRemoteCheck() {
    this.remoteCheckInProgress = false;
  }

  update(newStatuses: DictionariesStatus[]) {
    if (this.isFinished) return;
    for (const status of newStatuses) {
      const index = this.statuses.findIndex(
        (s) =>
          s.dictionaryKey === status.dictionaryKey && s.type === status.type
      );
      if (index >= 0) {
        this.statuses[index] = status;
      } else {
        this.statuses.push(status);
      }
    }

    // If we expect remote fetch later, avoid rendering a local-only line first
    const { remoteTotal } = this.computeProgress();
    if (this.expectRemote && !this.remoteCheckInProgress && remoteTotal === 0) {
      // Do not start spinner or render yet; wait until remote check starts
      return;
    }

    this.startSpinner();
    this.render();
  }

  finish() {
    this.isFinished = true;
    this.stopSpinner();
    // Render final state and keep it visible
    this.render();
  }

  private startSpinner() {
    if (this.spinnerTimer || this.isFinished) return;
    this.spinnerTimer = setInterval(() => {
      this.spinnerIndex = (this.spinnerIndex + 1) % this.spinnerFrames.length;
      this.render();
    }, 100);
  }

  private stopSpinner() {
    if (!this.spinnerTimer) return;
    clearInterval(this.spinnerTimer);
    this.spinnerTimer = null;
  }

  public setRemoteError = (error?: Error) => {
    this.remoteError = extractErrorMessage(error);
    // Avoid rendering a transient remote-only line while the remote check flag is still true
    // Ensure local + remote are rendered together after a failure
    this.stopRemoteCheck();
    this.render();
  };

  private render() {
    const { localTotal, localDone, remoteTotal, remoteDone } =
      this.computeProgress();

    const frame = this.spinnerFrames[this.spinnerIndex];
    const clock = colorize(frame, ANSIColors.BLUE);
    const lines: string[] = [];

    const isLocalDone = localDone === localTotal;
    const isRemoteDone = remoteDone === remoteTotal;

    const suppressLocalWhileCheckingRemote =
      this.expectRemote && this.remoteCheckInProgress && remoteTotal === 0;

    if (!suppressLocalWhileCheckingRemote) {
      if (isLocalDone) {
        lines.push(
          `${this.prefix} ${v} Local content: ${colorize(`${localDone}`, ANSIColors.GREEN)}${colorize(`/${localTotal}`, ANSIColors.GREY)}`
        );
      } else {
        lines.push(
          `${this.prefix} ${clock} Local content: ${colorize(`${localDone}`, ANSIColors.BLUE)}${colorize(`/${localTotal}`, ANSIColors.GREY)}`
        );
      }
    }

    // Single remote line: show error, check, or progress counts
    if (remoteTotal > 0 || this.remoteCheckInProgress || this.remoteError) {
      if (this.remoteError) {
        lines.push(
          `${this.prefix} ${x} Remote content: ${colorize(
            this.remoteError,
            ANSIColors.RED
          )}`
        );
      } else if (remoteTotal === 0) {
        lines.push(
          `${this.prefix} ${clock} Remote content: ${colorize('Check server', ANSIColors.BLUE)}`
        );
      } else if (isRemoteDone) {
        lines.push(
          `${this.prefix} ${v} Remote content: ${colorize(`${remoteDone}`, ANSIColors.GREEN)}${colorize(`/${remoteTotal}`, ANSIColors.GREY)}`
        );
      } else {
        lines.push(
          `${this.prefix} ${clock} Remote content: ${colorize(`${remoteDone}`, ANSIColors.BLUE)}${colorize(`/${remoteTotal}`, ANSIColors.GREY)}`
        );
      }
    }

    // Check if the state has changed to avoid duplicate rendering
    const currentState = lines.join('\n');
    if (currentState === this.lastRenderedState) {
      return;
    }
    this.lastRenderedState = currentState;

    if (this.renderedLines > 0) {
      process.stdout.write(`\x1b[${this.renderedLines}F`);
    }

    const totalLinesToClear = Math.max(this.renderedLines, lines.length);
    for (let i = 0; i < totalLinesToClear; i++) {
      process.stdout.write('\x1b[2K');
      const line = lines[i];
      if (line !== undefined) {
        process.stdout.write(line);
      }
      process.stdout.write('\n');
    }

    this.renderedLines = lines.length;
  }

  private computeProgress() {
    const localKeys = new Set(
      this.statuses
        .filter((s) => s.type === 'local')
        .map((s) => s.dictionaryKey)
    );

    const localDoneKeys = new Set(
      this.statuses
        .filter(
          (s) =>
            s.type === 'local' && (s.status === 'built' || s.status === 'error')
        )
        .map((s) => s.dictionaryKey)
    );

    const remoteKeys = new Set(
      this.statuses
        .filter((s) => s.type === 'remote')
        .map((s) => s.dictionaryKey)
    );

    const remoteDoneKeys = new Set(
      this.statuses
        .filter(
          (s) =>
            s.type === 'remote' &&
            (s.status === 'fetched' ||
              s.status === 'imported' ||
              s.status === 'error')
        )
        .map((s) => s.dictionaryKey)
    );

    return {
      localTotal: localKeys.size,
      localDone: localDoneKeys.size,
      remoteTotal: remoteKeys.size,
      remoteDone: remoteDoneKeys.size,
    } as const;
  }
}
