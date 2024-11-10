import * as readline from 'readline';

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

class Logger {
  private dictionariesStatuses: DictionariesStatus[] = [];
  private spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  private spinnerTimer: NodeJS.Timeout | null = null;
  private maxDictionaryKeyLength: number = 0;

  // ANSI color codes
  private RESET = '\x1b[0m';
  private GREEN = '\x1b[32m';
  private RED = '\x1b[31m';
  private BLUE = '\x1b[34m';
  private GREY = '\x1b[90m';
  private GREY_DARK = '\x1b[90m';

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
    distantDictionariesKeys: string[]
  ) {
    const allKeys = Array.from(
      new Set([...localDictionariesKeys, ...distantDictionariesKeys])
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

    // Output initial statuses
    for (const statusObj of this.dictionariesStatuses) {
      process.stdout.write(this.getStatusLine(statusObj) + '\n');
    }

    // Start spinner timer
    this.startSpinner();
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

        // Output the new status line
        process.stdout.write(this.getStatusLine(statusObj) + '\n');
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

          // Update the existing line
          const lineIndex = this.dictionariesStatuses.indexOf(statusObj);
          // Move cursor up to the lineIndex from the bottom
          readline.moveCursor(
            process.stdout,
            0,
            -(this.dictionariesStatuses.length - lineIndex)
          );
          readline.clearLine(process.stdout, 0);
          process.stdout.write(this.getStatusLine(statusObj) + '\n');
          // Move cursor back to the bottom
          readline.moveCursor(
            process.stdout,
            0,
            this.dictionariesStatuses.length - lineIndex - 1
          );
        }
      }
    }
    // No need to redraw all status lines
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

  public stop() {
    this.stopSpinner();
    // Update statuses one last time
    this.updateAllStatusLines();
  }

  public updateStatus(
    dictionaryKey: string,
    type: 'local' | 'distant',
    status: Partial<State>
  ) {
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

  // Rest of the Logger class remains the same...

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
    const paddedKey = statusObj.dictionaryKey + ' '.repeat(keyPadding);

    const states = statusObj.state.map((state) => {
      let colorStart = '';
      let colorEnd = '';
      let icon = this.getStatusIcon(state.status);
      if (state.status === 'fetching') {
        // Use spinner frame
        icon =
          this.spinnerFrames[
            state.spinnerFrameIndex! % this.spinnerFrames.length
          ];
        colorStart = this.BLUE;
        colorEnd = this.RESET;
      } else if (state.status === 'error') {
        colorStart = this.RED;
        colorEnd = this.RESET;
      } else if (state.status === 'imported' || state.status === 'built') {
        colorStart = this.GREEN;
        colorEnd = this.RESET;
      } else {
        colorStart = this.GREY;
        colorEnd = this.RESET;
      }

      // Format the status block
      const statusBlock = `${this.GREY_DARK}[${state.type}: ${colorStart}${icon} ${state.status}${this.GREY_DARK}]${colorEnd}`;

      return `${colorStart}${statusBlock}${colorEnd}`;
    });

    return `- ${paddedKey} ${states.join(' ')}`;
  }

  private updateAllStatusLines() {
    // Move cursor up to the first status line
    readline.moveCursor(process.stdout, 0, -this.dictionariesStatuses.length);

    for (const statusObj of this.dictionariesStatuses) {
      // Clear the line
      readline.clearLine(process.stdout, 0);

      if (typeof statusObj?.state === 'undefined') {
        return;
      }

      statusObj.state.forEach((state) => {
        if (state.status === 'fetching') {
          // Update spinner frame
          state.spinnerFrameIndex =
            (state.spinnerFrameIndex! + 1) % this.spinnerFrames.length;
        }
      });

      // Write the status line
      process.stdout.write(this.getStatusLine(statusObj) + '\n');
    }
  }

  public getStatuses() {
    return this.dictionariesStatuses;
  }
}

export const logger = Logger.getInstance();
