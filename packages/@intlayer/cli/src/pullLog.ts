import { type DictionaryStatus } from '@intlayer/chokidar';
import {
  ANSIColors,
  colorize,
  getConfiguration,
  spinnerFrames,
} from '@intlayer/config';

export type PullStatus = {
  dictionaryKey: string;
  status: DictionaryStatus | 'pending' | 'fetching';
  errorMessage?: string;
};

export class PullLogger {
  private statuses: PullStatus[] = [];
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

  update(newStatuses: PullStatus[]) {
    if (this.isFinished) return;
    for (const status of newStatuses) {
      const index = this.statuses.findIndex(
        (s) => s.dictionaryKey === status.dictionaryKey
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
    const { total, done, success, errors } = this.computeProgress();

    const frame = this.spinnerFrames[this.spinnerIndex];
    const lines: string[] = [];

    const isDone = done === total;
    const progressLabel = `dictionaries: ${done}/${total}`;
    const details: string[] = [];
    if (success > 0) details.push(`ok: ${success}`);
    if (errors > 0) details.push(colorize(`errors: ${errors}`, ANSIColors.RED));

    const suffix = details.length > 0 ? ` (${details.join(', ')})` : '';

    if (isDone) {
      lines.push(
        `${this.prefix} ${colorize('✔', ANSIColors.GREEN)} fetched ${progressLabel}${suffix}`
      );
    } else {
      lines.push(
        `${this.prefix} ${colorize(frame, ANSIColors.BLUE)} fetching ${progressLabel}${suffix}`
      );
    }

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
    const keys = new Set(this.statuses.map((s) => s.dictionaryKey));

    const doneSet = new Set<DictionaryStatus | 'error'>([
      'fetched',
      'imported',
      'updated',
      'up-to-date',
      'reimported in JSON',
      'reimported in new location',
      'error',
    ] as const);

    const successesSet = new Set<DictionaryStatus>([
      'fetched',
      'imported',
      'updated',
      'up-to-date',
      'reimported in JSON',
      'reimported in new location',
    ] as const);

    const done = this.statuses.filter((s) =>
      doneSet.has(s.status as any)
    ).length;
    const success = this.statuses.filter((s) =>
      successesSet.has(s.status as any)
    ).length;
    const errors = this.statuses.filter((s) => s.status === 'error').length;

    return {
      total: keys.size,
      done,
      success,
      errors,
    } as const;
  }
}
