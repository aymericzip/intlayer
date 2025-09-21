import {
  ANSIColors,
  colorize,
  getConfiguration,
  spinnerFrames,
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

  constructor() {
    const configuration = getConfiguration();
    this.prefix = configuration.log.prefix;
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

  private render() {
    const { localTotal, localDone, remoteTotal, remoteDone } =
      this.computeProgress();

    const frame = this.spinnerFrames[this.spinnerIndex];
    const lines: string[] = [];

    const isLocalDone = localDone === localTotal;
    const isRemoteDone = remoteDone === remoteTotal;

    if (isLocalDone) {
      lines.push(
        `${this.prefix} ${colorize('✔', ANSIColors.GREEN)} Local dictionaries: ${localDone}/${localTotal}`
      );
    } else {
      lines.push(
        `${this.prefix} ${colorize(frame, ANSIColors.BLUE)} Local dictionaries: ${localDone}/${localTotal}`
      );
    }

    if (remoteTotal > 0) {
      if (isRemoteDone) {
        lines.push(
          `${this.prefix} ${colorize('✔', ANSIColors.GREEN)} Remote dictionaries: ${remoteDone}/${remoteTotal}`
        );
      } else {
        lines.push(
          `${this.prefix} ${colorize(frame, ANSIColors.BLUE)} Remote dictionaries: ${remoteDone}/${remoteTotal}`
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
