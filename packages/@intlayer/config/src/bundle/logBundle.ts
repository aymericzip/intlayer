import type { IntlayerConfig } from '@intlayer/types/config';
import * as ANSIColors from '../colors';
import { colorize, getPrefix, spinnerFrames, v, x } from '../logger';
import { extractErrorMessage } from '../utils/extractErrorMessage';

export class BundleLogger {
  private status: 'pending' | 'installing' | 'bundling' | 'success' | 'error' =
    'pending';
  private spinnerTimer: NodeJS.Timeout | null = null;
  private spinnerIndex = 0;
  private renderedLines = 0;
  private isFinished = false;
  private readonly prefix: string;
  private lastRenderedState = '';
  private error: string | undefined;

  constructor(configuration?: IntlayerConfig) {
    this.prefix = getPrefix(configuration?.log?.prefix) ?? '';
  }

  setStatus(status: 'installing' | 'bundling' | 'success') {
    if (this.isFinished) return;
    this.status = status;
    if (status === 'success') {
      this.finish();
    } else {
      this.startSpinner();
      this.render();
    }
  }

  setError(error?: unknown) {
    if (this.isFinished) return;
    this.status = 'error';
    this.error = extractErrorMessage(error);
    this.finish();
  }

  private startSpinner() {
    if (this.spinnerTimer || this.isFinished) return;
    this.spinnerTimer = setInterval(() => {
      this.spinnerIndex = (this.spinnerIndex + 1) % spinnerFrames.length;
      this.render();
    }, 100);
  }

  private stopSpinner() {
    if (!this.spinnerTimer) return;
    clearInterval(this.spinnerTimer);
    this.spinnerTimer = null;
  }

  private finish() {
    this.isFinished = true;
    this.stopSpinner();
    this.render();
  }

  private render() {
    const frame = spinnerFrames[this.spinnerIndex];
    const clock = colorize(frame, ANSIColors.BLUE);
    const lines: string[] = [];

    if (this.status === 'installing') {
      lines.push(`${this.prefix} ${clock} Fetching and resolving packages...`);
    } else if (this.status === 'bundling') {
      lines.push(`${this.prefix} ${v} Fetching and resolving packages...`);
      lines.push(`${this.prefix} ${clock} Bundling application...`);
    } else if (this.status === 'success') {
      lines.push(`${this.prefix} ${v} Fetching and resolving packages...`);
      lines.push(`${this.prefix} ${v} Bundling application...`);
    } else if (this.status === 'error') {
      lines.push(
        `${this.prefix} ${x} Bundle failed: ${colorize(this.error ?? 'Unknown error', ANSIColors.RED)}`
      );
    }

    const currentState = lines.join('\n');
    if (currentState === this.lastRenderedState) return;
    this.lastRenderedState = currentState;

    if (this.renderedLines > 0) {
      process.stdout.write(`\x1b[${this.renderedLines}F`);
    }

    const totalLinesToClear = Math.max(this.renderedLines, lines.length);
    for (let i = 0; i < totalLinesToClear; i++) {
      process.stdout.write('\x1b[2K');
      if (lines[i] !== undefined) {
        process.stdout.write(lines[i]);
      }
      process.stdout.write('\n');
    }

    this.renderedLines = lines.length;
  }
}
