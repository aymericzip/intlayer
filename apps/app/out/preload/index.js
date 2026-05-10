import { contextBridge, ipcRenderer } from "electron";
//#region src/preload/index.ts
contextBridge.exposeInMainWorld("electron", {
	ping: () => ipcRenderer.invoke("ping"),
	platform: process.platform,
	versions: process.versions
});
//#endregion
export {};
