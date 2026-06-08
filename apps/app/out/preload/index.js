import { contextBridge, ipcRenderer } from "electron";
//#region src/preload/index.ts
contextBridge.exposeInMainWorld("electron", {
	ping: () => ipcRenderer.invoke("ping"),
	platform: process.platform,
	versions: process.versions,
	checkForUpdates: () => ipcRenderer.invoke("check-for-updates"),
	downloadUpdate: () => ipcRenderer.invoke("download-update"),
	installUpdate: () => ipcRenderer.invoke("install-update"),
	onUpdateAvailable: (callback) => {
		ipcRenderer.on("update-available", (_, info) => callback(info));
		return () => ipcRenderer.removeAllListeners("update-available");
	},
	onUpdateDownloaded: (callback) => {
		ipcRenderer.on("update-downloaded", (_, info) => callback(info));
		return () => ipcRenderer.removeAllListeners("update-downloaded");
	},
	onDownloadProgress: (callback) => {
		ipcRenderer.on("download-progress", (_, progress) => callback(progress));
		return () => ipcRenderer.removeAllListeners("download-progress");
	},
	onUpdateError: (callback) => {
		ipcRenderer.on("update-error", (_, message) => callback(message));
		return () => ipcRenderer.removeAllListeners("update-error");
	}
});
//#endregion
export {};
