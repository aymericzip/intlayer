import { type IntlayerConfig, getConfiguration } from '@intlayer/config';
import readline from 'readline';
import { sortAlphabetically } from './utils/sortAlphabetically';

export type State = {
  type: 'local' | 'distant';
  status: 'pending' | 'fetching' | 'fetched' | 'error' | 'imported' | 'built';
  icon?: string;
  error?: Error;
  errorMessage?: string;
  spinnerFrameIndex?: number;
};

export type DictionariesStatus = {
  dictionaryKey: string;
  state: State[];
};

const LINE_DETECTOR = '\u200B\u200B\u200B'; // Three zero-width spaces
const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

// ANSI color codes
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const BLUE = '\x1b[34m';
const GREY = '\x1b[90m';
const GREY_DARK = '\x1b[90m';

class Logger {
  private dictionariesStatuses: DictionariesStatus[] = [];
  private spinnerTimer: NodeJS.Timeout | null = null;
  private maxDictionaryKeyLength: number = 0;
  private previousLineCount: number = 0;
  private lineDifCounter: number = 0;
  private originalStdoutWrite:
    | ((
        chunk: string | Uint8Array, // `chunk` can be either a string or a Uint8Array
        encoding?: BufferEncoding, // `encoding` is optional and should be a BufferEncoding
        callback?: (err?: Error | null) => void // `callback` is optional and a function
      ) => boolean)
    | null = null;
  private extraLines: number = 0;
  private isUpdating: boolean = false;
  private config?: IntlayerConfig;

  // Singleton instance
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public init(
    localDictionariesKeys: string[],
    distantDictionariesKeys: string[],
    configuration: IntlayerConfig = getConfiguration()
  ) {
    this.config = configuration;

    const allKeys = Array.from(
      new Set(
        [...localDictionariesKeys, ...distantDictionariesKeys].sort(
          sortAlphabetically
        )
      )
    );

    this.maxDictionaryKeyLength = allKeys.reduce(
      (max, key) => (key.length > max ? key.length : max),
      0
    );

    this.dictionariesStatuses = allKeys.map((dictionaryKey) => {
      const states: State[] = [];

      if (localDictionariesKeys.includes(dictionaryKey)) {
        states.push({
          type: 'local',
          status: 'pending',
          spinnerFrameIndex: 0,
        });
      }
      if (distantDictionariesKeys.includes(dictionaryKey)) {
        states.push({
          type: 'distant',
          status: 'pending',
          spinnerFrameIndex: 0,
        });
      }

      return {
        dictionaryKey,
        state: states,
      };
    });

    // Start spinner timer
    this.startSpinner();

    // Update all status lines (this will output the initial statuses)
    this.updateAllStatusLines();
  }

  // New method to add dictionary keys after initialization
  public addDictionaryKeys(
    type: 'local' | 'distant',
    dictionaryKeys: string[]
  ) {
    for (const dictionaryKey of dictionaryKeys) {
      // Update maxDictionaryKeyLength if the new key is longer
      if (dictionaryKey.length > this.maxDictionaryKeyLength) {
        this.maxDictionaryKeyLength = dictionaryKey.length;
      }

      let statusObj = this.dictionariesStatuses.find(
        (ds) => ds.dictionaryKey === dictionaryKey
      );

      if (!statusObj) {
        // If the dictionaryKey doesn't exist yet, create a new DictionariesStatus

        statusObj = {
          dictionaryKey,
          state: [],
        };
        this.dictionariesStatuses.push(statusObj);

        const newState: State = {
          type,
          status: 'pending',
          spinnerFrameIndex: 0,
        };
        statusObj.state.push(newState);
      } else {
        const existingState = statusObj.state.find((s) => s.type === type);
        if (!existingState) {
          // Add new state for the type

          const newState: State = {
            type,
            status: 'pending',
            spinnerFrameIndex: 0,
          };
          statusObj.state.push(newState);
        }
      }
    }

    // Call updateAllStatusLines() to refresh the output
    this.updateAllStatusLines();
  }

  private startSpinner() {
    if (!this.spinnerTimer) {
      this.spinnerTimer = setInterval(() => {
        this.updateAllStatusLines();
      }, 100); // Update every 100ms
    }
  }

  private stopSpinner() {
    if (this.spinnerTimer) {
      clearInterval(this.spinnerTimer);
      this.spinnerTimer = null;
    }
  }

