import { log } from '@intlayer/config/built';
import * as ANSIColors from '@intlayer/config/colors';
import {
  colorize,
  getPrefix,
  spinnerFrames,
  v,
  x,
} from '@intlayer/config/logger';
import { extractErrorMessage } from '@intlayer/config/utils';
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
  private pluginTotal = 0;
  private pluginDone = 0;
  private pluginNames: string[] = [];
  private pluginError: string | undefined;

  constructor() {
    this.prefix = getPrefix(log?.prefix) ?? '';
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

  /**
   * Register the names of the plugins providing dictionaries.
   * They are displayed next to the plugin progress counters, e.g.
   * `Plugin content: 6/6 (sync-json, load-po)`.
   *
   * @param names - Names of the plugins exposing a `loadDictionaries` hook
   */
  setPluginNames(names: string[]) {
    if (this.isFinished) return;
    // Guard against plugins declared without a name at runtime
    this.pluginNames = names.filter((name) => Boolean(name));
    this.render();
  }

  setPluginTotal(total: number) {
    if (this.isFinished) return;
    this.pluginTotal = total;
    if (total > 0) {
      this.startSpinner();
    }
    this.render();
  }

  setPluginDone(done: number) {
    if (this.isFinished) return;
    this.pluginDone = done;
    this.render();
  }

  /**
   * Flag the plugin line as errored.
   *
   * @param error - Error thrown while loading the plugin dictionaries
   * @param pluginName - Name of the plugin that threw, prefixed to the message
   */
  setPluginError(error?: Error, pluginName?: string) {
    if (this.isFinished) return;
    const errorMessage = extractErrorMessage(error);
    this.pluginError = pluginName
      ? `${pluginName}: ${errorMessage}`
      : errorMessage;
    this.render();
  }

  private render() {
    const {
      localTotal,
      localDone,
      remoteTotal,
      remoteDone,
      pluginTotal,
      pluginDone,
    } = this.computeProgress();

    const frame = this.spinnerFrames[this.spinnerIndex];
    const clock = colorize(frame, ANSIColors.BLUE);
    const lines: string[] = [];

    const isLocalDone = localDone === localTotal;
    const isRemoteDone = remoteDone === remoteTotal;
    const isPluginDone = pluginDone === pluginTotal;

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

    // Plugin line: show error or progress counts, suffixed by the plugin names
    if (pluginTotal > 0 || this.pluginError) {
      const pluginNamesSuffix =
        this.pluginNames.length > 0
          ? colorize(` (${this.pluginNames.join(', ')})`, ANSIColors.GREY)
          : '';

      if (this.pluginError) {
        lines.push(
          `${this.prefix} ${x} Plugin content: ${colorize(
            this.pluginError,
            ANSIColors.RED
          )}`
        );
      } else if (isPluginDone) {
        lines.push(
          `${this.prefix} ${v} Plugin content: ${colorize(`${pluginDone}`, ANSIColors.GREEN)}${colorize(`/${pluginTotal}`, ANSIColors.GREY)}${pluginNamesSuffix}`
        );
      } else {
        lines.push(
          `${this.prefix} ${clock} Plugin content: ${colorize(`${pluginDone}`, ANSIColors.BLUE)}${colorize(`/${pluginTotal}`, ANSIColors.GREY)}${pluginNamesSuffix}`
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
      pluginTotal: this.pluginTotal,
      pluginDone: this.pluginDone,
    } as const;
  }
}
