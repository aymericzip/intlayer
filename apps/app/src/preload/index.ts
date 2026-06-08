import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ping: () => ipcRenderer.invoke('ping'),
  platform: process.platform,
  versions: process.versions,

  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  downloadUpdate: () => ipcRenderer.invoke('download-update'),
  installUpdate: () => ipcRenderer.invoke('install-update'),

  onUpdateAvailable: (callback: (info: unknown) => void) => {
    ipcRenderer.on('update-available', (_, info) => callback(info));
    return () => ipcRenderer.removeAllListeners('update-available');
  },
  onUpdateDownloaded: (callback: (info: unknown) => void) => {
    ipcRenderer.on('update-downloaded', (_, info) => callback(info));
    return () => ipcRenderer.removeAllListeners('update-downloaded');
  },
  onDownloadProgress: (callback: (progress: { percent: number }) => void) => {
    ipcRenderer.on('download-progress', (_, progress) => callback(progress));
    return () => ipcRenderer.removeAllListeners('download-progress');
  },
  onUpdateError: (callback: (message: string) => void) => {
    ipcRenderer.on('update-error', (_, message) => callback(message));
    return () => ipcRenderer.removeAllListeners('update-error');
  },
});
