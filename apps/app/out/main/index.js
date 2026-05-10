// -- CommonJS Shims --
import __cjs_mod__ from 'node:module';
import { join } from 'node:path';
import { app, BrowserWindow, ipcMain, session, shell } from 'electron';
import { join as join$1 } from 'path';

import.meta.filename;
const __dirname = import.meta.dirname;
__cjs_mod__.createRequire(import.meta.url);
//#region ../../node_modules/.bun/@electron-toolkit+utils@4.0.0+ffe86b6546a82a08/node_modules/@electron-toolkit/utils/dist/index.mjs
var is = { dev: !app.isPackaged };
var platform = {
  isWindows: process.platform === 'win32',
  isMacOS: process.platform === 'darwin',
  isLinux: process.platform === 'linux',
};
var electronApp = {
  setAppUserModelId(id) {
    if (platform.isWindows)
      app.setAppUserModelId(is.dev ? process.execPath : id);
  },
  setAutoLaunch(auto) {
    if (platform.isLinux) return false;
    const isOpenAtLogin = () => {
      return app.getLoginItemSettings().openAtLogin;
    };
    if (isOpenAtLogin() !== auto) {
      app.setLoginItemSettings({ openAtLogin: auto });
      return isOpenAtLogin() === auto;
    } else return true;
  },
  skipProxy() {
    return session.defaultSession.setProxy({ mode: 'direct' });
  },
};
var optimizer = {
  watchWindowShortcuts(window, shortcutOptions) {
    if (!window) return;
    const { webContents } = window;
    const { escToCloseWindow = false, zoom = false } = shortcutOptions || {};
    webContents.on('before-input-event', (event, input) => {
      if (input.type === 'keyDown') {
        if (!is.dev) {
          if (input.code === 'KeyR' && (input.control || input.meta))
            event.preventDefault();
          if (
            input.code === 'KeyI' &&
            ((input.alt && input.meta) || (input.control && input.shift))
          )
            event.preventDefault();
        } else if (input.code === 'F12')
          if (webContents.isDevToolsOpened()) webContents.closeDevTools();
          else {
            webContents.openDevTools({ mode: 'undocked' });
            console.log('Open dev tool...');
          }
        if (escToCloseWindow) {
          if (input.code === 'Escape' && input.key !== 'Process') {
            window.close();
            event.preventDefault();
          }
        }
        if (!zoom) {
          if (input.code === 'Minus' && (input.control || input.meta))
            event.preventDefault();
          if (
            input.code === 'Equal' &&
            input.shift &&
            (input.control || input.meta)
          )
            event.preventDefault();
        }
      }
    });
  },
  registerFramelessWindowIpc() {
    ipcMain.on('win:invoke', (event, action) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (win) {
        if (action === 'show') win.show();
        else if (action === 'showInactive') win.showInactive();
        else if (action === 'min') win.minimize();
        else if (action === 'max')
          if (win.isMaximized()) win.unmaximize();
          else win.maximize();
        else if (action === 'close') win.close();
      }
    });
  },
};
//#endregion
//#region public/favicon-32x32.png?asset
var favicon_32x32_default = join$1(
  import.meta.dirname,
  './chunks/favicon-32x32-39BtL0rK.png'
);
//#endregion
//#region src/election.ts
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon: favicon_32x32_default } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });
  if (is.dev && process.env['ELECTRON_RENDERER_URL'])
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  else
    mainWindow.loadURL(
      process.env['VITE_SITE_URL'] ?? 'https://app.intlayer.org'
    );
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('org.intlayer.app');
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
  ipcMain.on('ping', () => console.log('pong'));
  ipcMain.handle('ping', () => 'pong');
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
