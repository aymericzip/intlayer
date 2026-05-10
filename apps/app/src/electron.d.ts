interface ElectronAPI {
  ping: () => Promise<string>;
  platform: NodeJS.Platform;
  versions: NodeJS.ProcessVersions;
  checkForUpdates: () => Promise<unknown>;
  downloadUpdate: () => Promise<void>;
  installUpdate: () => void;
  onUpdateAvailable: (callback: (info: unknown) => void) => () => void;
  onUpdateDownloaded: (callback: (info: unknown) => void) => () => void;
  onDownloadProgress: (
    callback: (progress: { percent: number }) => void
  ) => () => void;
  onUpdateError: (callback: (message: string) => void) => () => void;
}

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

export {};