  // Method to update the terminal output
  private updateOutput(content: string) {
    if (this.config?.log.mode !== 'verbose') return;

    // Monkey-patch process.stdout.write to keep track of extra lines
    if (!this.originalStdoutWrite) {
      this.originalStdoutWrite = process.stdout.write.bind(process.stdout);
      this.extraLines = 0;

      const write = (
        chunk: string | Uint8Array, // `chunk` can be either a string or a Uint8Array
        encoding?: BufferEncoding, // `encoding` is optional and should be a BufferEncoding
        callback?: (err?: Error | null) => void // `callback` is optional and a function
      ) => {
        const str = typeof chunk === 'string' ? chunk : chunk.toString();
        const newLines = (str.match(/\n/g) ?? []).length;

        // If the write is not initiated by Logger's updateOutput method
        if (!this.isUpdating) {
          this.extraLines += newLines;
        }

        return this.originalStdoutWrite!(chunk, encoding, callback);
      };

      process.stdout.write = write as typeof process.stdout.write;
    }

    // Set a flag to indicate that updateOutput is running
    this.isUpdating = true;

    // Adjust lineDifCounter if LINE_DETECTOR is not the first line
    const contentLines = content.split('\n');
    const indexOfLineDetector = contentLines.indexOf(LINE_DETECTOR.trim());

    if (indexOfLineDetector > 0) {
      // LINE_DETECTOR is not at the first line
      this.lineDifCounter = indexOfLineDetector;
    } else {
      this.lineDifCounter = 0;
    }

    // Calculate total lines to move up
    const totalLinesToMoveUp =
      this.previousLineCount + this.lineDifCounter + this.extraLines;

    // Move cursor up by totalLinesToMoveUp
    readline.moveCursor(process.stdout, 0, -totalLinesToMoveUp);

    // Clear all lines downwards
    readline.clearScreenDown(process.stdout);

    // Write the updated content
    contentLines.forEach((line) => {
      process.stdout.write(`${line}\x1b[K\n`);
    });

    // Update previousLineCount
    this.previousLineCount = contentLines.length;

    // Reset extraLines counter and updating flag
    this.extraLines = 0;
    this.isUpdating = false;
  }

  public stop() {
    this.stopSpinner();
  }

  public updateStatus(
    dictionaries: {
      dictionaryKey: string;
      type: 'local' | 'distant';
      status: Partial<State>;
    }[]
  ) {
    for (const { dictionaryKey, type, status } of dictionaries) {
      const statusObj = this.dictionariesStatuses.find(
        (ds) => ds.dictionaryKey === dictionaryKey
      );
      if (statusObj) {
        const state = statusObj.state.find((s) => s.type === type);
        if (state) {
          // Update existing state
          Object.assign(state, status);
        } else {
          // If the state for this type doesn't exist yet, add it
          if (status.status === undefined) {
            status.status = 'pending'; // Provide default status
          }
          const newState: State = {
            type,
            status: status.status,
            icon: status.icon ?? '',
            error: status.error,
            errorMessage: status.errorMessage,
            spinnerFrameIndex: status.spinnerFrameIndex ?? 0,
          };
          statusObj.state.push(newState);
        }
      } else {
        // If the status object doesn't exist, create it
        const newState: State = {
          type,
          status: status.status ?? 'pending',
          icon: status.icon ?? '',
          error: status.error,
          errorMessage: status.errorMessage,
          spinnerFrameIndex: status.spinnerFrameIndex ?? 0,
        };
        this.dictionariesStatuses.push({
          dictionaryKey,
          state: [newState],
        });
      }
    }

    // Update the display after status change
    this.updateAllStatusLines();
  }

  private getStatusIcon(status: string): string {
    const statusIcons: Record<string, string> = {
      pending: '⏲',
      fetching: '', // Spinner handled separately
      built: '✔',
      imported: '✔',
      error: '✖',
    };
    return statusIcons[status] ?? '';
  }

  private getStatusLine(statusObj: DictionariesStatus): string {
    const keyPadding =
      this.maxDictionaryKeyLength - statusObj.dictionaryKey.length;
    const paddedKey = `${statusObj.dictionaryKey}${' '.repeat(keyPadding)}`;

    const states = statusObj.state.map((state) => {
      let colorStart = '';
      let colorEnd = '';
      let icon = this.getStatusIcon(state.status);
      if (state.status === 'fetching') {
        // Use spinner frame
        icon = SPINNER_FRAMES[state.spinnerFrameIndex! % SPINNER_FRAMES.length];
        colorStart = BLUE;
        colorEnd = RESET;
      } else if (state.status === 'error') {
        colorStart = RED;
        colorEnd = RESET;
      } else if (state.status === 'imported' || state.status === 'built') {
        colorStart = GREEN;
        colorEnd = RESET;
      } else {
        colorStart = GREY;
        colorEnd = RESET;
      }

      // Format the status block
      const statusBlock = `${GREY_DARK}[${state.type}: ${colorStart}${icon} ${state.status}${GREY_DARK}]${colorEnd}`;

      return `${colorStart}${statusBlock}${colorEnd}`;
    });

    return `${this.config?.log.prefix}- ${paddedKey} ${states.join(' ')}`;
  }

  // Replace logUpdate calls with your custom methods
  private updateAllStatusLines() {
    const terminalHeight = process.stdout.rows;
    const maxVisibleLines = terminalHeight - 1;

    const lines = this.dictionariesStatuses.map((statusObj) => {
      statusObj.state.forEach((state) => {
        if (state.status === 'fetching') {
          // Update spinner frame
          state.spinnerFrameIndex =
            (state.spinnerFrameIndex! + 1) % SPINNER_FRAMES.length;
        }
      });
      return this.getStatusLine(statusObj);
    });

    let content;

    if (lines.length > maxVisibleLines) {
      const visibleLines = lines.slice(0, maxVisibleLines - 5);
      const summary = `${this.config?.log.prefix}... and ${lines.length - visibleLines.length} more`;
      content = LINE_DETECTOR + visibleLines.join('\n') + '\n' + summary;
    } else {
      content = lines.join('\n');
    }

    this.updateOutput(content);
  }

  public getStatuses() {
    return this.dictionariesStatuses;
  }
}

export const logger = Logger.getInstance();
